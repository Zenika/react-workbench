import { css } from 'glamor'

const layout = css({
  height: '100%',
  width: '100%',
  maxHeight: '100%',
  '& blockquote': {
    marginLeft: '0',
    paddingLeft: '1em',
    borderLeft: '.4em solid #AAA',
  },
  '& blockquote p': {
    lineHeight: '1.4em',
  },
})

export default { layout }
