export type Awaitable<T> = T | Promise<T>;

export interface Productable {
  getName(): string;
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

export interface Storable<K extends string, V> {
  setValue(key: K, value: V): Awaitable<void>;
  reset(): Awaitable<void>;
  restore(key: K): Awaitable<void>;
  getStorage(): Awaitable<Record<K, V>>;
}
