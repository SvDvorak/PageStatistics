export class Stats {
    lastHour: number;
    lastDay: number;
    lastWeek: number;

    constructor() {
        this.lastHour = 0;
        this.lastDay = 0;
        this.lastWeek = 0;
    }
}

export type StatsDictionary = { [page: string]: Stats};