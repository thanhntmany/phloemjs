# phloemjs-dev

This framework is built with the idea that we stil work based on available platform. (Browsers, Devices, Network topology...)


## Installing
```
npm install -g https://github.com/thanhntmany/phloemjs
```

# Usage

## CLI

```bash
phloem [options] <command>

Options:
  -wd <directory>|--www-directory=<directory>
                    Select www folder (default: current working directory)

Command:
    setup           Setup root files at root directory
    run [-p <port>] Run static website (on <port>)
```

## 2-Side (Backend + Frontend)

### Import:

*ESM*
```javascript
import phloemjs from "www/phloe.mjs";
```

*Dynamic Import*
```javascript
import("www/phloe.mjs").then((phloemjs_module) => {
    const phloemjs = phloemjs_module.default

    // operations

});
```

### Features:

#### StringAr

```javascript
const { StringAr } = phloemjs;

// init template
const sample_template = new StringAr(`Sample {placeholder_abc}, end template.`);

//Assign data
sample_template.$.placeholder_abc = "DEF"

//Render
console.log(sample_template.toString())
// Sample DEF, end template.
console.log("" + sample_template)
// Sample DEF, end template.

// Assign new data
sample_template.$.placeholder_abc = "GHI"
//Render
console.log(sample_template.toString())
// Sample GHI, end template.
console.log("" + sample_template)
// Sample GHI, end template.
```

#### dir [WIP]
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

## Frontend (Browser)

```html
// Setup
<head>
  <script type="importmap">{"imports": {"www/": "/"}}</script>
  <script type="module" src="/phloe.mjs"></script>
</head>

// Run
<script>
// phloemjs has already been in global
const const { StringAr } = phloemjs;
// operations

</script>
```

## Backend

*ESM*
```javascript
import phloemjs from "phloemjs/phloe.mjs";
```

*CommonJS*
```javascript
const phloemjs = require("phloemjs");
```

### **NOTE:** The *backend* `phloemjs` has all feature of *2-Side* `phloemjs`
#### HTMLAr
```javascript
phloemjs.HTMLAr
```
