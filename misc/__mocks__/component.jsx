import React from 'react'

export default (name) => {
  const debug = {
    name,
    props: {},
  }

  return props => {
    const debugStr = JSON.stringify({ ...debug, props })
    return (
      <div className={name}>{debugStr}</div>
    )
  }
}
