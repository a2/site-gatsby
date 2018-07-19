import React from 'react'
import Helmet from 'react-helmet'

import { rhythm, scale } from '../utils/typography'

const Label = props => (
  <label style={{ fontWeight: 'bold' }}>{props.children}</label>
)

const Input = props => {
  const { style, ...rest } = props
  return (
    <input
      style={{
        ...style,
        border: '2px solid black',
        padding: `0 ${rhythm(1 / 4)}`,
        width: '100%',
      }}
      {...rest}
    />
  )
}

const TextArea = props => {
  const { style, ...rest } = props
  return (
    <textarea
      style={{
        ...style,
        border: '2px solid black',
        padding: rhythm(1 / 4),
        width: '100%',
      }}
      {...rest}
    />
  )
}

const Button = props => {
  const { style, ...rest } = props
  return (
    <button
      style={{
        ...style,
        background: 'white',
        padding: `${rhythm(1 / 8)} ${rhythm(0.4)}`,
        border: '2px solid black',
      }}
      {...rest}
    />
  )
}

export default class ContactPage extends React.Component {
  render() {
    return (
      <div>
        <Helmet title="Contact" />

        <p>
          You can also find me on <a href="https://twitter.com/a2">Twitter</a>,{' '}
          <a href="https://github.com/a2">GitHub</a>, and{' '}
          <a href="https://linkedin.com/in/alexsanderakers">LinkedIn</a> if one
          of those media is more appropriate.
        </p>
        <form name="contact" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          <p>
            <Label>Name:</Label>
            <br />
            <Input type="text" name="name" />
          </p>
          <p>
            <Label>Email:</Label>
            <br />
            <Input type="email" name="email" />
          </p>
          <p>
            <Label>Message:</Label>
            <br />
            <TextArea name="message" rows="5" />
          </p>
          <p>
            <Button type="submit">Send</Button>
          </p>
        </form>
      </div>
    )
  }
}
