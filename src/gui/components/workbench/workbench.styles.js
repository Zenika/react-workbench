import { css } from 'glamor'

const layout = css({
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto 300px',
  gridTemplateRows: '40px auto',
  gridTemplateAreas: '"header header" "main sidebar"',
  alignItems: 'stretch',
  justifyContent: 'stretch',
})

const header = css({
  gridArea: 'header',
})

const main = css({
  gridArea: 'main',
  padding: '1em',
  overflow: 'auto',
})

const sidebar = css({
  gridArea: 'sidebar',
  padding: '1em',
  overflow: 'auto',
})

export default { layout, header, main, sidebar }
