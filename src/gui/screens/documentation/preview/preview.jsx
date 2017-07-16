import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'

import styles from './preview.styles'

const Preview = ({ html, className }) => {
  return (
    <div className={merge(styles.layout, className)} dangerouslySetInnerHTML={{ __html: html }} />
  )
}

Preview.propTypes = {
  html: PropTypes.string.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
}

Preview.defaultProps = {
  className: undefined,
}

export default Preview
