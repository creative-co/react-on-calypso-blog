import { decorate } from 'core-decorators'

export default function withLoading(attr = 'loading') {
  return decorate(function (func) {
    return function (...args) {
      const applied = func.apply(this, args)
      
      if (applied) {
        this.setState({ [attr]: true })
        return Promise.resolve(applied)
          .then(() => this.setState({ [attr]: false }))
      }
    }
  })
}
