'use strict'
const { dirname, isAbsolute, join, sep } = require('node:path'),
    { constants, copyFileSync, statSync, readdirSync, realpathSync, rmSync, writeFileSync } = require('node:fs'),
    readdirSyncOps = { recursive: true },
    rmOps = { force: true },
    statSyncOps = { throwIfNoEntry: false }

const BuilderSuffix = ".builder.mjs",
    _endsWith = function (e) { return e.endsWith(this) }


module.exports = exports = {
    wd: process.cwd(),
    wwwDir: undefined,

    findWWWDir: function () {
        if (this.wwwDir) return this.wwwDir

        const NMs = join("node_modules", "www")
        var wd = this.wd, p, stat
        do {
            if ((stat = statSync(p = join(wd, NMs), statSyncOps)) && stat.isDirectory()) return this.wwwDir = realpathSync(p)
        }
        while (wd !== (wd = dirname(wd)))

        console.error(`"www" package directory is not found from the current folder.\nLocation into initialized project or init new one by below command first:\n\n    phloemjs init\n`)
        return undefined
    },

    init: function () {
        require('child_process').execSync(
            `npm init -y && npm i phloemjs && mkdir -p app/www && npm init -y -w ./app/www`,
            { cwd: this.wd }
        )
        this.setup()
        const wwwDir = this.findWWWDir()
        import("./store/www/index.html.builder.mjs")
            .then(m => writeFileSync(join(wwwDir, "index.html"), String(m.default)))
            .catch(console.error)
    },

    setup: function () {
        const wwwDir = this.findWWWDir()
        if (!wwwDir) return

        const c = join(wwwDir, "phloe.mjs")
        rmSync(c, rmOps)
        copyFileSync(join(__dirname, "store", "www", "phloe.mjs"), c, constants.COPYFILE_FICLONE)
    },

    createStaticWebServer: function () {
        const wwwDir = this.findWWWDir()
        if (!wwwDir) return
        const express = require("express"), webApp = express()
        webApp.use(express.static(wwwDir))
        return webApp
    },

    run: function () {
        if (!this.findWWWDir()) return;

        const webApp = this.createStaticWebServer()
        webApp.listen(this.port, () => {
            console.log(`--> http://localhost:${this.port}`)
        });
        return webApp
    },

    port: 3080,

    setPort: function (p) {
        this.port = p
        return this
    },


    buildByBuilder: function (filePath) {
        const outPath = filePath.slice(0, -BuilderSuffix.length)
        console.log("@Phloemjs: Build:", outPath)
        return import(filePath).then(m => writeFileSync(outPath, String(m.default))).catch(console.error)
    },

    buildInDirectory: function (dirPath) {
        if (!dirPath) dirPath = this.findWWWDir()
        if (!dirPath) return

        return Promise.allSettled(readdirSync(dirPath, readdirSyncOps)
            .filter(_endsWith, BuilderSuffix)
            .filter(p => !p.split(sep).includes("node_modules"))
            .map(p => join(dirPath, p))
            .map(this.buildByBuilder, this))
    }

}
