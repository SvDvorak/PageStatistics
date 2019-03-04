export class Stats {
    lastHour!: number;
    lastDay!: number;
    lastWeek!: number;
}

export type StatsDictionary = { [page: string]: Stats};