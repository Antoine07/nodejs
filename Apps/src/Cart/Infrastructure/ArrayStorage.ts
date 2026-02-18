import { Storable } from "../types";

export class StorageArray implements Storable<string, number> {

    private storage: Record<string, number> = {};
  
    setValue(name: string, price: number): void {
      this.storage[name] = (this.storage[name] ?? 0) + price;
    }
  
    restore(name: string): void {
      delete this.storage[name];
    }
  
    reset(): void {
      this.storage = {};
    }
  
    total(): number {
      let sum = 0;
  
      for (const value of Object.values(this.storage)) {
        sum += value;
      }
  
      return sum;
    }
  
    getStorage(): Record<string, number> {
      return this.storage;
    }
  }
  
