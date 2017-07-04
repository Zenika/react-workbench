import { css } from 'glamor'
import { primaryColor } from '../../styles'

const layout = css({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const font = css({
  fontFamily: 'Arial',
  fontSize: '1.2em',
  fontWeight: 'bolder',
})

export default css(primaryColor, layout, font)
