CREATE SCHEMA "public";
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
CREATE INDEX "idx_jobs_published" ON "jobs" ("published_at");
CREATE UNIQUE INDEX "jobs_pkey" ON "jobs" ("id");