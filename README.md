# react-on-calypso-blog
Proof of concept: blog as React SPA, with Wordpress backend

Wordpress now has a cool [Calypso](https://developer.wordpress.com/calypso/) front-end for typing blog posts.
It also has a JSON API for fetching / browsing the posts, which means we can pull posts into a React SPA...

See it in action on http://react-on-calypso-blog.tk/ 


## TODO

1. Make use of prerender.io for SEO
2. Simplify the codebase
3. Don't load full content on Posts List (root) page. Potentially build a simple nodejs proxy and use Cloudflare for caching. It should become super-fast!
4. Add some user-specific details (e.g. let users mark posts as "Favorite")
