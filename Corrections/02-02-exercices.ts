// # Exercice — Inference

/**
 * Types inférés
 */

const n = 10;
// Type inféré : 10 (literal number, car const)

let s = "hello";
// Type inféré : string (car let => modifiable)

const arr = [1, 2, 3];
// Type inféré : number[]

const mixed = [1, "a"];
// Type inféré : (number | string)[]

const user = { id: 1, name: "Ada" };
// Type inféré : { id: number; name: string }

/**
 * Quand annoter ?
 */

// ❌ Pas nécessaire :
const x = 5;
const tags = ["ts", "js"];

// ⚠️ Annotation utile si contrat métier
type User = {
  id: number;
  name: string;
};

const typedUser: User = { id: 1, name: "Ada" };

// ✔ Ici l'annotation apporte une valeur
// car on formalise un contrat réutilisable


// # Exercice — Config robuste

//  Types autorisés
type Env = "dev" | "prod";
type LogLevel = "debug" | "info" | "warn" | "error";

// Structure globale
type AppConfig = {
  env: Env;
  logLevel: LogLevel;
  features: {
    newCheckout: boolean;
    betaBanner: boolean;
  };
};

// Implémentation correcte
const config: AppConfig = {
  env: "dev",
  logLevel: "debug",
  features: {
    newCheckout: true,
    betaBanner: false,
  },
};

// Cas d'usage
function bootstrap(cfg: AppConfig): void {
  if (cfg.env === "prod") {
    console.log("Production mode");
  }

  if (cfg.features.newCheckout) {
    console.log("New checkout enabled");
  }

  console.log("Log level:", cfg.logLevel);
}

bootstrap(config);

// ❌ Décommentez pour voir l'erreur TypeScript
// const invalidConfig: AppConfig = {
//   env: "production", // erreur
//   logLevel: "verbose", // erreur
//   features: {
//     newCheckout: true,
//     betaBanner: false,
//   },
// };
