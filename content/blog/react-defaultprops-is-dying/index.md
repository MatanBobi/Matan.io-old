---
slug: 'react-defaultprops-is-dying'
title: React defaultProps is dying, who’s the contender?
date: '2019-07-29'
author: 'Matan Borenkraout'
categories:
  - 'react'
  - 'javascript'
banner: './images/banner.jpg'
bannerCredit: ''
description: React as we all know it is changing, maybe we need to adjust?
---

React as we all know it, is changing. As a frontend developer with React experience for the past 3 years, selling me these changes was quite hard.  
I’m here today as the seller and not as the buyer, hoping I will catch you in the fever I got once I understood what’s behind all these changes :)

After the React team announced [Hooks](https://reactjs.org/docs/hooks-intro.html), and pushed functional components as a “solution for all our problems”, this thought ran in my head, why should we use React’s `defaultProps` and not ES6 Default values for functional components? Then I found this [RFC](https://github.com/reactjs/rfcs/pull/107) that pretty much says what the React core team thinks about the idea.

In this post I’ll cover my thoughts and share some performance conclusions.  
I’ll start with a simple explanation regarding `defaultProps` and ES6 Default Values. To avoid confusion, let’s decide to call React `defaultProps` React def. values and ES6 Default Values ES6 def. values. If you’re already familiar with the syntax, feel free to jump to the conclusions part.

## React def. values:
Since React v15.5, runtime type checking for component’s `props` moved to a unified package called `prop-types`. This package gives us the ability to type check a component’s props and give it default values, for example lets look at a Greet component:

```jsx
const Greet = ({firstName, lastName}) => {  
  return (<div>{`Hi ${firstName} ${lastName}`}!</div>)  
}

Greet.propTypes = {  
  firstName: PropTypes.string,  
  lastName: PropTypes.string  
};
```

If we try to render `Greet` without giving it props:

```jsx
const Header = props => {  
  return <React.Fragment>  
    <Logo/>  
    <Greet/>  
  </React.Fragment>  
}
```

We will get something like this:

```
Hi undefined undefined!
```

`defaultProps` lets us avoid this scenario by setting default values to props:

```js
Greet.defaultProps = {  
  firstName: 'John',  
  lastName: 'Doe'  
};
```

so when not passing the relevant props we will get:

```
Hi John Doe!
```

## ES6 def. values:
Another option we can use in **functional components only**, is setting default values with ES6 Destructuring assignment syntax.  
Let’s take the Greet component we’ve created above and change it so it will contain default values.

```jsx
const Greet = ({firstName = 'John', lastName = 'Doe'}) => {  
  return (<div>{`Hi ${firstName} ${lastName}`}!</div>)  
}
```

As simple as that.  
So what should we use?

As everything is in programming, it’s a tradeoff, let’s see why.

## Advantages and Disadvantages of React defaults:
While using `defaultProps` is the best practice at the moment, it looks like this will change in the upcoming versions of React.  
The main advantage `defaultProps` has is it gives us a unified way of setting default values to props in both class components and functional components. The second advantage is that the syntax is simple and straightforward.  
The main problem with `defaultProps`, lies in its implementation.  
Let’s have a look at `React.createElement` implementation at the latest stable version (16.8.6).


____________________________________________________________________
Simplified version of createElement taken from React repo in GitHub
____________________________________________________________________

We can see that some stuff happen when calling to `createElement` with the props object, but the main issue is the `defaultProps` check. If we have `defaultProps`, we iterate over them and check if we already have a value in the props object, in case we don’t have a value we assign it the default. This happens **every time** we call `createElement`.  
Let’s have a look at a small timing example I took with the Greet component we just built (The test was made in a development build of React).  
All I did was adding `console.time()` at the start of `createElement` and `console.timeEnd()` at the end.

```
With defaultProps, createElement time: 0.01123046875ms  
Without defaultProps, createElement time: 0.003662109375ms
```

That’s three times slower for that simple component and it contains only two `defaultProps`!  
Just a quick disclosure, this doesn’t mean adding `defaultProps` will increase the render time by three, it just adds some milliseconds as it iterates over the defaults.

## Advantages and Disadvantages of ES6 Defaults:
The main advantage default values has is that it’s a native syntax added in ES6 and supported in almost all browsers (except IE11) as a part of destructuring assignment.  
In my opinion, the bigger problem with default values is that they create a difference between how we set default values in class components and how we set them in functional components, as setting a default value to a prop isn’t available in a class, the old class components will still have to use the old `propTypes` way, thus creating another difference between these two types of components. This problem will disappear in time since the use of class components should decline with hooks.

For the second problem we’ll have to change the Greet component a bit,  
let’s change the component so it will accept a user object instead of `firstName` and `lastName`.

```jsx
const Greet = ({user = { firstName: 'John', lastName: 'Doe' }}) => {  
  return (<div>{`Hi ${user.firstName} ${user.lastName}`}</div>)  
}
```

What’s the problem with the example we created? That’s right, **immutability**. The object we created as a default value will be recreated in every function call, so if we pass it down to a child component, the component will get a new reference every time and will cause a render on each parent render.  
To fix that problem we will need to create the default value globally as a `const` so the reference won’t change:

```jsx
const defaultUser = { firstName: 'John', lastName: 'Doe' };const Greet = ({user = defaultUser}) => {  
  return (<div>{`Hi ${user.firstName} ${user.lastName}`}</div>)  
}
```

When using default values on latest browsers that don’t need to transpile destructuring assignment, it can even lead to a smaller bundle size. On the other hand, when using it in browsers that do need to transpile it, it may lead to a bigger bundle size since destructring assignment default values [transpiles](https://babeljs.io/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=MYewdgzgLgBA4gJwKZNgXhgCgN4DMCWC0AcgIYC2SMGA5AFIgAWYNANDADakkVW0AiIJDQC-ASmoA-GNgBQMGMigBXBGCwAeACb4AbpOwADABL4YAEjyEelERexcbSEYZEBCDQHod-sbJFAA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Ces2016%2Ces2017%2Creact%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&prettier=false&targets=&version=7.5.5&externalPlugins=) pretty weird.  
I made a small example based on CRA with only `prop-types` and `styled-components` added. The example is made of 10 components, each one of them contains `defaultProps`.  
Let’s take a look at a bundle size comparison after gzip:

Without `defaultProps` and transpile of default values: 55.969KB  
Without `defaultProps` and not transpiling default values: 55.945KB  
With `defaultProps`: 55.979KB

It looks like the difference to the bundle size is minimal.

## Summing it up:
*   React def. values lets us have a unified way of setting default values.
*   React def. values will be slower the more default values you set.
*   ES6 def. values may reduce your bundle size if deploying to browsers that already have destructuring assignment enabled.
*   When using ES6 def. values you have to remember the pitfalls and create non primitive values upfront so they won’t cause a render on child elements.
*   The React team decided on ES6 def. values as a way to set default values for functional components. A warning was already [added](https://github.com/facebook/react/pull/16210) as a part of the process to deprecate `defaultProps` in functional components.

It looks like we will see changes like what I talked about in the upcoming version of React, and it’s all a part of making React better for us the developers and for our users. The React team is working hard on tackling performance issues and changing the way we see the web now.  
Keep up the great work React team ❤️

Hope I sold it well, but if you have any questions, feel free to ask.  
I’m available on [twitter](https://twitter.com/matanbobi).  
Thanks for reading!