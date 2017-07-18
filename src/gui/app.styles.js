import { css } from 'glamor'

const layout = css({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
})

const main = css({
  height: 'calc(100vh - 4em)',
  overflow: 'hidden',
})

export default { layout, main }
