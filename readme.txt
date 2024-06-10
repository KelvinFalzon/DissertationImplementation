Important: this implementation does not include the node-modules folder since it is being pushed on a GitHub Repo.
First install Node-Modules in all 3 folders: Results, typescript-analysis, typescript-analysis2

Command: npm install 
Alternative command: npm ci

//implementation


navigate inside folder ./typescript-analysis/

--Base implementation

Command: npm run build:ts
-builds base implementation of Typescript inside dist

Command: http-server dist
-hosts base implementation on an http server


--Standard optimisation

Command: npm run build:webpack
-builds standard optimisation of Typescript with Webpack and Babel inside dist-webpack
-opens Webpack bundle analyzer automatically on the browser and shows bundle size

Command: http-server dist-webpack
-hosts standard optimisation on an http server


navigate inside folder ./typescript-analysis2/

--Custom implementation

Command: npm run build:customwebpack
-builds custom optimisation settings of Typescript with Webpack custom plugin and Babel inside dist-new-webpack
-opens Webpack bundle analyzer automatically on the browser and shows bundle size for custom configuration

Command: http-server dist-new-webpack
-hosts optimised version on an http server


//for results

navigate inside folder ./Results/

Command: node performance.js
-runs performance.js initialises Puppeteer which saves data inside a new JSON file.

Command: python .\python\visuals.py
-runs visuals.py which does the data processing and charts

-ignore readJSON.py that is for testing
