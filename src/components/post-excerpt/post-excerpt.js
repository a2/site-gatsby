import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm, scale } from '../../utils/typography'
import tagify from '../../utils/tagify'

export class PostExcerpt extends React.Component {
  render() {
    const { post } = this.props
    const title = get(post, 'frontmatter.title') || post.fields.slug
    const tags = post.frontmatter.tags

    return (
      <div key={post.fields.slug}>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: 'none' }} to={post.fields.slug}>
            {title}
          </Link>
        </h3>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(0),
          }}
        >
          Published on {post.frontmatter.date}
        </p>
        <p
          style={{
            marginTop: rhythm(1 / 2),
            marginBottom: rhythm(1 / 2),
          }}
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
        {tags && (
          <ul
            style={{
              ...scale(-1 / 5),
              marginBottom: rhythm(0),
              display: 'inline',
            }}
          >
            Tags:{' '}
            {tags.sort().map((tag, i) => (
              <li
                key={tag}
                style={{
                  display: 'inline',
                  marginLeft: i > 0 ? rhythm(1 / 4) : 0,
                }}
              >
                <Link to={`/tags/${tagify(tag)}`}>{tag}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

PostExcerpt.propTypes = {
  post: PropTypes.shape({
    excerpt: PropTypes.string.isRequired,
    fields: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }).isRequired,
    frontmatter: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }),
}

export default PostExcerpt
