import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import CssBaseline from '@material-ui/core/CssBaseline'

import reducer from './reducer'
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

const reduxStore = createStore(reducer)

ReactDOM.render(
  (
    <Provider store={reduxStore}>
      <CssBaseline />
      <Main />
    </Provider>
  ),
  getMountPoint('root'),
)
