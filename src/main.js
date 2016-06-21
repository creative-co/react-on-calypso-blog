import './main.scss'

import 'babel-polyfill'

import React, {Component} from 'react'
import {render} from 'react-dom'

import {createStore, combineReducers, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import {Router, Route, IndexRoute, Redirect, browserHistory} from 'react-router'
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'

// Reducers
import postsReducer from 'posts/posts_reducer'

const reducer = combineReducers({
  routing: routerReducer,
  posts: postsReducer,
//   modal: modalsReducer,
//   trends: trendsReducer,
//   exploreTrends: exploreTrendsReducer,
//   featuredTrends: featuredTrendsReducer,
//   recurringTrends: recurringTrendsReducer,
//   collections: collectionsReducer,
//   users: usersReducer,
//   velocities: velocityReducer,
})

const middleware = applyMiddleware(thunk)
const store = createStore(reducer, middleware)
const history = syncHistoryWithStore(browserHistory, store)

// Components
import PostIndex from './posts/posts_index'
import PostShow from './posts/posts_show'

class App extends Component {
  render() {
    return <div className="wrapper">
      <h1 className="wrapper_title">My Cool Blog</h1>
      {this.props.children}
    </div>
  }
}

render((
  <Provider store={ store }>
    <Router history={ history } onUpdate={ () => window.scrollTo(0, 0) }>
      <Route path="/" component={ App }>
        <IndexRoute component={PostIndex}/>
        <Route path="/:id" component={PostShow} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'))