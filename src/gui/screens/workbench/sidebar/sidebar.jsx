import React from 'react'
import PropTypes from 'prop-types'
import { onlyUpdateForPropTypes } from 'recompose'
import { Tabs, Tab } from '../../../components/tabs'
import Props from './props'
import State from './state'

const Sidebar = ({ style, className, states, onStateNameChange, onSave }) => {
  return (
    <div style={style} className={className}>
      <div>
        <select>
          {states.map(state => <option key={state} value={state}>{state}</option>)}
        </select>
        <input type="text" onChange={onStateNameChange} />
        <button onClick={onSave}>Save</button>
      </div>

      <Tabs>
        <Tab tabKey="props" title="props"><Props /></Tab>
        <Tab tabKey="state" title="state"><State /></Tab>
      </Tabs>
    </div>
  )
}

Sidebar.propTypes = {
  style: PropTypes.object,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  states: PropTypes.arrayOf(PropTypes.string),
  onStateNameChange: PropTypes.func,
  onSave: PropTypes.func,
}

Sidebar.defaultProps = {
  style: {},
  className: '',
  states: [],
  onStateNameChange: undefined,
  onSave: undefined,
}

export default onlyUpdateForPropTypes(Sidebar)
