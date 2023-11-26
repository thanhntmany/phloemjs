'use strict'
const { dirname, isAbsolute, join } = require('node:path'),
    { constants, copyFileSync, statSync, readdirSync, realpathSync, rmSync } = require('node:fs'),
    readdirSyncOps = { recursive: true },
    rmOps = { force: true }

const BuilderSuffix = ".builder.mjs",
    _endsWith = function (e) { return e.endsWith(this) }


module.exports = exports = {
    wd: process.cwd(),
    wwwDir: undefined,
    port: 3080,

    setWD: function (p) {
        this.wd = isAbsolute(p) ? p : join(this.wd, p)
        return this
    },

    findWWWDir: function () {
        if (this.wwwDir) return this.wwwDir

        const NMs = join("node_modules", "www"), statSyncOps = { throwIfNoEntry: false }
        var wd = this.wd, p, stat
        do {
            if ((stat = statSync(p = join(wd, NMs), statSyncOps)) && stat.isDirectory()) return this.wwwDir = realpathSync(p)
        }
        while (wd !== (wd = dirname(wd)))

        console.error(`www package directory is not found from the current folder.\nLocation into initialized project or init new one by below command first:\n\n    phloemjs init\n`)
        return undefined
    },

    setPort: function (p) {
        this.port = p
        return this
    },

    files: {
        packageJson: join(__dirname, "store", "www", "package.json"),
        phloemjs: join(__dirname, "store", "www", "phloe.mjs")
    },

    init: function () {
        require('child_process').execSync(
            `npm init -y && mkdir -p app/www && npm init -y -w ./app/www`,
            { cwd: this.wd }
        )
        this.setup()
    },

    setup: function () {
        const wwwDir = this.findWWWDir()
        if (!wwwDir) return
        const p = join(wwwDir, "package.json"), c = join(wwwDir, "phloe.mjs")
        rmSync(p, rmOps)
        rmSync(c, rmOps)
        copyFileSync(this.files.packageJson, p, constants.COPYFILE_FICLONE)
        copyFileSync(this.files.phloemjs, c, constants.COPYFILE_FICLONE)
    },

    createStaticWebServer: function () {
        const wwwDir = this.findWWWDir()
        if (!wwwDir) return
        const express = require("express"), webApp = express()
        webApp.use(express.static(wwwDir))
        return webApp
    },

    run: function () {
        this.findWWWDir()
        const webApp = this.createStaticWebServer()
        webApp.listen(this.port, () => {
            console.log(`--> http://localhost:${this.port}`)
        });
        return webApp
    },

    buildOne: function (filePath) {
        const wwwDir = this.findWWWDir()
        if (!wwwDir) return

        console.log("Build:", filePath)

        return import(join("www", filePath))
            .then(m => writeFile(join(wwwDir, filePath.slice(0, -BuilderSuffix.length)), String(m.default)))
            .catch(console.log)
    },

    build: function () {
        const wwwDir = this.findWWWDir()
        if (!wwwDir) return

        return Promise.allSettled(readdirSync(wwwDir, readdirSyncOps)
            .filter(_endsWith, BuilderSuffix)
            .map(this.buildOne, wwwDir))
    }

}
