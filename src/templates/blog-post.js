import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { Bio } from '../components'
import { rhythm, scale } from '../utils/typography'
import tagify from '../utils/tagify'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pathContext
    const { title, date, tags } = post.frontmatter

    return (
      <div>
        <Helmet title={`${title} | ${siteTitle}`} />
        <h1>{title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(0),
            marginTop: rhythm(-3 / 4),
          }}
        >
          {date}
        </p>
        {tags && (
          <ul
            style={{
              ...scale(-1 / 5),
              display: 'block',
              marginBottom: rhythm(0),
              display: 'inline',
            }}
          >
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
        <div
          style={{ marginTop: rhythm(1) }}
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>

          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        tags
      }
    }
  }
`
