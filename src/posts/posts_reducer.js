import { concat, uniqBy, prop, merge } from 'ramda'

const normalize = uniqBy(prop('ID'))

export default function postsReducer(state = [], action) {
  switch (action.type) {
    case 'POSTS.ADD':
      return normalize(concat(state, action.posts))
    case 'POSTS.RESET':
      return []
    default:
      return state
  }
}