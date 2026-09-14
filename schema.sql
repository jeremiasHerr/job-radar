CREATE SCHEMA "public";

CREATE TABLE "job_technologies" (
	"job_id" text,
	"field" text,
	"technology_id" integer,
	CONSTRAINT "job_technologies_pkey" PRIMARY KEY("technology_id","job_id","field")
);

CREATE TABLE "jobs" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"captured_at" timestamp with time zone DEFAULT now() NOT NULL,
	"description" text,
	"desirable" text,
	"responsibilities" text,
	"is_remote" boolean,
	"company_id" integer,
	"countries" text[],
	"salary_min" integer,
	"salary_max" integer,
	"published_at" timestamp with time zone,
	"url" text,
	"tags" integer[],
	"raw" jsonb,
	"updated_at" timestamp with time zone,
	"source" text,
	"seniority_raw" text,
	"seniority_normalized" text,
	"remote_modality_raw" text,
	"remote_modality_normalized" text,
	"applications_count" integer,
	"category_name" text,
	"salary_currency" text
);

CREATE TABLE "technologies" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "technologies_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text CONSTRAINT "technologies_name_key" UNIQUE,
	"category" text
);

CREATE INDEX "idx_job_tech_job" ON "job_technologies" ("job_id");
CREATE UNIQUE INDEX "job_technologies_pkey" ON "job_technologies" ("technology_id","job_id","field");
CREATE INDEX "idx_jobs_published" ON "jobs" ("published_at");
CREATE UNIQUE INDEX "jobs_pkey" ON "jobs" ("id");
CREATE UNIQUE INDEX "technologies_name_key" ON "technologies" ("name");
CREATE UNIQUE INDEX "technologies_pkey" ON "technologies" ("id");
ALTER TABLE "job_technologies" ADD CONSTRAINT "job_technologies_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "jobs"("id") ON DELETE CASCADE;
ALTER TABLE "job_technologies" ADD CONSTRAINT "job_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE CASCADE;