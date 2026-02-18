
import { Rule } from "../Domain/type";
import { TuringMachine } from "../Domain/TuringMachine";

const doubleRule: Rule<number> = {
    transform: (n) => n * 2
}

const machine = new TuringMachine<number>(
    [1, 2, 3, 4],
    doubleRule
);

console.log(machine.getTape())