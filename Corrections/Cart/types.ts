export interface Storable {
    setValue(key: string, value: number): void;
    reset(): void;
    restore(key: string): void;
    getStorage(): Record<string, number>;
}

export interface AsyncStorable {
    setValue(name: string, price: number): Promise<void>;
    restore(name: string): Promise<void>;
    reset(): Promise<void>;
    getStorage(): Promise<Record<string, number>>;
}

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
