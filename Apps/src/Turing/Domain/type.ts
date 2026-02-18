export interface Machine<T> {
    step(): void;
    run(): void;
    getTape(): T[];
}

export interface Rule<T> {
    transform(value: T): T;
}
