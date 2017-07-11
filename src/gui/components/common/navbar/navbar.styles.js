import { css } from 'glamor'
import { primaryColor, primaryLightColor } from '../../../styles'

const layout = css(primaryColor, {
  display: 'flex',
  alignItems: 'center',
  height: '4em',
})

const title = css({
  fontSize: '1.2em',
  fontWeight: 'bolder',
  paddingLeft: '1em',
})

const navActions = css({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingRight: '1em',
  '> button': {
    padding: '.5em',
    marginLeft: '1em',
    border: '0px solid #fff',
    borderRadius: '.3em',
    cursor: 'pointer',
    outline: 'none',
  },
})

export default { layout, title, navActions }
