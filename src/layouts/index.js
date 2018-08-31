import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import _ from 'lodash'

import { Panda } from '../components'
import { rhythm, scale } from '../utils/typography'

import 'prism-github/prism-github.css'

const CenteredPanda = props => (
  <div style={{ margin: '0 auto', width: props.size, height: props.size }}>
    <Panda {...props} />
  </div>
)

const NavLink = props => {
  let active
  if (props.to === '/') {
    active = props.from === '/'
  } else {
    active = props.from.startsWith(props.to)
  }

  return (
    <Link
      to={props.to}
      style={{
        ...(active ? { color: '#00A88F' } : { color: 'black' }),
        ...scale(2 / 5),
        boxShadow: 'none',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 700,
      }}
    >
      {props.children}
    </Link>
  )
}

const NavItem = props => {
  const extraPadding = props.to === '/' ? 0 : rhythm(1)
  return (
    <li key={props.to} style={{ display: 'inline', paddingLeft: extraPadding }}>
      <NavLink from={props.from} to={props.to}>
        {props.children}
      </NavLink>
    </li>
  )
}

class Template extends React.Component {
  rootPath() {
    let rootPath = '/'
    if (typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + '/'
    }
    return rootPath
  }

  renderNavigation() {
    const from = this.props.location.pathname
    return (
      <nav style={{ textAlign: 'center' }}>
        <ul style={{ listStyle: 'none' }}>
          <NavItem from={from} to="/">
            Home
          </NavItem>
          <NavItem from={from} to="/blog">
            Blog
          </NavItem>
          <NavItem from={from} to="/talks">
            Speaking
          </NavItem>
          <NavItem from={from} to="/contact">
            Contact
          </NavItem>
        </ul>
      </nav>
    )
  }

  render() {
    const siteTitle = _.get(this, 'props.data.site.siteMetadata.title')

    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Helmet defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitle}`}>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.pride.codes/css/bar_body.css"
          />
        </Helmet>

        <header style={{ margin: `0 auto ${rhythm(1.5)}` }}>
          <CenteredPanda size={150} />
          <h1
            style={{
              textAlign: 'center',
              marginTop: 0,
              marginBottom: rhythm(0.5),
            }}
          >
            {siteTitle}
          </h1>

          {this.renderNavigation()}
        </header>

        {this.props.children()}
      </Container>
    )
  }
}

export default Template

export const pageQuery = graphql`
  query LayoutIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
