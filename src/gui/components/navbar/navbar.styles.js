import { css } from 'glamor'
import { primaryColor } from '../../styles'

const layout = css(primaryColor, {
  display: 'flex',
  alignItems: 'center',
})

const title = css({
  fontSize: '1.2em',
  fontWeight: 'bolder',
  paddingLeft: '1em',
})

export default { layout, title }
