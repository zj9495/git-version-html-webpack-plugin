const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const gitRevisionPlugin = new GitRevisionPlugin();

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
      "GitVersionPlugin",
      (compilation, callback) => {
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap(
          "GitVersionPlugin",
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