import React from 'react'
import get from 'lodash/get'
import { Link,  graphql } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import { Bio } from '../components'

export default class SiteIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <h3>
          <span aria-hidden>👋🏻</span>&nbsp;&nbsp;Why, hello there!
        </h3>
        <Bio inline={true} image={false} />

        <h3>
          <span aria-hidden>✏️</span>&nbsp;&nbsp;Blog
        </h3>
        <ul style={{ listStyle: 'none', marginLeft: '1rem' }}>
          {posts.map(({ node }) => (
            <li key={node.fields.slug}>
              <Link
                to={node.fields.slug}
                style={{
                  ...scale(1 / 5),
                  color: '#9B9B9B',
                  boxShadow: 'none',
                }}
              >
                <strong>{node.frontmatter.title}</strong>
                <small
                  style={{
                    ...scale(-1 / 10),
                    display: 'inline-block',
                    paddingLeft: rhythm(0.5),
                  }}
                >
                  {node.frontmatter.date}
                </small>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "^/blog/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            title
          }
        }
      }
    }
  }
`
