const generateTitle = name => `# ${name}`

const generateDescription = (description = '') => `> ${description}`

const generateProp = (name, prop) => {
  return `${name}|${prop.required}|${prop.type.name}\n`
}

const generateProps = (props) => {
  if (props) {
    return Object.keys(props)
      .reduce((a, b) => {
        return `${a}${generateProp(b, props[b])}`
      }, '')
  }
  return ''
}

module.exports = (name, doc) => `
${generateTitle(name)}

${generateDescription(doc.description)}

${generateProps(doc.props)}
`
