import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql } from 'gatsby'

import { PostExcerpt } from '../../components'

export default class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title="Blog" />

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
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
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
