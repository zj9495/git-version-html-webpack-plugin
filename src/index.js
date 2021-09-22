const HtmlWebpackPlugin = require('html-webpack-plugin')
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();

const NAME = "GitVersionPlugin"

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
    compiler.hooks.compilation.tap(
      NAME,
      (compilation, callback) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tap(
          NAME,
          (htmlPluginData, callback) => {
            htmlPluginData.html = this.comment + htmlPluginData.html;
            return htmlPluginData;
          }
        );
      }
    );
  }
}

module.exports = GitVersionPlugin;
