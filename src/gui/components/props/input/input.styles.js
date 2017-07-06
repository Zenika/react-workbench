import { css } from 'glamor'

const layout = css({
  margin: '5px 0',
  '& input[type="text"]': {
    width: '100%',
  },
  '& input[type="checkbox"]': {
    paddingLeft: '10px',
  },
})

export default { layout }
