import { readFile, writeFile } from 'node:fs/promises'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import phloemjs from "www/phloe.mjs"
import phloemjsApp from "./app/index.js"

const { StringAr } = phloemjs,
    utf8encodingOptions = { encoding: 'utf8' },
    HTMLimportmap = `<script type="importmap">{"imports": {"www/": "/"}}</script>`,
    phloemjsTag = `<script type="module" src="/phloe.mjs"></script>`,
    headBase = [HTMLimportmap + phloemjsTag, "HTMLgetRequireList", "headOld"],
    _hasHeadPl = e => e.k === "head"


class HTMLAr extends StringAr {
    constructor() {
        super(...arguments)
        if (!this._.some(_hasHeadPl)) console.warn(`HTMLAr's instance must have at least one placeholder {{head}} in raw string.`)
    }
    toString() {
        const $ = this.$, headOld = $.head
        headBase[1] = this.HTMLgetRequireList()
        headBase[2] = headOld
        $.head = headBase
        const s = super.toString()
        $.head = headOld
        return s
    }
}

const BuilderSuffix = ".builder.mjs"
const _endsWith = function (e) { return e.endsWith(this) }
function makeOne(filePath) {
    const wwwDir = this
    console.log("Make:", filePath)
    return import(join("www", filePath))
    .then(m => writeFile(join(wwwDir, filePath.slice(0, -BuilderSuffix.length)), String(m.default)))
    .catch(console.log)
}

Object.assign(phloemjs, {
    readFile: function (path, options) { return readFile(path, options || utf8encodingOptions) },
    writeFile: function (file, data, options) { return writeFile(file, data, options) },
    readFileSync: function (path, options) { return readFileSync(path, utf8encodingOptions || options) },
    writeFileSync: function (file, data, options) { return writeFileSync(file, data, options) },
    HTMLAr: HTMLAr,
    HTMLimportmap: HTMLimportmap,
    phloemjsTag: phloemjsTag,
    make: function (wwwDir) {
        phloemjsApp.initWWW(wwwDir)
        return Promise.allSettled(readdirSync(wwwDir, { recursive: true })
            .filter(_endsWith, BuilderSuffix)
            .map(makeOne, wwwDir))
    }

})

export default phloemjs