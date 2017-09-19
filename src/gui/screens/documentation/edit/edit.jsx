import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'
import { merge } from 'glamor'

import styles from './edit.styles'

const Edit = ({ markdown, className, onChange }) => {
  return (
    <textarea
      className={merge(styles.layout, className)}
      defaultValue={markdown}
      onChange={onChange}
    />
  )
}

Edit.propTypes = {
  markdown: PropTypes.string,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
}

Edit.defaultProps = {
  markdown: '',
  className: undefined,
  onChange: undefined,
}

export default onlyUpdateForPropTypes(Edit)
