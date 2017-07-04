import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '../navbar'
import Props from '../props'

const innerStyle = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  content: {
    display: 'flex',
    height: '100%',
  },
  component: {
    margin: '10px',
  },
}

const Workbench = ({ style, className, children }) => {
  return (
    <div className={className} style={{ ...innerStyle.container, ...style }}>
      <Navbar />
      <div style={innerStyle.content}>
        <Props />
        <div style={innerStyle.component}>{children}</div>
      </div>
    </div>
  )
}

Workbench.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Workbench.defaultProps = {
  style: {},
  className: '',
}

export default Workbench
