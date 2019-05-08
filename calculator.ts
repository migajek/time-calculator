class TimeEntry {
    private totalMinutes: number;	  
    public get TotalMinutes(): number {
        return this.totalMinutes;
    }

    constructor(input: number | string) {

        if (typeof input == "string") {
            let result = /^(\d+)(\d{2})$/.exec(input);
            if (!result) {
                this.totalMinutes = Number(input);
            } else {
                let hours = Number.isNaN(Number(result[1])) ? 0 : Number(result[1]);
                let minutes = Number(result[2]);
                this.totalMinutes = (hours * 60) + minutes;
            }

        } else
            this.totalMinutes = input;

    }

    public toString(): string {
        function leftPad(str: string, len: number = 2 , ch = '0'): string {
            len = len - str.length + 1;
            return len > 0 ?
                new Array(len).join(ch) + str : str;
        }

        let hours = Math.floor(this.totalMinutes / 60);
        let minutes = this.totalMinutes % 60;
        return `${hours}:${leftPad(minutes.toString())}`;
    }  
}

class Calculator {
    public parseLines(text: string): TimeEntry[] {
        let lines = text.match(/[^\r\n]+/g);
        return lines.map(x => new TimeEntry(x));
    }

    public sum(timeEntries: TimeEntry[]): TimeEntry {
        return new TimeEntry(timeEntries.reduce((sum, x) => sum + x.TotalMinutes, 0));
    }
}
