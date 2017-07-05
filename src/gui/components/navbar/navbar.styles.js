import { css } from 'glamor'
import { primaryColor } from '../../styles'

const layout = css({
  display: 'flex',
  alignItems: 'center',
})

export const title = css({
  fontSize: '1.2em',
  fontWeight: 'bolder',
  paddingLeft: '10px',
})

export default css(primaryColor, layout)
