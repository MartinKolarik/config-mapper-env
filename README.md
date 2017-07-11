# config-mapper-env

Maps configuration from config module files to environment variables.

## Installation

```
$ npm install config-mapper-env
```

## Usage

```js
// config/custom-environment-variables.js

const df = require('./default');
module.exports = require('config-mapper-env')(df);
```

## License
Copyright (c) 2017 Martin Kolárik. Released under the MIT license.
