import api from 'api'
import {add as addPosts} from 'posts/posts_actions'

import { merge } from 'ramda'

export const add = (posts, page = 0) => ({type: 'POSTS_INDEX.ADD', posts, page})
export const replace = (posts) => ({type: 'POSTS_INDEX.REPLACE', posts})
export const setTag = (tag) => ({type: 'POSTS_INDEX.SET_TAG', tag})
export const resetTag = (tag) => ({type: 'POSTS_INDEX.RESET_TAG', tag})

export const request = (params = {}) => dispatch =>
  api.blog.postsList(merge({ fields: 'ID,date,author,slug,title,excerpt,tags,like_count' }, params))
    .then(res => {
      dispatch(addPosts(res.posts, params.page))
      dispatch(params.page === 0 ? replace(res.posts) : add(res.posts, params.page))
    })
    .catch(error => {
      throw error
    })
