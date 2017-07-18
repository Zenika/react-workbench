import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './edit.styles'

const Edit = ({ markdown, className }) => {
  return (
    <textarea className={merge(styles.layout, className)} defaultValue={markdown} />
  )
}

Edit.propTypes = {
  markdown: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Edit.defaultProps = {
  className: undefined,
}

export default Edit
