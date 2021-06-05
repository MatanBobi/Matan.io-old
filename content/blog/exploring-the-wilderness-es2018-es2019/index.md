---
slug: 'exploring-the-wilderness-es2018-2019'
title: 'Exploring the wilderness: What’s new in ES2018 and planned for ES2019'
date: '2018-11-01'
author: 'Matan Borenkraout'
categories:
  - 'javascript'
banner: './images/banner.jpg'
bannerCredit: 'Photo by [Jamie Street](https://unsplash.com/photos/_94HLr_QXo8)'
description: An overview of the new features of ES2018-2019
---

After my [last post](../you-dont-really-need-this-package/index.md), I came to realize that while coding, I only use the tip of the iceberg when it comes to ECMAScript’s functionality.
So I decided to go on a journey and find out what’s new, what’s already implemented and what’s next.
Before we start the journey, let me just do a quick review over the TC39 process for ECMAScript features.

## TC39
[Technical Committee 39](https://github.com/tc39) is the committee responsible for evolving JavaScript; its members are companies.  
The TC39 process is the solution to a main problem that occurred in 2015 when trying to release ES2015.  
As ES2015 was built from December 2009(ES5) to June 2015, it included a large amount of features. That means that some features just sat there even though they were ready to be implemented before, and some features were rushed to production since the next release would probably be a few years later.  

I present you, **The *TC39* Process!**

![Party gif](https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif)

## The TC39 Process
Each proposal for an ECMAScript feature goes through the following *maturity stages*, starting with stage 0. The progression from one stage to the next one must be approved by the committee.  

### Stage 0 — Strawman
A free-form way of submitting ideas. The ideas must come from a TC39 member or contributor.

### Stage 1 — Proposal
This is a formal proposal for the feature. The purpose of this stage is to describe the shape of a solution and to identify potential challenges.  
The proposal must include an API and examples. If a feature passes this stage it means the committee shows its willingness to examine, discuss and contribute to the proposal.

### Stage 2 — Draft
This stage includes a precisely described syntax and semantics using formal spec language. The feature’s description should be as complete as possible.  
If a feature passes this stage it means the committee expects the feature to be developed and eventually included in the standard.

### Stage 3 — Candidate
A proposal that reached this stage has to be mostly finished and now needs feedback from implementations and users to progress further. To enter this stage, all ECMAScript editors need to sign off on the current spec text.

### Stage 4 — Finished
The proposal is ready to be included in the standard. To reach this stage, [Test262](https://github.com/tc39/test262) acceptance test has to be written for mainline usage scenarios, two implementations which passed the tests, a pull request has been sent and signed off by all ECMAScript editors. This stage **usually** indicates that this feature will be included in the next version of ECMAScript, though this isn’t always the case.

To see implementation status you can use [Kangax compatibility table](https://kangax.github.io/compat-table/es2016plus/).

---

## ES2018
The features for this version have been finalized and I’ll cover some of the main features I see.

### Object Rest/Spread Properties
ES6 introduced [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [spread elements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).  
This feature introduces rest properties for object destructuring assignment and spread properties for **object** literals.

#### Rest Properties
```js
const {a, b, c, ...rest} = {a: 1, b: 2, c: 3, d: 4, e: 5};
console.log(a) => 1
console.log(b) => 2
console.log(c) => 3
console.log(rest) => {d: 4, e: 5}
```

#### Spread operator
```js
const spreadObject = {a, b, c, ...rest};
console.log(spreadObject) => {a: 1, b: 2, c: 3, d: 4, e: 5}
```
The proposal can be found [here](https://github.com/tc39/proposal-object-rest-spread).

### Promise.prototype.finally
Known from `C`, `C#`, `Java` and many other languages, the `finally()` method can be useful if you want to do some processing or cleanup once the promise is settled (either fulfilled or rejected).

```js
promise  
.then(res => console.log(res))  
.catch(err => console.log(err))  
.finally(() => console.log('Finally called'));
```

The proposal can be found [here](https://github.com/tc39/proposal-promise-finally).

## ESNext

As ES2019 features aren’t finalized I will show some features that are in process, but keep in mind that none of the proposals have reached stage 4 so the features will probably change and may not be in this release.

### ECMAScript proposal: BigInt (Stage 3)
`BigInt` is a new primitive that provides a way to represent whole numbers larger than 2⁵³, which is the largest number JavaScript can reliably represent with the `Number` primitive.

```js
console.log(Number.MAX\_SAFE\_INTEGER) => 9007199254740991  
console.log(Number.MAX\_SAFE\_INTEGER + 1) => 9007199254740992  
console.log(Number.MAX\_SAFE\_INTEGER + 2) => 9007199254740992
```

A `BigInt` is created by appending `n` to the end of the integer or by calling the constructor.

```js
const previousMaxSafe = BigInt(Number.MAX\_SAFE\_INTEGER);  
console.log(previousMaxSafe) => 9007199254740991  
const maxPlusOne = previousMaxSafe + 1n;  
console.log(maxPlusOne) => 9007199254740992n
```

A couple of things to keep in mind:  
A `BigInt` is not strictly equal to a `Number`, but it is loosely so.

```js
console.log(0n === 0) => false  
console.log(0n == 0) => true
```

`Number`s and `BigInt`s may be compared as usual:

```
console.log(2n < 3) => true  
console.log(2n > 1) => true
```

`BigInt`s cannot be operated on interchangeably with `Number`s. Instead a `TypeError` will be thrown.

```
1n + 2 => TypeError: Cannot mix BigInt and other types, use explicit conversions
```

`BigInt`s also cannot be converted to `Number`s using the unary `+`. `Number` must be used.

```
+1n => TypeError: Cannot convert a BigInt value to a number
```

The `BigInt` _can_ however be concatenated with a `String`.

```
console.log(1n + '2') => "12"
```

Finally, `BigInt`s cannot be serialized to JSON.  
The proposal can be found [here](https://github.com/tc39/proposal-bigint).

### ECMAScript proposal: Dynamic import() (Stage 3)
At the moment, JavaScript lets us import modules as a static declaration, the linking job is made pre-run time.  
This proposal wishes to enable dynamic import of JavaScript parts at runtime by adding`import(specifier)` syntactic form, which acts in many ways like a function. It returns a promise for the module namespace object of the requested module, which includes all of its dependencies.

```js
import(\`./components/MyCustomCode.js\`)  
        .then(module => {  
          module.doSomething();  
        })  
        .catch(err => {  
          module.reportError();  
        });
```

The proposal can be found [here](https://github.com/tc39/proposal-dynamic-import).

### ECMAScript proposal: Numeric Separators (Stage 2)
This feature enables developers to make their numeric literals more readable by creating a visual separation between groups of digits. As a developer we sometimes see numbers in constant variables without any way of knowing the scale of the number, for example: `1000000000` what number is this? Is it a million? a billion? a trillion? But if we write `1,000,000,000` then its pretty easy to see that it’s a billion. This proposal is here to help we developers understand the numbers we’re working with.  
The proposed syntax is almost the same as in [Ruby](http://ruby-doc.org/core-2.3.0/doc/syntax/literals_rdoc.html#label-Numbers), a single `_`. It can be used in a decimal literals, binary literals, hex literals.

```js
const whatNumberIsIt = 1\_000\_000\_000;console.log(10 \*\* 9 === whatNumberIsIt) => true
```

The proposal can be found [here](https://github.com/tc39/proposal-numeric-separator).

### ECMAScript proposal: `Promise.allSettled (Stage 1)`
The problem with `Promise.all()` is that any rejected promise will cancel the entire operation and return a rejection ([docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all#Using_Promise.all)).  
This proposal aims to solve it by settling all promises.  
`Promise.allSettled()` returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled (either fulfilled or rejected).

```js
const rejectedPromise = new Promise((resolve, reject) => {   
  setTimeout(reject, 1000);   
});
const promisesToSettle = [fetch('http://example.com/'), rejectedPromise];  
const results = await Promise.all(promises.map(reflect));  
const successfulPromises = results.filter(p => p.status === 'fulfilled');
```

The proposal can be found [here](https://github.com/jasonwilliams/proposal-promise-allSettled).

### ECMAScript proposal: Observable (Stage 1)
The Observable type helps us process asynchronous streams of data. It is particularly effective to handle interface events. The purpose of this proposal is to offer Observable as a component of the ECMAScript Standard so platforms and applications will be able to share a common push-based stream protocol. An implementation example can be seen in [RxJS](https://github.com/ReactiveX/RxJS).

```js
function listen(element, eventName) {  
    return new Observable(observer => {  
        // Create an event handler which sends data to the sink  
        let handler = event => observer.next(event);  
  
        // Attach the event handler  
        element.addEventListener(eventName, handler, true);  
  
        // Return a cleanup function which will cancel the event stream  
        return () => {  
            // Detach the event handler from the element  
            element.removeEventListener(eventName, handler, true);  
        };  
    });  
}

function commandKeys(element) {  
    let keyCommands = { "38": "up", "40": "down" };  
  
    return listen(element, "keydown")  
        .filter(event => event.keyCode in keyCommands)  
        .map(event => keyCommands\[event.keyCode\])  
}
```

The proposal can be found [here](https://github.com/tc39/proposal-observable).

## Summing it up
The _TC39_ works hard to keep up with the changing pace we’re experiencing as a community for the past years. As you can see, the future holds some fascinating features. Keep in mind, there is no guarantee that the features I labeled under ESNext will be in ES2019, we will just have to wait and see.

Hope you enjoyed!  
Thanks!  
— Matan