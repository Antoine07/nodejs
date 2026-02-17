import { pool } from "../Infrastructure/DB";
import { PgStorage } from "../Infrastructure/PgStorage";
import { StorageArray } from "../Infrastructure/ArrayStorage"
import { Cart } from "../Domain/Cart";
import { Movie } from "../Domain/Movie";

async function main() {
    const storage = new PgStorage(pool); // pg
    //const storage = new StorageArray(); // array 

    const cart = new Cart(storage);

    await cart.reset()

    console.log(Math.random())

    // utilisation
    const product = new Movie("Twin Peaks", 100)
    await cart.buy(product, 2);
    const total = await cart.total();
    console.log(total);

    await cart.buy(product, 1);

    console.log( await cart.total() ) ;

    const m = new Movie("Mulholand Drive", 200)
    await cart.buy(m, 1);
    console.log( await cart.total() ) ;

}

main();
