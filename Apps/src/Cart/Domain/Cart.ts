import { Storable, Productable } from "../types";

export class Cart {

    constructor(
        private storage: Storable<string, number>,
        private tva: number = 0.2
    ) { }

    async buy(product: Productable, quantity: number): Promise<void> {
        const total = Math.abs(
            quantity * product.getPrice() * (this.tva + 1)
        );

        await this.storage.setValue(product.getName(), total);
    }

    async reset(): Promise<void> {
        await this.storage.reset();
    }

    async restore(product: Productable): Promise<void> {
        await this.storage.restore(product.getName());
    }

    async total(): Promise<number> {
        const storage = await this.storage.getStorage();

        let sum = 0;

        for (const value of Object.values(storage)) {
            sum += value;
        }

        return sum;
    }

    async getStorage(): Promise<Record<string, number>> {
        return await this.storage.getStorage();
    }
}
