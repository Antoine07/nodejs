export function isPrime(n: number) {
    if(n === 2) return true
    if (n % 2 === 0 || n < 2) return false

    let i = 3;
    while (i <= Math.sqrt(n)) {
        if (n % i === 0) return false
        i = i + 2;
    }

    return true
}

export function isPrimePos(n : number, pos : number){

    return [ ...n.toString() ].map(Number).reduce( (acc, d ) => acc*d, 1) == pos
}
