import { css } from 'glamor'

const layout = css({
  display: 'flex',
  justifyContent: 'space-between',
})

const content = css({
  overflow: 'auto',
  padding: '1em',
})

const sidebar = css({
  overflow: 'hidden',
  width: '25em',
})

export default { layout, content, sidebar }
