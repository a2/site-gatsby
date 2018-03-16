import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import { Panda } from '../components'
import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    let Header
    if (location.pathname === rootPath) {
      Header = ({ children }) => (
        <h1
          style={{
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          {children}
        </h1>
      )
    } else {
      Header = ({ children }) => (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          {children}
        </h3>
      )
    }

    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <Header>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ margin: '0 auto', width: 150, height: 150 }}>
                <Panda size={150} />
              </div>
              <div>Alexsander Akers</div>
            </div>
          </Link>
        </Header>
        {children()}
      </Container>
    )
  }
}

export default Template
