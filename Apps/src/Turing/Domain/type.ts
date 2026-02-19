

export interface Machine<T> {
    step(): void
    run(): void
    getTape(): T[]
}

export type Rule<T> = {
    transform: (value: T) => T
}