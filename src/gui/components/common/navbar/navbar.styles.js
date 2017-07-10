import { css } from 'glamor'
import { primaryColor } from '../../../styles'

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
    borderRadius: '3px',
    color: '#666',
    fontWeight: '600',
    cursor: 'pointer',
    outline: 'none',
  },
  '> button:hover': {
    color: '#37474f',
  },
})

export default { layout, title, navActions }
