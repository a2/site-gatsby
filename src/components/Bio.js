import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
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
          alt={`Alexsander Akers`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Alexsander Akers</strong> who lives and works in
          Berlin, Germany where he works on{' '}
          <a href="https://to-do.microsoft.com">Microsoft To-Do</a> for both iOS
          and macOS.
        </p>
      </div>
    )
  }
}

export default Bio
