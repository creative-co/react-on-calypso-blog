import api from 'api'
import {add as addPosts} from 'posts/posts_actions'

import { merge } from 'ramda'

export const add = (posts, page = 0) => ({type: 'POSTS_INDEX.ADD', posts, page})
export const replace = (posts) => ({type: 'POSTS_INDEX.REPLACE', posts})

export const request = (params = {}) => dispatch =>
  api.blog.postsList(merge({ fields: 'ID,date,author,slug,title,excerpt,tags,likes_count' }, params))
    .then(res => {
      dispatch(addPosts(res.posts))
      dispatch(params.page === 0 ? replace(res.posts) : add(res.posts, params.page))
    })
    .catch(error => {
      throw error
    })
