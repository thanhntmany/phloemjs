import phloemjs from "./app/store/www/phloe.mjs"
import { fileURLToPath } from 'node:url'
import { readFileSync, writeFileSync } from "node:fs"
const readFileSyncOps = { encoding: "UTF-8" }

export function readFileSyncFromUrl(url, options) {
    return readFileSync(fileURLToPath(url), Object.assign({}, readFileSyncOps, options))
}

export function writeFileSyncToUrl(url, data) {
    return writeFileSync(fileURLToPath(url), data)
}

const isObject = item => item && typeof item === 'object' && !Array.isArray(item);
function _mergeDeep(target, source) {
    if (isObject(target) && isObject(source)) {
        var key; for (key in source) {
            if (isObject(source[key])) {
                if (!isObject(target[key])) target[key] = {}
                _mergeDeep(target[key], source[key]);
            }
            else target[key] = source[key]
        }
    }
}

function mergeDeep(target, ...sources) {
    var source; while (source = sources.shift()) _mergeDeep(target, source)
    return target
}


const { StringAr } = phloemjs,
    _importmap = [`<script type="importmap">`, , `</script>`],
    _mainScript = `<script type="module" src="/phloe.mjs"></script>`,
    innerHeadRe = /<([hH][eE][aA][dD])+(\s+[^\uFDD0-\uFDEF\s\"\'\>\/\=\uFFFE\uFFFF]+(\s*\=\s*([^\s\"\'\=\<\>\`]+|\'[^\']*\'|\"[^\"]*\"))?)*\s*(\/)?>([\s\S]*?)<\/\1[^>]*>/,
    _head_ = "{{_head_}}",
    HeadTagRe = /<[hH][eE][aA][dD]+(\s+[^\uFDD0-\uFDEF\s\"\'\>\/\=\uFFFE\uFFFF]+(\s*\=\s*([^\s\"\'\=\<\>\`]+|\'[^\']*\'|\"[^\"]*\"))?)*\s*(\/)?>/g

const ImportmapRe = /<(script)\s+type\s*=\s*((("|')importmap\4)|importmap)\s*>([\s\S]*?)<\/\1\s*>/g,
    _importmapReplacer = function () {
        // this -> importmap
        const raw = arguments[5]
        try {
            mergeDeep(this, JSON.parse(raw))
        } catch (e) {
            console.log(`Error when parsing importmap:\n${arguments[0]}`)
            console.error(e)
        }
        return ""
    }


export { StringAr }
export class HTMLAr extends phloemjs.StringAr {
    constructor(o = "", $ = {}) {
        var iH = ""
        if (typeof o === 'string' || o instanceof String) {
            iH = o.match(innerHeadRe)[6]

            const importmap = {}
            o = o.replace(ImportmapRe, _importmapReplacer.bind(importmap))
            if (!$.importmap) { $.importmap = importmap }
            else mergeDeep($.importmap, mergeDeep(importmap, $.importmap))

            o = o.replaceAll(_mainScript, "")

            if (!o.includes(_head_)) {
                const re = (new RegExp(HeadTagRe))
                re.exec(o)
                const li = re.lastIndex
                o = o.substring(0, li) + _head_ + o.substring(li)
            }
        }

        super(o, $)
        this._iH = iH
        this._L = new Set([_mainScript])
        this._L1 = new Set()
        this.updateImportmap()
    }
    updateImportmap() {
        this._L.delete(this.$._importmap_)
        const importmap = this.$.importmap; (importmap.imports || (importmap.imports = {}))["www/"] = "/"
        this.$._importmap_ = _importmap.with(1, JSON.stringify(importmap))
        this._L.add(this.$._importmap_)
        return this
    }
    toString() {
        this.$._head_ = [this.$._importmap_, _mainScript, this.HTMLgetRequireList(this._L, this._L1, this._iH)]
        return super.toString()
    }
}
