const generateTitle = (name) => {
  return `# ${name}\n\n`
}

const generateDescription = (description) => {
  return description ? `${description}\n\n` : ''
}

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

module.exports = (name, doc) => {
  let markdown = ''
  markdown += generateTitle(name)
  markdown += generateDescription(doc.description)
  markdown += generateProps(doc.props)
  return markdown
}
