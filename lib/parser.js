const babylon = require('babylon')
const babelTraverse = require('babel-traverse').default
const fs = require('fs')
const { transformFromAst } = require('babel-core')
module.exports = {
  getAST: (path) => {
    const  content = fs.readFileSync(path, 'utf-8')
    return babylon.parse(content, {
      sourceType: 'module'
    })
  },
  getDependencies: (AST) => {
    const dependencies = []
    babelTraverse(AST, {
      ImportDeclaration: ({ node }) => {
        dependencies.push(node.source.value)
      }
    })
    return dependencies
  },
  transform: (ast) => {
    const  { code } = transformFromAst(ast, null, {
      presets: ['env']
    })
    return code
  }
}
