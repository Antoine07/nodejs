import { Storable } from "../types";
import { Pool } from "pg";

export class PgStorage implements Storable<string, number> {

    constructor(private pool: Pool) {}

    async setValue(name: string, price: number): Promise<void> {
        await this.pool.query(
            `
            INSERT INTO cart_storage (name, price)
            VALUES ($1, $2)
            ON CONFLICT (name)
            DO UPDATE SET price = cart_storage.price + EXCLUDED.price
            `,
            [name, price]
        );
    }

    async restore(name: string): Promise<void> {
        await this.pool.query(
            `DELETE FROM cart_storage WHERE name = $1`,
            [name]
        );
    }

    async reset(): Promise<void> {
        await this.pool.query(
            `TRUNCATE TABLE cart_storage`);
    }

    async getStorage(): Promise<Record<string, number>> {
        const result = await this.pool.query(
            `SELECT name, price FROM cart_storage`
        );

        const storage: Record<string, number> = {};

        for (const row of result.rows) {
            storage[row.name] = Number(row.price);
        }

        return storage;
    }
}
