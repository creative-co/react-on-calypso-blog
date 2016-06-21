import React, { Component } from 'react'
import { connect } from 'react-redux'
import { requestList } from 'posts/posts_actions'

import Post from 'posts/post'
import Loader from 'common/loader'

@connect(
  (state) => ({ posts: state.posts }),
  { requestList }
)
export default class ConnectedPostsIndex extends Component {

  componentWillMount() {
    document.title = 'Index'

    if (!this.props.posts.length) {
      return this.props.requestList()
    }
  }

  render() {
    const { posts } = this.props
    if (!this.props.posts.length) {
      return <Loader />
    }

    return <div class="posts-index">
      Posts: {posts.length}
      <div className="posts-list">
      {
        posts.map((post) => (
          <Post key={post.ID} post={post} className="posts-list_item" />
        ))
      }
      </div>
    </div>
  }
}