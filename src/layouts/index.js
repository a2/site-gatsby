import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import { Panda } from '../components'
import { rhythm, scale } from '../utils/typography'

const CenteredPanda = props => (
  <div style={{ margin: '0 auto', width: props.size, height: props.size }}>
    <Panda {...props} />
  </div>
)

const CenteredText = props => (
  <div style={{ textAlign: 'center' }}>{props.children}</div>
)

class Template extends React.Component {
  render() {
    let rootPath = '/'
    if (typeof __PREFIX_PATHS__ !== 'undefined' && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + '/'
    }

    let Header
    if (this.props.location.pathname === rootPath) {
      Header = () => (
        <h1
          style={{
            marginTop: 0,
            marginBottom: rhythm(1.5),
          }}
        >
          <CenteredPanda animate={true} size={150} />
          <CenteredText>Alexsander Akers</CenteredText>
        </h1>
      )
    } else {
      Header = () => (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <CenteredText>
            <Link
              style={{
                boxShadow: 'none',
                textDecoration: 'none',
                color: 'inherit',
              }}
              to={'/'}
            >
              <Panda animate={false} size={100} />
              <br />
              Alexsander Akers
            </Link>
          </CenteredText>
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
        <Header />
        {this.props.children()}
      </Container>
    )
  }
}

export default Template
