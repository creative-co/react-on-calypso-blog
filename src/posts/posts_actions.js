// Post actions
import api from 'api'

export const add = (posts) => ({type: 'POSTS.ADD', posts})

export const request = (id) => dispatch => {
  const post = api.blog.post(isNaN(id) ? {slug: id} : {id: id})
  post.get()
    .then(res => {
      dispatch(add([res]))
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}

export const requestList = (options = {number: 10}) => dispatch => {
  api.blog.postsList(options)
    .then(res => {
      dispatch(add(res.posts))
    })
    .catch(error => {
      console.log(error)
      throw error
    })
}