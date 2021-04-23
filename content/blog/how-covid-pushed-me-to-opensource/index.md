---
slug: 'how-covid-pushed-me-to-opensource'
title: How COVID pushed me to Open Source
date: '2021-04-14'
author: 'Matan Borenkraout'
categories:
  - 'open source'
banner: './images/banner.jpg'
bannerCredit: 'Photo by [Raz Lifshitz](https://twitter.com/razlifshitz)'
description: This is a short personal retrospective of the last year.
isDraft: true
---

## Intro

Before I start, I want to say I'm sorry to everyone who suffered and are still suffering from COVID-19. It has changed our lives upside down and unfortunately it's not behind us yet.  
Stay safe, keep wearing a mask and get vaccinated if you can.  
This is a short personal retrospective of the last year that will mainly focus on my Open Source work and will also include some tips. I hope you'll find them useful.

## Quarantines, lockdowns and everything between

Back at February 2020, I came back from a honeymoon in Thailand.  
COVID-19 has just started and my flight was the first flight to land in Israel and sent to self quarantine. For the first time in my life, I didn't need to get out of home to work, I had around 2 hours of extra time a day.  
I decided to make an effort and give Open Source a try, but I had a major mental barrier: Am I capable enough to even contribute to Open Source? And even if I am, to which repo should I contribute? I know nothing about what's going on inside the repos, I just use them. These were fair questions at the time.

The only thing I didn't realise is that **nobody** knows everything and I am capable to contribute because I **want** to contribute.  
Regarding the last point, I decided to follow [Kent C. Dodds](https://twitter.com/kentcdodds)'s advice and try to contribute to projects I use daily.

I wasn't too familiar with how stuff work in Open Source but thought that contributing to docs will probably be an easy way in.  
Since I'm using [Redux](https://redux.js.org/) on a daily basis, I saw that the docs were still using Enzyme and decided to try and push React Testing Library as a replacement. I've created a [PR](https://github.com/reduxjs/redux/pull/3708), nothing too fancy.  
I tagged Kent C. Dodds for a review. He commented. The fact that Kent took the time to review my PR blew my mind, I was hooked. But that PR wasn't merged until June.  

It took me another lockdown to make my second effort, this time I was also trying to find a welcoming community to help me onboard into open source, so I went to the Testing Library's docs.  
I've made a [PR](https://github.com/testing-library/testing-library-docs/pull/424), it was related to my PR in Redux and it got merged.  
This PR doesn't look interesting, but in fact, it taught me a lot.

I was so happy I got the chance to contribute, I didn't even test my changes.  
They didn't compile 🤦🏼‍♂️  
In other words:

![Oh gosh golly, I made a boo-boo](./images/gosh-golly.gif)

Only later on I read about [learning in public](https://www.swyx.io/learn-in-public/) and what it feels like to "get things wrong in public". I learned a lot about responsibility and how it feels when you put your name on something that isn't right.

In open source you can:
1. Community: I met incredible people. People who want to help, share troubles and find solutions together. A loving and welcoming community makes you feel like you're in the right place ([TestingLib](https://github.com/testing-library/)❤️).  
Another thing related to the community is every comment people post for a fix or an answer I'm providing. Knowing that I helped someone can really make my day.  
1. Learning: I learned a lot and am still learning. Starting from tools and features, all the way to work processes and human skills. Open Source has been an amazing opportunity for me to learn new stuff and get involved in processes I'm not familiar with.
## Technical Tips
1. [Watch repos](https://twitter.com/kentcdodds/status/1266363225668374533): I started by watching the repos I want to contribute to and answering issues. Since I used these projects daily, I found most of the issues quite straightforward and if not, I debugged and looked at the code to try and figure things out.
2. Go over the open issues and the "Good first issue label": Most of the "good first issue" are probably taken. But try to understand the requirements and go over the code and discussion. It will give you some context and background on what's going on in the project at the moment.
3. Read the codebase: This is a hard one, but it is valuable. I'd start with the open PR's. Usually they try to tackle an issue, it might get you in an easy entry point (this isn't always the case). The codebase itself can also be nice to understand and navigate through. Clone the repo and try reading the tests.

## Summary
This might sound cheesy, but Open Source has been really good to me. And I urge you to give it a try too. The first contribution is the hardest, but once you jump over that, the sky is the limit :)

If you have any questions, I'm available on [twitter](https://twitter.com/matanbobi).  
Thanks for following! ❤️  
Stay safe and hope you're all well.

More references:
[Kent C. Dodds on how to contribute to open source](https://kentcdodds.com/blog/introducing-how-to-contribute-to-open-source)  
[Kent C. Dodds on which project should I contribute to](https://kentcdodds.com/blog/what-open-source-project-should-i-contribute-to)  
[Swyx](https://twitter.com/swyx) [Pick up what they put down](https://www.swyx.io/puwtpd/)  
