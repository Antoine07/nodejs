/**

# Exercice — Config robuste

1. Déclarez un type `Env` = `"dev" | "prod"`.
2. Déclarez un type `LogLevel` = `"debug" | "info" | "warn" | "error"`.
3. Déclarez un type `AppConfig` contenant `env`, `logLevel` et `features` (`newCheckout`, `betaBanner`).
4. Créez une constante `config` correctement typée.
5. Vérifiez que `env: "production"` provoque une erreur TypeScript.

*features = interrupteurs métier contrôlés par configuration.*

1. `newCheckout` → Active le nouveau processus de paiement à la place de l'ancien.
2. `betaBanner` → Affiche une bannière indiquant que l'application est en version bêta.

Objectif : zéro `string`, zéro `any`, autocomplétion active.

 */

type Env = "dev" | "prod" ;
type LogLevel = "debug" | "info" | "warn" | "error" ;

type AppConfig = {
    env : Env,
    logLevel: LogLevel,
    features : {
        newCheckout : boolean,
        betaBanner : boolean
    }
}

const config: AppConfig = {
    env: "dev",
    logLevel: "debug",
    features: {
      newCheckout: true,
      betaBanner: false,
    },
  };

