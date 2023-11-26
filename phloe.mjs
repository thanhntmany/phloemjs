import { writeFile } from 'node:fs/promises'
import { readdirSync } from 'node:fs'
import { join, relative } from 'node:path'
import phloemjs from "./app/store/www/phloe.mjs"
import phloemjsApp from "./app/index.js"


const { StringAr } = phloemjs,
    _headBase = `<script type="importmap">{"imports": {"www/": "/"}}</script><script type="module" src="/phloe.mjs" />`,
    _head_ = "{{_head_}}",
    HeadTagRe = /<[hH][eE][aA][dD]+(\s+[^\uFDD0-\uFDEF\s\"\'\>\/\=\uFFFE\uFFFF]+(\s*\=\s*([^\s\"\'\=\<\>\`]+|\'[^\']*\'|\"[^\"]*\"))?)*\s*(\/)?>/g

export { StringAr }
export class HTMLAr extends StringAr {
    constructor() {
        var o = arguments[0]
        if ((typeof o === 'string' || o instanceof String) && !o.includes(_head_)) {
            const re = (new RegExp(HeadTagRe))
            re.exec(o)
            const li = re.lastIndex
            arguments[0] = o.substring(0, li) + _head_ + o.substring(li)
        }
        super(...arguments)
    }
    toString() {
        this.$._head_ = [_headBase, this.HTMLgetRequireList()]
        return super.toString()
    }
}


const BuilderSuffix = ".builder.mjs"
const _endsWith = function (e) { return e.endsWith(this) }
function makeOne(filePath) {
    // #TODO
    const wwwDir = this
    console.log("Build:", filePath)
    return import(join("www", relative(filePath)))
        .then(m => writeFile(join(wwwDir, filePath.slice(0, -BuilderSuffix.length)), String(m.default)))
        .catch(console.log)
}

export function make(wwwDir) {
    phloemjsApp.initWWW(wwwDir)
    return Promise.allSettled(readdirSync(wwwDir, { recursive: true })
        .filter(_endsWith, BuilderSuffix)
        .map(makeOne, wwwDir))
}

export default phloemjs