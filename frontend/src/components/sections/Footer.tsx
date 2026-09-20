import { site } from '../../site'
import { formatDate } from '../format'

export function Footer({ lastCapture }: { lastCapture: string }) {
  const contacts = [
    site.contact.email && { label: site.contact.email, href: `mailto:${site.contact.email}` },
    site.contact.linkedin && { label: 'LinkedIn', href: site.contact.linkedin },
    site.contact.github && { label: 'GitHub', href: site.contact.github },
  ].filter((contact): contact is { label: string; href: string } => Boolean(contact))

  return (
    <footer className="bg-surface px-6 pt-14 pb-16 md:px-12 md:pt-20 md:pb-24 lg:px-20">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-10">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div className="flex min-w-0 flex-col gap-2">
            <p className="text-xl font-semibold">{site.author.name}</p>
            <p className="max-w-[360px] text-[15px] leading-relaxed">
              {site.author.location}. {site.author.bio}
            </p>
          </div>
          <p className="max-w-[320px] text-[15px] leading-relaxed">Hecho con {site.stack}.</p>
          {contacts.length > 0 ? (
            <ul className="flex flex-col gap-1 text-[15px] leading-relaxed">
              {contacts.map((contact) => (
                <li key={contact.label}>
                  <a href={contact.href}>{contact.label}</a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <p className="text-sm text-muted">Datos capturados hasta el {formatDate(lastCapture)}.</p>
      </div>
    </footer>
  )
}
