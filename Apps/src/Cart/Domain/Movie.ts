import { Productable } from "../types";

export class Movie implements Productable {

    constructor(
        private name: string,
        private price: number
    ) {}

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }

    getPrice(): number {
        return this.price;
    }

    setPrice(price: number): void {
        this.price = price;
    }
}
