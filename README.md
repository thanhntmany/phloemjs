# phloemjs-dev

This framework is built with the idea that we stil work based on available platform. (Browsers, Devices, Network topology...)


### Installing phloemjs
```bash
npm install -g https://github.com/thanhntmany/phloemjs
```

## Setup project
```bash
# Firstly, cd into project directory.
phloemjs init
phloemjs run
```

## CLI Usages

```bash
phloemjs <command>...

Commands:
    init                        Initialize project
    run [-p <port>]             Run static website (on <port>, default: 3080)
    build [<pathspec>...] [--]  Scan and render by builders (*.builder.mjs)
```

## 2-Side (Backend + Frontend): "www/phloe.mjs"

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

*Frontend (Browser)*
```html
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


## Just in Backend: "phloemjs/phloe.mjs"

*ESM*
```javascript
import { HTMLAr, StringAr } from "phloemjs/phloe.mjs";
```

*Dynamic Import*
```javascript
import("www/phloe.mjs").then((phloemjs_module) => {
    const { HTMLAr, StringAr } = phloemjs_module
    // operations
});
```

### HTMLAr:
A subclass of StringAr. It is specifically used for generating HTML raw code. I will adde necessary tags in to output HTML code automatically.
```javascript
import { HTMLAr } from "phloemjs/phloe.mjs"

const templ = new HTMLAr(`<html>
<head></head>
<body></body>
</html>`)

console.log("" + templ)

/** output
<html>
<head><script type="importmap">{"imports": {"www/": "/"}}</script><script type="module" src="/phloe.mjs"></script></head>
<body></body>
</html>
*/
```