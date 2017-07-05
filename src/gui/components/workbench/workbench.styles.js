import { css } from 'glamor'

const layout = css({
  display: 'grid',
  gridTemplateColumns: 'auto 300px',
  gridTemplateRows: '40px auto',
  gridTemplateAreas: '"header header" "main sidebar"',
})

export const header = css({
  gridArea: 'header',
})

export const main = css({
  gridArea: 'main',
})

export const sidebar = css({
  gridArea: 'sidebar',
})

export default layout
