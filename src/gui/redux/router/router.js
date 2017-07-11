import { routerForHash } from 'redux-little-router'

const routes = {
  '/': {
    title: 'WORKBENCH',
    '/documentation': {
      title: 'DOCUMENTATION',
    },
  },
}

export default routerForHash({ routes })
