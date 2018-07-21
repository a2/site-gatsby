import React from 'react'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import _ from 'lodash'

import { rhythm, scale } from '../../utils/typography'

export default class TalksPage extends React.Component {
  render() {
    const talks = _.get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <div>
        <Helmet title="Speaking" />

        <ul style={{ listStyle: 'none', marginLeft: 0 }}>
          {talks.map(({ node }) => (
            <li
              key={node.frontmatter.title}
              style={{ marginBottom: rhythm(2) }}
            >
              <div style={{ textAlign: 'center' }}>
                <Img
                  resolutions={
                    node.frontmatter.image.childImageSharp.resolutions
                  }
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    borderRadius: 10,
                  }}
                />
                <h3
                  style={{
                    marginTop: rhythm(1 / 4),
                    marginBottom: rhythm(1 / 4),
                  }}
                >
                  <a style={{ boxShadow: 'none' }} href={node.frontmatter.url}>
                    {node.frontmatter.title}
                  </a>
                </h3>
                <p
                  style={{
                    ...scale(-1 / 5),
                    display: 'block',
                    marginBottom: rhythm(0),
                  }}
                >
                  <a
                    style={{ boxShadow: 'none' }}
                    href={node.frontmatter.venueUrl}
                  >
                    <strong>{node.frontmatter.venue}</strong>
                  </a>
                  {' – '}
                  {node.frontmatter.date}
                </p>
              </div>
              <p
                style={{
                  marginTop: rhythm(1 / 2),
                  marginBottom: rhythm(1 / 2),
                }}
                dangerouslySetInnerHTML={{ __html: node.html }}
              />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query TalksQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
      filter: { fields: { slug: { regex: "^/talks/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          html
          frontmatter {
            title
            url
            venue
            venueUrl
            date(formatString: "MMMM D, YYYY")
            image {
              childImageSharp {
                resolutions(width: 200) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }
`
