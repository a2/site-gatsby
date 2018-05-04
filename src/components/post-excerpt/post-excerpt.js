import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { rhythm, scale } from '../../utils/typography'

export class PostExcerpt extends React.Component {
  render() {
    const { post } = this.props
    const title = get(post, 'frontmatter.title') || post.fields.slug

    return (
      <div key={post.fields.slug}>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          <Link style={{ boxShadow: 'none' }} to={post.fields.slug}>
            {title}
          </Link>{' '}
          <span
            style={{
              ...scale(-1 / 10),
              display: 'inline-block',
              paddingLeft: rhythm(0.5),
              fontWeight: 'normal',
            }}
          >
            {post.frontmatter.date}
          </span>
        </h3>
        <p
          style={{
            marginTop: rhythm(1 / 2),
            marginBottom: rhythm(1 / 2),
          }}
          dangerouslySetInnerHTML={{ __html: post.excerpt }}
        />
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
    }).isRequired,
  }),
}

export default PostExcerpt
