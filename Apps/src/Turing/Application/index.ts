
import { TuringMachine } from "../Domain/TuringMachine";
import { Rule } from "../Domain/type";

const doubleRule: Rule<number> = {
    transform: (n) => n * 2
}

const tape = [1, 2, 3, 4];

const m = new TuringMachine(tape, doubleRule)

m.run()

console.log(m.getTape())


const addString: Rule<string> = {
    transform: (n) => n + "a"
}

const tape2 = ["a", "b", "c"];

const m2 = new TuringMachine(tape2, addString)

m2.run()
console.log(m2.getTape())
