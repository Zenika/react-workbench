import React from 'react'
import PropTypes from 'prop-types'

import styles from './documentation.styles'

const Documentation = ({ content }) => {
  return (
    <textarea className={styles.layout}>
      {content}
    </textarea>
  )
}

Documentation.propTypes = {
  content: PropTypes.string.isRequired,
}

export default Documentation
