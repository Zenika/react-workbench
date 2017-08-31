import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'
import { merge } from 'glamor'
import styles from './state.styles'

const State = ({ style, className, state, onChange, setState }) => {
  return (
    <div style={style} className={merge(styles.layout, className)}>
      <button onClick={setState}>set</button>
      <textarea className={styles.textarea} value={state} onChange={onChange} />
    </div>
  )
}

State.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  state: PropTypes.object,
  onChange: PropTypes.func,
  setState: PropTypes.func,
}

State.defaultProps = {
  style: {},
  className: '',
  state: undefined,
  onChange: undefined,
  setState: undefined,
}

export default onlyUpdateForPropTypes(State)
