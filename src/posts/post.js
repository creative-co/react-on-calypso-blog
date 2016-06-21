import React from 'react'
import {Link} from 'react-router'
import cn from 'classnames'
import {forEach, keys } from 'ramda'

export default ({post, className = '', full = false}) => (
  <div className={cn('post', {[className]: !!className})}>
    <div className="post_header">
      <a href={post.author.profile_URL} className="post_author">
        <img src={post.author.avatar_URL} className="post_author-avatar"/>
        {post.author.nice_name}
      </a>
      <div className="post_date">{post.date}</div>
    </div>
    <Link to={{ pathname: `/${post.slug || post.ID}`}} className="post">
      <h2 className="post_title">{post.title}</h2>
    </Link>
    <div className="post_content" dangerouslySetInnerHTML={{ __html: full ? post.content : post.excerpt }}></div>
    <div className="post_footer">
      {
        post.tags ?
          <div className="post_tags">
            {
              keys(post.tags).map((key) => {
                const tag = post.tags[key]
                return <Link key={key} to={`/category/${tag.slug}`} className="post_tag">{tag.name}</Link>
              })
            }
          </div> : null
      }
      <div className="post_likes">Likes: <strong>{post.like_count}</strong></div>
    </div>
  </div>
)