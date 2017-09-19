import { css } from 'glamor'

const layout = css({
  margin: '.5em 0',
  '& input[type="text"]': {
    width: '100%',
  },
  '& input[type="checkbox"]': {
    paddingLeft: '1em',
  },
})

export default { layout }
