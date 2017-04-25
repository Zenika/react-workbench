import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Input from './input'
import styles from './props.styles.scss'

const Props = ({ style, className, properties }) => {
  return (
    <div style={style} className={classnames(styles.props, className)}>
      { properties.map(prop => <Input key={prop} name={prop} />) }
    </div>
  )
}

Props.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  properties: PropTypes.array,
}

Props.defaultProps = {
  style: {},
  className: '',
  properties: [],
}

export default Props
