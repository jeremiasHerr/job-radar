import type { Job } from "../types";
import type { RankedTech } from "../components/types";

export const SMALL_SAMPLE = 30;

export function rankTechnologies (jobs: Job[], catalog: Record<string, string>): RankedTech[]{
    const techCount: Record<string, number> = {};

    for (const job of jobs){
        for (const tech of job.technology){
            techCount[tech] = (techCount[tech] || 0) + 1;
        }   
    }

    return Object.entries(techCount)
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([name, count]) => ({ name, count, category: catalog[name] ?? "other"}));
}
