export interface Productable {
    getName(): string;
    getPrice(): number;
}

export interface Productable {
    getName(): string;
    setPrice(price: number): void;
    getPrice(): number;
}

export type PgConfig = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    ssl?: boolean;
};

export interface Storable<T, U>{
    setValue(key: string, value: number): T;
    reset(): T;
    restore(key: string): T;
    getStorage(): U;
}