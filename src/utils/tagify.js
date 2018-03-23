import _ from 'lodash'

// This function is copied in `gatsby-node.js`
// because of an import issue with this file

export default tag => (tag === 'iOS' ? 'ios' : _.kebabCase(tag))
