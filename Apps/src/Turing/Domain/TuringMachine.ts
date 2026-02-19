import { Machine, Rule } from "./type";

export class TuringMachine<T> implements Machine<T> {

    constructor(private tape: T[], private rule: Rule<T>, private pointer = 0) {

    }

    step() {
        if(this.pointer >= this.tape.length) return 

        const current = this.tape[this.pointer]!

        this.tape[this.pointer] = this.rule.transform(current) // transformation 

        this.pointer++
    }

    run(){
        while(this.tape.length > this.pointer){
            this.step()
        }
    }

    getTape(): T[] {
        
        return this.tape
    }
}