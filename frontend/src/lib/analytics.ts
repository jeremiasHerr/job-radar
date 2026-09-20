import type { TechCount, Job} from "../types";

export function rankTechnologies (jobs: Job[]): TechCount[]{
    let techCount: Record <string, number> = {} ;
    for (let job of jobs){
        for (let tech of job.technology){
            techCount[tech] = (techCount[tech] || 0) + 1;
        }
    }

return Object.entries(techCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([name, count]) => ({ name, count }));
}

