module.exports = {
  resolve: {
    extensions: [`.js`, `.json`],
    modules: [
      `${__dirname}/node_modules`
    ],
    alias: {
      "@testing": `${__dirname}/src/testing`,
      "@tools": `${__dirname}/src/tools`
    }
  }
}
