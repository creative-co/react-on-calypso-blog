import { concat, uniqBy, prop, merge, compose, uniq, map } from 'ramda'

const defaultState = {
  posts: [],
  tag: [],
  page: 1,
  hasMore: true
}

export default function postsIndexReducer(state = defaultState, action) {
  switch (action.type) {
    case 'POSTS_INDEX.ADD':
      return merge(state, {
        page: action.page || defaultState.page, hasMore: !!action.posts.length,
        posts: compose(uniq, concat(state.posts), map(prop('ID')))(action.posts)
      })
    case 'POSTS_INDEX.REPLACE':
      return merge(state, {
        page: defaultState.page,
        posts: compose(uniq, map(prop('ID'))(action.posts) )
      })
    case 'POSTS_INDEX.SET_TAG':
      return merge(state, {
        page: defaultState.page,
        posts: [],
        tag: action.tag
      })
    case 'POSTS_INDEX.RESET_TAG':
      return merge(state, {
        page: defaultState.page,
        posts: [],
        tag: defaultState.tag
      })
    default:
      return state
  }
}