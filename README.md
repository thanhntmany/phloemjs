# phloemjs-dev

This framework is built with the idea that we stil work based on available platform. (Browsers, Devices, Network topology...)


## Installing phloemjs
```bash
npm install -g https://github.com/thanhntmany/phloemjs
```

## Setup project
```bash
# Firstly, cd into project directory.
phloemjs init
phloemjs run
```

## CLI

```bash
phloemjs [options] <command>

Options:
    -wd <directory>|--working-directory=<directory>
                          Select working directory (default: current working directory)
Commands:
    init                  Initialize project
    run [-p <port>]       Run static website (on <port>, default: 3080)
    build [<pathspec>...] Scan and render by builders (*.builder.mjs)
```

## 2-Side (Backend + Frontend)

```javascript
/* @ModuleID: "www/phloe.mjs" */


// ESM
import phloemjs from "www/phloe.mjs";
// operations


// Dynamic Import
import("www/phloe.mjs").then((phloemjs_module) => {
    const phloemjs = phloemjs_module.default
    // operations
});
```

```html
<!-- Frontend (Browser) -->
<head>
  <script type="importmap">{"imports": {"www/": "/"}}</script>
  <script type="module" src="/phloe.mjs"></script>
  <!-- 2 lines above are automatically added into HTML code while using HTMLAr -->
</head>

<script>
  const const { StringAr } = phloemjs; // phloemjs has already been in global
  // operations
</script>
```


### Features:

#### StringAr

```javascript
const { StringAr } = phloemjs;

// init template
const template = new StringAr(`Sample {{placeholder_abc}}, end.`);

//Assign data
template.$.placeholder_abc = "DEF"
console.log(template.toString())  // Sample DEF, end.
console.log("" + template)        // Sample DEF, end.

// Assign new data
template.$.placeholder_abc = "GHI"
console.log(template.toString())  // Sample GHI, end.
console.log("" + template)        // Sample GHI, end.
```

#### dir
```javascript
phloemjs.dir('/abc/def/ghi/'); //Returns: '/abc/def/ghi'
phloemjs.dir('/abc/def/ghi'); //Returns: '/abc/def'
```

#### pathname [WIP]
```javascript
phloemjs.pathname('/abc/def/ghi/'); //Returns: '/abc/def/ghi'
phloemjs.pathname('/abc/def/ghi'); //Returns: '/abc/def'
```

#### dirname [WIP]
```javascript
phloemjs.dirname('/abc/def/ghi/'); //Returns: '/abc/def/ghi'
phloemjs.dirname('/abc/def/ghi'); //Returns: '/abc/def'
```

#### resolve [WIP]
```javascript
phloemjs.resolve('/abc/def/ghi/'); //Returns: '/abc/def/ghi'
phloemjs.resolve('/abc/def/ghi'); //Returns: '/abc/def'
```

#### moduleIdFromUrl [WIP]
```javascript
phloemjs.moduleIdFromUrl('/abc/def/ghi/'); //Returns: '/abc/def/ghi'
phloemjs.moduleIdFromUrl('/abc/def/ghi'); //Returns: '/abc/def'
```

#### HTML [WIP]
```javascript
phloemjs.HTML
```
[WIP]


## Just in Backend
```javascript
/* @ModuleID: "phloemjs/phloe.mjs" */

// ESM
import phloemjs from "phloemjs/phloe.mjs";

// CommonJS
const phloemjs = require("phloemjs");
```

### HTMLAr
```javascript
const { HTMLAr } = phloemjs;

// #TODO: test and add example here
```
