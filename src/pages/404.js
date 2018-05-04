import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import { PostExcerpt } from '../components'

export default class FourOhFour extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title={`Page Not Found | ${siteTitle}`} />
        <h1>Page Not Found</h1>
        <p>
          We sent our panda search team to look for the page you requested,
          <br />
          but unfortunately it could not be found.
        </p>
        <p>Here are a few recent blog posts that may interest you though:</p>
        <ul style={{ listStyle: 'none', marginLeft: 0 }}>
          {posts.map(({ node }) => (
            <li key={node.fields.slug}>
              <PostExcerpt post={node} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query FourOhFourQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3,
      filter: { fields: { slug: { regex: "^/blog/" } } }
    ) {
      edges {
        node {
          excerpt
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
