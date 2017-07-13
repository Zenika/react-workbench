import { css } from 'glamor'

const layout = css({
  display: 'flex',
  margin: 0,
  padding: 0,
  listStyle: 'none',
  borderBottom: '1px solid #ddd',
})

const item = css({
  cursor: 'pointer',
  marginRight: 0,
  padding: '.9em 1.1em',
  lineHeight: '1.1em',
  color: '#607580',
  fontWeight: 600,
})

const selected = css({
  cursor: 'default',
  color: '#243641',
  backgroundColor: '#ddd',
})

export default { layout, item, selected }
