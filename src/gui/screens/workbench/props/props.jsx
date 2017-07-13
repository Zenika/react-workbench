import React from 'react'
import PropTypes from 'prop-types'
import { merge } from 'glamor'
import Input from './input'

import styles from './props.styles'

const Props = ({ style, className, properties }) => {
  return (
    <div style={style} className={merge(styles.layout, className)}>
      { properties.map(prop => <Input key={prop} name={prop} />) }
    </div>
  )
}

Props.propTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  properties: PropTypes.array,
}

Props.defaultProps = {
  style: {},
  className: undefined,
  properties: [],
}

export default Props
