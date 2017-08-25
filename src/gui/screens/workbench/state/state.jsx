import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'

const State = ({ style, className, state, onChange, setState }) => {
  return (
    <div style={style} className={className}>
      <textarea value={state} onChange={onChange} />
      <button onClick={setState}>set</button>
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
