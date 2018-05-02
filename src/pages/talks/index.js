import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import _ from 'lodash'

import { Bio, PostExcerpt } from '../../components'
import { rhythm, scale } from '../../utils/typography'

export default class TalksPage extends React.Component {
  render() {
    const siteTitle = _.get(this, 'props.data.site.siteMetadata.title')
    const talks = _.filter(
      _.get(this, 'props.data.allMarkdownRemark.edges'),
      edge => {
        const slug = _.get(edge, 'node.fields.slug')
        if (!slug) return

        if (_.includes(slug, '/talks/')) {
          return edge
        }
      }
    )

    return (
      <div>
        <Helmet title={`Talks | ${siteTitle}`} />
        <h1>Talks</h1>
        <ul style={{ listStyle: 'none', marginLeft: 0 }}>
          {talks.map(({ node }) => (
            <li key={node.frontmatter.title}>
              <Img resolutions={node.frontmatter.image.childImageSharp.resolutions} />
              <h3
                style={{
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
                <a style={{ boxShadow: 'none' }} href={node.frontmatter.venueUrl}>
                  {node.frontmatter.venue}
                </a>
              </p>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(0),
                }}
              >
                {node.frontmatter.date}
              </p>
              <p
                style={{
                  marginTop: rhythm(1 / 2),
                  marginBottom: rhythm(1 / 2),
                }}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />
            </li>
          ))}
        </ul>
        <hr />
        <Bio />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query TalksQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 1000
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
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
