---
title: You don’t really need this package!
date: "2018-10-09T06:53:30.406Z"
coverImage: 'https://images.unsplash.com/photo-1513672494107-cd9d848a383e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
description: A short explanation of why you should choose your packages wisely
---

Yesterday I had a nightmare about a problem I bumped into while coding my new project.  
While searching for a solution, I couldn’t find a package that could help me. I woke up all sweaty, breathing heavily with tears.  
After the last few projects I worked on, I realized something about us developers. We always seek the easiest way to do something; its in our nature.  
While this helps us be efficient in a fast-moving industry, it does have its pitfalls.  
The main one can be seen in day to day coding.  
These days, almost every problem has a solution. The npm registry is filled with packages that can solve all of your easiest or worst problems, but what if choosing the quickest way is actually the dirtiest way?  
Only last July, the npm registry got compromised by malicious packages after an attacker compromised the npm account of a maintainer [Postmortem for malicious packages](https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes).

>>> “The malicious packages downloaded and executed code from pastebin.com"

This time it was ESLint but it could be any package. So, we should choose our packages wisely.

Furthermore, packages usually extend your vendor bundle size, which will probably lead to a high wait time until first meaningful paint (unless you’re using some kind of code splitting tool).  
Here’s a list of some of the most depended upon packages (taken from [npm.js](https://www.npmjs.com/browse/depended)) and their minified weight taken from [bundlephobia](https://bundlephobia.com/):  
1. lodash: 68.5kb
2. moment: 227.5kb
3. axios: 11.9kb
4. validator: 46.3kb
5. query-string: 3kb


## So what are my alternatives?
Don’t use them. Yeah I know it’s not that easy. But if you can, just write the code yourself. Here are some examples of functionality you can get from browsers or “must use” packages that can replace these packages.

### Lodash Vs ES6:
Lodash functionality can be very useful. But we got used to it and sometimes we use it when there’s actually no need to.  
ES6 contains a lot of functions that really make Lodash redundant.

```
let arrExample = [1, 2, 3, 4, 5, 6, 7];
let objExample = {a: 1, b: 2, c: 3};
// Lodash
_.map(arrExample, currNumber => currNumber += 2);
_.reduce(arrExample, (sum, n) => sum + n, 0);
_.keys(objExample);
// ES6
arrExample.map(currNumber => currNumber += 2);
arrExample.reduce((accumulator, currentValue) => accumulator + currentValue);
Object.keys(objExample).map(currKey => console.log(currKey));
```

### moment Vs Date object:
[Moment.js](https://momentjs.com/) is a very powerful tool, but while it doesn’t include tree-shaking, you’re stuck with the whole library.  
Sometimes, all you need to do is to parse a date or format, and for that, you don’t really need a new package.

```
// Moment
moment().format("dddd, MMMM D, YYYY");
// Will print: Monday, October 8, 2018
// Date Object
let todayDate = new Date();
todayDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
// Will print: Monday, October 8, 2018
```

Keep in mind that both `toLocaleDateString` and moment accept locales. You can see a list of them [here](https://github.com/libyal/libfwnt/wiki/Language-Code-identifiers#language-identifiers).  
If you’re not ready to ditch the date library or you need some functionality that can’t be relied in the Date object, give [date-fns](https://date-fns.org/) a try as it includes tree-shaking and includes all functionality.

### Axios Vs Fetch(ES6):
There are many packages that came to solve our problem with sending HTTP request to the server when [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) wasn’t there and we only had [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest).  
They did their job but I believe it’s time to start implementing the new standard. Of course, this has some downsides as the API is still half-baked and while implementing it you will need to compromise on some stuff.  
Here’s an example of a request:

```
// Axios
axios.get('http://example.com/movies.json')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
// Fetch API
fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(myJson => console.log(myJson));
```

While doing this, you will see some changes, the main one is that we need to use `response.json()` in order to get the actual response object.  
Another problem with fetch is that a response with status code representing an error (500, 404 etc.) isn’t treated as an error and will be handled in the success section.  
So to handle server errors in a generic way I would probably build an error handling function:

```
function errorHandler(response) {
    if (!response.ok) {
        throw ServerError(response.statusText);
    } 
    
    return response;
}
fetch('http://httpstat.us/500')
  .then(response => errorHandler(response))
  .then(response => response.json())
  .then(myJson => console.log(myJson))
  .catch(error => console.log(error.text);
```

The last compromise you’ll need to make is that headers need to be added to each request you make.  
All of these problems can be handled by creating a wrapper to fetch function with your desired configuration.  
People usually claim the main problem with fetch is that you can’t cancel an ongoing request. But this problem already has a fix that was already merged to the fetch specification and is already in the DOM standards, though some browsers still don’t support it. But it’s yet to come.  
To sum it all up, maybe getting on board before was too early, now is the time to jump in.  

### Validator Vs Regexp
This one is actually a simple one. Validator is a great package but it includes lots of regular expressions. Sometimes you don’t need them all. To see if a field is numeric only, You don’t need the whole package.

```
// Validator
isNumeric(strExample);
// Will return false
// Regexp
const numericRegex = RegExp('/^[0-9]+$/');
const strExample = '1232456abc';
numericRegex.test(strExample);
// Will return false
```
### query-string Vs URLSearchParams
[URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) supported on almost all browsers (except for IE), provides a consistent interface to the bits and pieces of the URL and allows trivial manipulation of the query string. ([Easy URL manipulation with URLSearchParams](https://developers.google.com/web/updates/2016/01/urlsearchparams?hl=en)).

```
// query-string
const parsed = queryString.parse(location.search);
console.log(parsed);
// Will console: {foo: 'bar'}
// URLSearchParams
const parsed = new URLSearchParams(location.search);
console.log(parsed.get('foo'));
// Will console: 'bar'
```

## Conclusion
My final point is that we developers don’t need to take all of these packages for granted. We should check how stuff are written, are they well tested, and ask “Do I really need this package?”.  
Last but not least, if you decide to install a package to fulfill your wildest dream, try to follow the next steps.  

## What are my tips for choosing a new package?
Before adding a new package, I like to do some research.
1. Check for number of contributors — The more contributors involved in a package means more people who looked at the code and found it good enough to collaborate.
2. Check for number of stars — People usually star the projects they like and want to follow after.
3. Check for number of open issues — and whether they are being handled or not. You don’t want to implement a package and then find out that there’s a bug and no one will help you with it.
4. Read the source code — That’s probably the most important rule of all, if you don’t understand how it works, don’t implement it. Following this rule will let you see other ways of coding, new ideas and will let you understand the package quality.

Thanks!  
— Matan