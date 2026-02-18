import { readFile } from "node:fs/promises";
import { ZodType } from "zod";

export class LoadInput<T> {

    constructor(
        private fileName: string,
        private schema: ZodType<T>
    ) {}

    async load(): Promise<T> {

        const raw = await readFile(this.fileName, "utf-8");
        const parsed = JSON.parse(raw);

        const result = this.schema.safeParse(parsed);

        if (!result.success) {
            throw new Error(result.error.message);
        }

        return result.data;
    }
}
