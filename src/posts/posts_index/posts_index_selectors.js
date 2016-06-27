import { filter, find, intersection, compose, map, prop, __, identity, equals, propEq } from 'ramda'

export const postIndexSelector = (state, props) => {
  const posts = state.posts
  const postsIds = state.postsIndex.posts
  let { tag, page, hasMore } = state.postsIndex
  if (!tag && props.location.query.tag) {
    tag = props.location.query.tag
  }
  return {
    posts: map(id => find(propEq('ID', id), posts))(postsIds),
    page,
    tag,
    hasMore,
    filter: {tag}
  }
}