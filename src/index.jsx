import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import CssBaseline from '@material-ui/core/CssBaseline'

import reduxStore from './redux/store'
import Main from './components/Main'

const getMountPoint = (id = 'root') => {
  let rootEl = document.getElementById(id)
  if (!rootEl) {
    rootEl = document.createElement('div')
    rootEl.id = id
    document.getElementsByTagName('body')[0].appendChild(rootEl)
  }
  return rootEl
}

ReactDOM.render(
  (
    <Provider store={reduxStore}>
      <CssBaseline />
      <Main />
    </Provider>
  ),
  getMountPoint('root'),
)
