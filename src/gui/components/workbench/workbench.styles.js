import { css } from 'glamor'

const layout = css({
  display: 'flex',
  justifyContent: 'space-between',
  height: '100%',
})

const content = css({
  display: 'block',
  overflow: 'auto',
  padding: '1em',
})

const sidebar = css({
  display: 'block',
  overflow: 'auto',
  padding: '1em',
})

export default { layout, content, sidebar }
