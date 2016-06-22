import React, { Component } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import { merge } from 'ramda'
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

  @withLoading('loading')
  componentWillMount() {
    document.title = 'Index'
    const query = this.props.location.query
    if (query.tag) {
      this.props.setTag(query.tag)
    } else if (this.props.tag) {
      this.props.resetTag()
    }

    if (!this.props.posts.length) {
      return this.props.requestPostsIndex(this.props.filters)
    }
  }

  componentWillRecieveProps() {
    if (!props.posts.length) {
      return props.requestPostsIndex(props.filters)
    }
  }

  @withLoading('loadingNextPage')
  handleNextPage() {
    return this.props.requestPostsIndex(merge(this.props.filters, { page: this.props.page + 1 }))
  }

  render() {
    const { posts } = this.props
    if (this.state.loading) {
      return <Loader />
    }

    return <div class="posts-index">
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