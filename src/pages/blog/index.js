import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import _ from 'lodash'

import { PostExcerpt } from '../../components'
import { rhythm, scale } from '../../utils/typography'

export default class BlogIndex extends React.Component {
  render() {
    const posts = _.get(this, 'props.data.allMarkdownRemark.edges')

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
  query BlogIndexQuery {
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
