import React, { Component } from 'react'
import { connect } from 'react-redux'
import { request } from 'posts/posts_actions'
import { find, propEq, prop } from 'ramda'
import { Link } from 'react-router'

import Post from 'posts/post'
import Loader from 'common/loader'

@connect(
  (state, props) => {
    return { post: find(propEq('slug', props.params.id))(state.posts) }
  },
  { request }
)
export default class ConnectedPostsShow extends Component {

  componentWillMount() {
    if (!this.props.post) {
      return this.props.request(this.props.params.id)
    }
  }

  render() {
    const { post } = this.props
    if (!post) {
      return <Loader />
    }
    document.title = post.title

    return <div class="posts-show">
      <Link to="/" className="back-link">To index</Link>
      <Post post={post} full={true} />
    </div>
  }
}