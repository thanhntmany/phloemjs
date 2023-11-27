import phloemjs from "./app/store/www/phloe.mjs"
import { fileURLToPath } from 'node:url'
import { readFileSync as _readFileSync } from "node:fs"
const readFileSyncOps = { encoding: "UTF-8" }

export function readFileSyncFromUrl(url, options) {
    return _readFileSync(fileURLToPath(url), Object.assign({}, readFileSyncOps, options))
}

const { StringAr } = phloemjs,
    _importmap = `<script type="importmap">{"imports": {"www/": "/"}}</script>`,
    _mainScript = `<script type="module" src="/phloe.mjs"></script>`,
    _head_ = "{{_head_}}",
    HeadTagRe = /<[hH][eE][aA][dD]+(\s+[^\uFDD0-\uFDEF\s\"\'\>\/\=\uFFFE\uFFFF]+(\s*\=\s*([^\s\"\'\=\<\>\`]+|\'[^\']*\'|\"[^\"]*\"))?)*\s*(\/)?>/g

export { StringAr }
export class HTMLAr extends phloemjs.StringAr {
    constructor() {
        var o = arguments[0], inputByString = (typeof o === 'string' || o instanceof String)
        if (inputByString && !o.includes(_head_)) {
            const re = (new RegExp(HeadTagRe));
            re.exec(o)
            const li = re.lastIndex
            arguments[0] = o.substring(0, li) + _head_ + o.substring(li)
        }
        super(...arguments)
        if (inputByString && !this.$._headBase) this.$._headBase = "" + (o.includes(_importmap) ? "" : _importmap) + (o.includes(_mainScript) ? "" : _mainScript)
    }
    toString() {
        this.$._head_ = [this.$._headBase, this.HTMLgetRequireList()]
        return super.toString()
    }
}
