import React from 'react'
import router from 'hoc-little-router'

const Documentation = () => {
  return (
    <div>
      Documentation
    </div>
  )
}

export default router('DOCUMENTATION', { absolute: true })(Documentation)
