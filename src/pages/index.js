import React from 'react'
import Link from 'gatsby-link'
import _ from 'lodash'

import { rhythm, scale } from '../utils/typography'
import { Bio } from '../components';

export default class SiteIndex extends React.Component {
  render() {
    const posts = _.get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <h3>👋🏻&nbsp;&nbsp;Why, hello there!</h3>
        <Bio inline={true} image={false} />

        <h3>✏️&nbsp;&nbsp;Blog</h3>
        <p>
          I write stuff and this is filler text to make the line go longer and
          maybe you would read about these blog posts that I’ve written below.
        </p>

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
  query IndexQuery {
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
