import { describe, expect, expectTypeOf, it } from "vitest";
import type { Pool } from "pg";

import { Cart } from "../Domain/Cart";
import { Movie } from "../Domain/Movie";
import { StorageArray } from "../Infrastructure/ArrayStorage";
import { PgStorage } from "../Infrastructure/PgStorage";
import type { Storable } from "../types";

describe("Cart (StorageArray)", () => {
  it("calcule un total TTC (TVA par défaut = 0.2)", async () => {
    const cart = new Cart(new StorageArray());

    await cart.reset();
    await cart.buy(new Movie("Twin Peaks", 100), 2);

    expect(await cart.total()).toBe(240);
  });

  it("cumule les achats du même produit", async () => {
    const cart = new Cart(new StorageArray());

    await cart.reset();
    await cart.buy(new Movie("Heat", 10), 1);
    await cart.buy(new Movie("Heat", 10), 2);

    expect(await cart.total()).toBe(36);
  });

  it("restore supprime un produit du total", async () => {
    const cart = new Cart(new StorageArray());
    const heat = new Movie("Heat", 100);
    const alien = new Movie("Alien", 50);

    await cart.reset();
    await cart.buy(heat, 1); // 120
    await cart.buy(alien, 1); // 60
    expect(await cart.total()).toBe(180);

    await cart.restore(heat);
    expect(await cart.total()).toBe(60);
  });

  it("reset vide le panier", async () => {
    const cart = new Cart(new StorageArray());

    await cart.buy(new Movie("Heat", 100), 1);
    expect(await cart.total()).toBe(120);

    await cart.reset();
    expect(await cart.total()).toBe(0);
  });
});

describe("Storable (contrat)", () => {
  it("les stockages Array et PG respectent la même interface", () => {
    expectTypeOf(new StorageArray()).toMatchTypeOf<Storable<string, number>>();

    const fakePool = {
      query: async () => ({ rows: [] }),
    } as unknown as Pool;

    expectTypeOf(new PgStorage(fakePool)).toMatchTypeOf<Storable<string, number>>();
  });
});
