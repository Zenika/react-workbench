import { css } from 'glamor'

export const header = css({
  gridArea: 'header',
})

export const main = css({
  gridArea: 'main',
  padding: '10px',
  overflow: 'auto',
})

export const sidebar = css({
  gridArea: 'sidebar',
  padding: '10px',
  overflow: 'auto',
})

export default css({
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto 300px',
  gridTemplateRows: '40px auto',
  gridTemplateAreas: '"header header" "main sidebar"',
  alignItems: 'stretch',
  justifyContent: 'stretch',
})
