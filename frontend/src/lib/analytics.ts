import type { HeroData } from "../components/types";
import type { TechCount, Job, Data} from "../types";

export function rankTechnologies (jobs: Job[]): TechCount[]{
    const techCount: Record <string, number> = {} ;
    for (const job of jobs){
        for (const tech of job.technology){
            techCount[tech] = (techCount[tech] || 0) + 1;
        }
    }

return Object.entries(techCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, count]) => ({ name, count }));
}

const share = (count: number, total: number) => (count / Math.max(1,total) * 100);

export function buildHero(jobs: Job[], meta: Data["meta"]): HeroData{
    const hero: HeroData = {
        totalJobs: jobs.length,
        juniorTotal: jobs.filter(job => job.seniority_normalized === "no experience" || job.seniority_normalized === "junior").length,
        juniorRemoteGlobal: jobs.filter(job => job.remote_modality_normalized === "remote" && (job.seniority_normalized === "no experience" || job.seniority_normalized === "junior")).length,
        seniorShare: share(jobs.filter(job => job.seniority_normalized === "senior" || job.seniority_normalized === "expert" || job.seniority_normalized === "semi-senior").length, jobs.length),
        juniorShare: share(jobs.filter(job => job.seniority_normalized === "no experience" || job.seniority_normalized === "junior").length, jobs.length),
        remoteGlobalShare: share(jobs.filter(job => job.remote_modality_normalized === "remote").length, jobs.length),
        sources: ["GetOnBrd"],
        capturedSince: meta.captured_since,
        lastCapture: meta.last_capture,
        publishedSince: jobs.reduce((min, job) => job.published_at < min ? job.published_at : min, jobs[0].published_at)
    }
    return hero;
}

