import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import { Bio, PostExcerpt } from '../components'
import { rhythm, scale } from '../utils/typography'

class TagsTemplate extends React.Component {
  render() {
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { tag } = this.props.pathContext
    const { edges, totalCount } = this.props.data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged “${tag}”`

    return (
      <div>
        <Helmet title={`${tag} | ${siteTitle}`} />
        <h1>{tagHeader}</h1>
        <ul style={{ listStyle: 'none', marginLeft: 0 }}>
          {edges.map(({ node }) => (
            <li key={node.frontmatter.path}>
              <PostExcerpt post={node} />
            </li>
          ))}
        </ul>
        <Link to="/tags">All Tags</Link>
      </div>
    )
  }
}

TagsTemplate.propTypes = {
  pathContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default TagsTemplate

export const pageQuery = graphql`
  query TagTemplate($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM D, YYYY")
            tags
          }
        }
      }
    }
  }
`
