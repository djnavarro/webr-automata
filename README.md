# Simple cellular automaton in WebR

This repository contains source code for the cellular automaton hosted at https://webr-automata.djnavarro.net/. Most of the code is in the following files:

- `index.html` contains the skeleton of the website
- `automaton.R` defines the R function that runs the automaton
- `webr-app.js` contains the javascript code that calls WebR

Other files include:

- `webr-serviceworker.js` is needed by WebR 
- `webr-worker.js` is needed by WebR
- `serve.R` is a convenience script to serve the site locally
- `netlify.toml` supplies headers needed when deploying to netlify
