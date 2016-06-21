import wpcom from 'wpcom'

export const siteUrl = 'inasearchofbalance.wordpress.com'
export const wp = wpcom()
export const blog = wp.site(siteUrl)

export default { siteUrl, wp, blog }