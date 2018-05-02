const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const tagify = tag => (tag === 'iOS' ? 'ios' : _.kebabCase(tag))

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tags.js')

    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    tags
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const blogPosts = _.filter(
          result.data.allMarkdownRemark.edges,
          edge => {
            const slug = _.get(edge, 'node.fields.slug')
            const draft = _.get(edge, `node.frontmatter.draft`)
            if (!slug) return

            if (_.includes(slug, '/blog/') && !draft) {
              return edge
            }
          }
        )

        blogPosts.forEach((edge, index) => {
          const next = index === 0 ? null : blogPosts[index - 1].node
          const previous =
            index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
          const slug = edge.node.fields.slug

          createPage({
            path: slug,
            component: blogPost,
            context: {
              slug,
              previous,
              next,
            },
          })
        })

        const tagLists = blogPosts
          .filter(post => _.get(post, 'node.frontmatter.tags'))
          .map(post => _.get(post, 'node.frontmatter.tags'))

        _.uniq(_.flatten(tagLists)).forEach(tag => {
          createPage({
            path: `/blog/tags/${tagify(tag)}/`,
            component: tagTemplate,
            context: {
              tag,
            },
          })
        })

      })
    )
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
