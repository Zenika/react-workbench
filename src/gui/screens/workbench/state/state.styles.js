import { css } from 'glamor'

const layout = css({
  display: 'flex',
  flexDirection: 'column',
  height: 'calc(100% - 3em)',
})

const textarea = css({
  flex: '1',
})

export default { layout, textarea }
