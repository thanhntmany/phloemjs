'use strict'
const { isAbsolute, join } = require('node:path'),
    FS = require('node:fs'),
    rmOps = { force: true }


module.exports = exports = {
    wwwDir: process.cwd(),
    port: 3080,
    setWWWDir: function (p) {
        this.wwwDir = isAbsolute(p) ? p : join(this.wwwDir, p)
        return this
    },
    setPort: function (p) {
        this.port = p
        return this
    },
    files: {
        packageJson: join(__dirname, "store", "www", "package.json"),
        phloemjs: join(__dirname, "store", "www", "phloe.mjs")
    },
    setup: function () {
        const p = join(this.wwwDir, "package.json"), c = join(this.wwwDir, "phloe.mjs")
        FS.rmSync(p, rmOps)
        FS.rmSync(c, rmOps)
        FS.copyFileSync(this.files.packageJson, p, FS.constants.COPYFILE_FICLONE)
        FS.copyFileSync(this.files.phloemjs, c, FS.constants.COPYFILE_FICLONE)
    },
    make: function (wwwDir) {
        return import("../phloe.mjs").then(m => m.default.make(wwwDir))
    },
    createStaticWebServer: function() {
        const express = require("express"), webApp = express()
        webApp.use(express.static(this.wwwDir))
        return webApp
    },
    run: function () {
        const webApp = this.createStaticWebServer()
        webApp.listen(this.port, () => {
            console.log(`--> http://localhost:${this.port}`)
        });
        return webApp
    }
}
