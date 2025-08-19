# ts-matchCase

A small and simple function to create **match/case** style branching in TypeScript and JavaScript.  
Replaces long `if/else` or `switch` statements with a more declarative and type-safe approach.


Best way to simulate PHP match structure
```php

<?php
    $food = 'cake';

    $return_value = match ($food) {
        'apple' => 'This food is an apple',
        'bar' => 'This food is a bar',
        'cake' => 'This food is a cake',
    };

    var_dump($return_value);
?>
// see in https://www.php.net/manual/en/control-structures.match.php

```
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
    defaultCase: () => "unknown"
});

console.log(result); // "two"
```
Supported cases formats

You can pass cases in three formats:

1. Object JSON
```ts
import { matchCase } from "ts-matchCase"

const myFavoriteHero = "Dragonfly"

const witchIsYourFavoriteHero =  matchCase<string, string>(myFavoriteHero, {
    "SpiderMan" : () => "It's spider man",
    "Batman" : () => "It's Batman",
    "Dragonfly" : () => "It´s Dragonfly"
});

console.log(witchIsYourFavoriteHero); // Dragonfly

```
With default case
```ts
import { defaultCase, matchCase } from "ts-matchCase"

const car = "Tesla";

// using
const result = matchCase<string, string>(car, {
    'Tesla': () => "Electric luxury",
    'Ferrari': () => "Super fast",
    'Toyota': () => "Reliable",
    defaultCase: () => "Unknown car" // defaultCase is "default" string value
});

console.log(result); // Electric luxury
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
    ]);

console.log(result); // Heartwarming adventures
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
import { matchCase } from "ts-matchCase";

const myFavoriteSport = "chess";

const result = matchCase<string, string>(
    myFavoriteSport, {
        'soccer' : () => "The beautiful game, played worldwide",
        'basketball': () => "Fast-paced and full of slam dunks",
        'tennis' : () => "Precision, endurance, and skill",
    }
);// throw new Error(`No match found for value: "chess"`);

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

console.log(message); // Welcome back, user!


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

### Using Functions as Keys in `matchCase`

The `matchCase` utility also supports **functions as keys** (just as list methods). This allows you to defer the evaluation of a case until the pipeline actually checks it, which can optimize performance for expensive or conditional computations.

```ts
import { defaultCase, matchCase } from "ts-matchCase";

function isEven(a: number): boolean {
    return a % 2 === 0;
}

function isOdd(a: number): boolean {
    return a % 2 === 1;
}

const number = rand(); // generic function

const result = matchCase<boolean, string>(true, [
    [isEven(number), () => "Number is even"],
    [isOdd(number), () => "Number is positive"],
    [defaultCase, () => "No conditions matched"]
]); // the isEven and isOdd will be called before matchCase

const result = matchCase<boolean, string>(true, [
    [() => isEven(number), () => "Number is even"],
    [() => isOdd(number), () => "Number is positive"],
    [defaultCase, () => "No conditions matched"]
]); // the isEven and isOdd and others methods cases will be called in order inside matchCase

```
