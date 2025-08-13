# ts-matchCase

A small and simple function to create **match/case** style branching in TypeScript and JavaScript.  
Replaces long `if/else` or `switch` statements with a more declarative and type-safe approach.

---

## Installation

```bash
npm install ts-matchCase

or

yarn add ts-matchCase
```

Basic Usage
``` ts
import { matchCase } from "ts-matchCase";

const result = matchCase<number, string>(2, {
    1: () => "one",
    2: () => "two",
    default: () => "unknown"
});

console.log(result); // "two"
```

Supported cases formats

You can pass cases in three formats:

1. Object
```ts
import { defaultCase, matchCase } from "ts-matchCase"

const myFavoriteHero = "Dragonfly"

const witchIsYourFavoriteHero =  matchCase<string, string>(myFavoriteHero, {
    "SpiderMan" : () => "It's spider man",
    "Batman" : () => "It's Batman"
    "Dragonfly" : () => "It´s Dragonfly"
});

console.log(witchIsYourFavoriteHero) // Dragonfly

```
```ts
const car = "Tesla";

// using
const result = matchCase<string, string>(car, {
    'Tesla': () => "Electric luxury",
    'Ferrari': () => "Super fast",
    'Toyota': () => "Reliable",
    defaultCase: () => "Unknown car" // defaultCase is "default" string value
});
```

2. Array of pairs

```ts
import { defaultCase, matchCase } from "ts-matchCase"

const myFavoriteCartoon = "Care Bears";

const result = matchCase<string, string>(
    myFavoriteCartoon,
    [
        ["Tom and Jerry", () => "Classic slapstick comedy"],
        ["Scooby-Doo", () => "Mystery-solving fun"],
        ["Care Bears", () => "Heartwarming adventures"],
        [defaultCase, () => "Unknown cartoon"] // or ["default", () => "Unknown cartoon"] 
    ]

console.log(result); // Heartwarming adventures
);
```

3. Map

```ts
import { defaultCase, matchCase } from "ts-matchcase";

const myCreature = "Dragon";

// Convert Map to an array so matchCase can use it
const creatureCases = new Map<string, () => string>([
    ["Unicorn", () => "Graceful and magical"],
    ["Dragon", () => "Powerful and fire-breathing"],
    ["Phoenix", () => "Rises from the ashes"],
    ["default", () => "Unknown creature"] // or [defaultCase, () => "Unknown creature"]
]);

const result = matchCase<string, string>(
    myCreature,
    creatureCases
);

console.log(result); // Output: Powerful and fire-breathing
```

Strong typing

The function is fully generic, preserving both input and output types.
```ts
const result = matchCase<"a" | "b", number>("a", {
    a: () => 10,
    b: () => 20,
    default: () => 0
});
// result is inferred as number
```

Using without default cases

When you use without a defaultCase or "default" a Exception will be thorned

```ts
import { matchCase } from "ts-matchcase";

const myFavoriteSport = "chess";

const result = matchCase<string, string>(
    myFavoriteSport, {
        'soccer' : () => "The beautiful game, played worldwide",
        'basketball': () => "Fast-paced and full of slam dunks",
        'tennis' : () => "Precision, endurance, and skill",
    }
); // throw new Error(`No match found for value: chess`);

console.log(result); // won´t be called 

```
⚠️ Important: Using boolean keys

When using true or false as keys in matchCase, never use the object (JSON) format.
In JavaScript/TypeScript, object keys are always strings, so true/false will be converted to "true" and "false", which can cause unexpected behavior.

```ts
import { defaultCase, matchCase } from "ts-matchCase";

const isLoggedIn = true;

const message = matchCase<boolean, string>(
    isLoggedIn, [
        [true, () => "Welcome back, user!"],
        [false, () => "Please log in to continue"],
    ]
);

function foo(): boolean {
    // boolean logic
}

function bar(): boolean {
    // some other boolean logic
}

const result = matchCase<boolean, string>(true, [ // or false, in this case, in order, the firs methods returns boolean correctly, the referent CaseValue will be called
    [foo(), () => "foo is correct"],
    [bar(), () => "bar is correct"],
    [defaultCase, () => "no correct functions"]
]) // or false

console.log(result); 
```

For these cases, use arrays or Map, since they preserve the original key type.

Default case handling

Whenever a value is not found, the "default" case will be executed (if provided).
If no default case exists and no match is found, an error will be thrown.
