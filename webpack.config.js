module.exports = {
  resolve: {
    extensions: [`.js`, `.json`],
    modules: [
      `${__dirname}/node_modules`
    ],
    alias: {
      "@math": `${__dirname}/src/math`
    }
  }
}
