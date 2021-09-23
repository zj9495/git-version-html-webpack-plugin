const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();
const fs = require('fs')
const { resolve } = require('path')

const pluginName = "GitVersionPlugin"

class GitVersionPlugin {
  comment = "";

  constructor() {
    this.comment =
`<!--
  VERSION: ${gitRevisionPlugin.version()}
  COMMITHASH: ${gitRevisionPlugin.commithash()}
  BRANCH: ${gitRevisionPlugin.branch()}
  LASTCOMMITDATETIME: ${new Date(gitRevisionPlugin.lastcommitdatetime())}
  BUILDDATETIME: ${new Date()}
-->\n`;
  }

  apply(compiler) {
    compiler.hooks.assetEmitted.tap(pluginName, (file, {content}) => {
      if (/index\.html?$/.test(file)) {
        const res = this.comment + content.toString()
        fs.writeFileSync(resolve(compiler.outputPath, file), res)
      }
    })
  }
}

module.exports = GitVersionPlugin;
