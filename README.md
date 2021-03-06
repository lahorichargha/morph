# Views language morpher

[There are some docs!!!](https://github.com/viewsdx/docs)

The easiest way to integrate Views with your project is to run it as a
standalone command. You can install it with:

```
npm install --save-dev views-morph
```

Then, you can use it with any React or React Native app like this from within
your project's folder:

```
# run on the src directory and morph as react-dom
views-morph src --watch --as react-dom

# run on the current directory and morph as react-native
views-morph . --watch --as react-dom
```

Views morphs `.view` files into `.view.js`. You may want to add those to `.gitignore`:

```
**/*.view.js
```

Run the tests with `yarn test`. If you want to debug the tests, run:
```
node --inspect-brk node_modules/.bin/jest --runInBand
```

See https://views.tools for more info.

License BSD-Clause-3

by UXtemple
