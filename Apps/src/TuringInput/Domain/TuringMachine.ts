import { Machine, Rule } from "./type";

export class TuringMachine<T> implements Machine<T> {

    constructor(
        private tape: T[],
        private rule: Rule<T>,
        private pointer =  0
    ) { }

    step(): void {

        if(!this.tape.length) throw new Error("Tape is empty")

        if(this.pointer >= this.tape.length) return

        const current = this.tape[this.pointer]!;

        this.tape[this.pointer] = this.rule.transform(current)

        this.pointer++
    }

    run(): void {
        while(this.tape.length > this.pointer) this.step()
    }

    getTape() {

        return [...this.tape]
    }
}