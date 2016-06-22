import { filter, find, intersection, compose, map, prop, __, identity, equals, propEq } from 'ramda'

export const postIndexSelector = (state, props) => {
  const posts = state.posts
  const postsIds = state.postsIndex.posts
  const { tag, page, hasMore } = state.postsIndex
  return {
    posts: map(id => find(propEq('ID', id), posts))(postsIds),
    page,
    hasMore,
    filters: {tag, page}
  }
}