import React, { Component } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { merge, equals } from 'ramda'
import { request as requestPostsIndex, resetTag, setTag } from './posts_index_actions'
import { postIndexSelector } from './posts_index_selectors'
import withLoading from 'common/with_loading'

import Post from 'posts/post'
import Loader from 'common/loader'

@connect(
  postIndexSelector,
  { requestPostsIndex, resetTag, setTag }
)
export default class ConnectedPostsIndex extends Component {

  state = { loading: false }

  componentWillMount() {
    document.title = 'Index'
    this.reloadPosts()
  }

  @withLoading('loading')
  reloadPosts() {
    return this.props.requestPostsIndex(merge(this.props.filter, { page: 0 }))
  }

  componentWillReceiveProps(nextProps) {
    if(!equals(this.props.filter, nextProps.filter)) {
      this.reloadPosts()
    }
  }

  @withLoading('loadingNextPage')
  handleNextPage() {
    return this.props.requestPostsIndex(merge(this.props.filter, { page: this.props.page + 1 }))
  }

  render() {
    if (this.state.loading) {
      return <Loader />
    }
    const { posts } = this.props

    return <div className="posts-index">
      <div className="posts-list">
      {
        posts.map((post) => (
          <Post key={post.ID} post={post} className="posts-list_item" />
        ))
      }
      </div>
      {
        this.state.loadingNextPage ? <Loader /> :
          <button onClick={this.handleNextPage.bind(this)}>Load more</button>
      }
    </div>
  }
}