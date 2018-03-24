import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import get from 'lodash/get'

import { Bio, PostExcerpt } from '../../components'
import { rhythm, scale } from '../../utils/typography'

export default class FourOhFour extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const talks = get(this, 'props.data.allTalksJson.edges')

    return (
      <div>
        <Helmet title={`Talks | ${siteTitle}`} />
        <h1>Talks</h1>
        <ul style={{ listStyle: 'none', marginLeft: 0 }}>
          {talks.map(({ node }) => (
            <li key={node.title}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <a style={{ boxShadow: 'none' }} href={node.url}>
                  {node.title}
                </a>
              </h3>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(0),
                }}
              >
                <a style={{ boxShadow: 'none' }} href={node.venueUrl}>
                  {node.venue}
                </a>
              </p>
              <p
                style={{
                  ...scale(-1 / 5),
                  display: 'block',
                  marginBottom: rhythm(0),
                }}
              >
                {node.date}
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
    allTalksJson(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          url
          venue
          venueUrl
          date(formatString: "MMMM D, YYYY")
          excerpt
        }
      }
    }
  }
`
