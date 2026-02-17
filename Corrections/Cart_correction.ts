
// ==============================
// Domaine 
// ==============================
/**
 
L’injection de dépendance (Dependency Injection, DI) 
est un principe de conception selon lequel un objet ne crée pas lui-même 
les objets dont il dépend, mais les reçoit de l’extérieur.

 */

class Cart {

    // Injection de dépendance via le constructeur :
    // - Cart ne crée pas lui-même son storage
    // - Il reçoit une abstraction (Storable)
    // - Cela respecte le principe d'inversion des dépendances (DIP)
    // - Permet de remplacer l'infrastructure sans modifier le domaine
    constructor(private storage: Storable) {}

    buy(product: Productable, quantity: number) {

        // product respecte le contrat Productable :
        // - getName() et getPrice() garantis par l'interface

        // Calcul métier :
        // price * quantity * 1.2
        // 1.2 représente un coefficient (ex : TVA 20%)
        // Problème potentiel : valeur magique non externalisée
        const total = product.getPrice() * quantity * 1.2;

        // Délégation du stockage à l'infrastructure
        // Cart ne connaît pas l’implémentation concrète (RecordStorage, ArrayStorage, etc.)
        this.storage.setValue(product.getName(), total);
    }

    // Cette méthode expose l’infrastructure.
    // Cela crée un couplage sortant : le domaine révèle un détail technique.
    // Idéalement, on exposerait une donnée métier (ex: getTotal()) plutôt que le storage brut.
    getStorage() {
        return this.storage;
    }
}


// Implémentation concrète d’un produit métier
// Respecte le contrat Productable
class Movie implements Productable {

    // Encapsulation des propriétés
    // name et price sont privés et immuables après construction
    constructor(private name: string, private price: number) {}

    // Retourne le nom du produit
    getName() {
        return this.name;
    }

    // Retourne le prix unitaire
    // Aucune validation ici (prix négatif possible)
    getPrice() {
        return this.price;
    }
}


// ==============================
// Infrastructure
// ==============================

// Implémentation 1 : stockage clé/valeur
class RecordStorage implements Storable {

    // storage interne basé sur un objet clé → valeur
    constructor(private storage: Record<string, number> = {}) {}

    setValue(name: string, value: number): void {

        // Associe un nom de produit à un montant
        // Si le même nom est utilisé plusieurs fois, la valeur est écrasée
        this.storage[name] = value;
    }
}


// Implémentation 2 : stockage par tableau
class ArrayStorage implements Storable {

    // storage interne sous forme de liste de nombres
    constructor(private storage: number[] = []) {}

    setValue(name: string, value: number): void {

        // Le paramètre "name" est ignoré ici.
        // Cela respecte le contrat technique (signature),
        // mais pas forcément le contrat sémantique.
        // On perd la relation produit → montant.
        this.storage.push(value);
    }
}


// ==============================
// Types (Contrats)
// ==============================

// Contrat minimal de persistance
// Toute classe implémentant Storable doit fournir setValue
interface Storable {

    // Signature stricte :
    // - name : identifiant logique
    // - value : montant associé
    // Aucun mécanisme de lecture défini ici
    setValue(name: string, value: number): void;
}


// Contrat minimal pour un produit
interface Productable {

    // Le domaine exige seulement :
    // - un nom
    // - un prix
    getName(): string;
    getPrice(): number;
}


// ==============================
// Application (composition)
// ==============================

// Composition racine :
// On choisit concrètement l'infrastructure à injecter.
// Ici : RecordStorage
// Cart reste ignorant du choix.
const cart = new Cart(new RecordStorage());

// Achat 1 :
// 100 * 2 * 1.2 = 240
cart.buy(new Movie("Star wars", 100), 2);

// Achat 2 :
// 50 * 1 * 1.2 = 60
cart.buy(new Movie("Orange mécanique", 50), 1);

// Affiche l’instance du storage injecté.
// Ce n’est pas une donnée métier mais un objet technique.
console.log(cart.getStorage());

/** 
Ce code illustre clairement :

* Injection de dépendance via constructeur
* Découplage domaine / infrastructure
* Utilisation d’interfaces comme contrats
* Limite entre contrat technique et cohérence sémantique
* Exposition involontaire d’un détail technique (`getStorage`)

C’est un bon exemple pédagogique d’architecture orientée dépendances.
*/