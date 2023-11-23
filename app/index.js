'use strict'
const { join, relative } = require('node:path'),
    FS = require('node:fs'),
    packageJsonFile = join(__dirname, "store", "www", "package.json"),
    phloemjsFile = join(__dirname, "store", "www", "phloe.mjs")

const app = {
    files: {
        packageJson: packageJsonFile,
        phloemjs: phloemjsFile
    },
    initWWW: function (dir) {
        const p = join(dir, "package.json"), c = join(dir, "phloe.mjs"), rmOps = { force: true }
        FS.rmSync(p, rmOps)
        FS.rmSync(c, rmOps)
        FS.copyFileSync(packageJsonFile, p, FS.constants.COPYFILE_FICLONE)
        FS.copyFileSync(phloemjsFile, c, FS.constants.COPYFILE_FICLONE)
    },
    make: function (wwwDir) {
        return import("../server-side.mjs").then(m => m.default.make(wwwDir))
    }
}

module.exports = exports = app