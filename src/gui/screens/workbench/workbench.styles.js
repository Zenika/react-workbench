import { css } from 'glamor'

const layout = css({
  display: 'flex',
  height: '100%',
  justifyContent: 'space-between',
})

const content = css({
  overflow: 'auto',
  padding: '1em',
})

const sidebar = css({
  overflow: 'auto',
  width: '25em',
})

export default { layout, content, sidebar }
