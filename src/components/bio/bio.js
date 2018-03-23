import React from 'react'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../../utils/typography'

export class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
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
        <p>
          Alex works in Berlin on{' '}
          <a href="https://to-do.microsoft.com">Microsoft To-Do</a> for both iOS
          and macOS. He is very enthusiastic about pandas. Follow him on{' '}
          <a href="https://twitter.com/a2">Twitter</a>.
        </p>
      </div>
    )
  }
}

export default Bio
