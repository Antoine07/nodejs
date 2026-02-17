export class StorageArray {
    storage: Record<string, number> = {};
    
    setValue(name, price) {
        if (name in this.storage) {
            this.storage[name] += price;
            return;
        }
        this.storage[name] = price;
    }
    restore(name) {
        if (name in this.storage) {
            delete this.storage[name];
        }
    }
    reset() {
        this.storage = {};
    }
    // TODO refactoring responsibility ?
    total() {
        return Object
            .values(this.storage)
            .reduce((acc, value) => acc + value, 0);
    }
    getStorage() {
        return this.storage;
    }
}
