import React from 'react'
import Link from 'gatsby-link'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../../utils/typography'

export class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          ...(!this.props.inline && {
            display: 'flex',
            marginBottom: rhythm(2.5),
          }),
        }}
      >
        {this.props.image != false && (
          <img
            src={profilePic}
            alt="Alexsander Akers"
            style={{
              marginRight: rhythm(1 / 2),
              marginBottom: 0,
              width: rhythm(2),
              height: rhythm(2),
            }}
          />
        )}
        <p>
          I work in Berlin on{' '}
          <a href="https://to-do.microsoft.com">Microsoft To-Do</a> for Apple
          platforms and occasionally <Link to="/talks">speak</Link> at meet-ups
          and conferences. I'm very enthusiastic about pandas. You can follow me
          on <a href="https://twitter.com/a2">Twitter</a>.
        </p>
      </div>
    )
  }
}

export default Bio
