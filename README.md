# What is my viewport?
A nice tool to discover some useful information about your current viewport, browser and OS. :tada:  
Available at [myviewport.com](https://myviewport.com) :globe_with_meridians:


## :gem: Stack
Built with [Svelte](https://svelte.dev/), it uses the global `window`, `navigator`, `screen`, `localStorage`, `sessionStorage` and `document.cookie` objects in order to retrieve information about the current user's viewport.

The CSS is self-made, no framework; it also uses GitHub Actions as the CI/CD and GitHub Pages as the host, with a custom domain provided by Google Domains.

To get more acurate information about the OS it uses the [`bowser`](https://www.npmjs.com/package/bowser) package - which parses the `userAgent` string and returns an object with nice info.


## :pencil: Contributing 
You can contribute to this project following the steps below:

- Fork the repo
- Create a new branch
- Do the work
- Fill a PR, assign it to you and, if possible, write a cool description
- Wait for the review

Also, take a look at the [contributing guide](https://github.com/jlozovei/viewport/blob/master/.github/CONTRIBUTING.md)!


## :computer: Developing
After forking and cloning the project in your local environment, run the following commands:

```bash
# install dependencies
npm i
# or yarn

# run the project at localhost:5000
npm run dev
# or yarn dev

# run the tests
npm run test
# or yarn test
```


## :closed_lock_with_key: License
Licensed under the [MIT License](https://github.com/jlozovei/viewport/blob/master/LICENSE).
