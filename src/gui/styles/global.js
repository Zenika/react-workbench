import 'glamor/reset'

import { css } from 'glamor'

// set global css rules
css.global('html, body', {
  padding: 0,
  margin: 0,
  fontFamily: 'Arial, Helvetica, sans-serif',
  fontSize: '13px',
})

css.global('*', {
  boxSizing: 'border-box',
})
