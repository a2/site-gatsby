import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import { Panda } from '../components'
import { rhythm, scale } from '../utils/typography'

import 'prism-github/prism-github.css'

const CenteredPanda = props => (
  <div style={{ margin: '0 auto', width: props.size, height: props.size }}>
    <Panda {...props} />
  </div>
)

class Template extends React.Component {
  rootPath() {
    let rootPath = '/'
    if (typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + '/'
    }
    return rootPath
  }

  renderNavigation() {
    const NavLink = props => {
      const location = this.props.location.pathname
      let isActive
      if (props.to === '/') {
        isActive = location === '/'
      } else {
        isActive = location.startsWith(props.to)
      }

      return (
        <Link
          to={props.to}
          style={{
            ...(isActive ? { color: '#00A88F' } : { color: 'black' }),
            ...scale(2 / 5),
            boxShadow: 'none',
            fontFamily: 'Montserrat',
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
        <li
          key={props.to}
          style={{ display: 'inline', paddingLeft: extraPadding }}
        >
          <NavLink to={props.to}>{props.children}</NavLink>
        </li>
      )
    }

    return (
      <nav style={{ textAlign: 'center' }}>
        <ul style={{ listStyle: 'none' }}>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/blog">Blog</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/talks">Talks</NavItem>
        </ul>
      </nav>
    )
  }

  render() {
    const isRoot = this.props.location.pathname === this.rootPath()
    const siteTitle = _.get(this, 'props.data.site.siteMetadata.title')

    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Helmet defaultTitle={siteTitle} titleTemplate={`%s | ${siteTitle}`} />

        <header style={{ margin: `0 auto ${rhythm(1.5)}` }}>
          <CenteredPanda animate={isRoot} size={150} />
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
