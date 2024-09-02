const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  try {
    const result = await graphql(`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                tags
                templateKey
              }
            }
          }
        }
      }
    `);

    if (result.errors) {
      throw new Error(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach((edge) => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve(
          `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
        ),
        context: {
          id,
        },
      });
    });

    // Create tag pages
    let tags = [];
    posts.forEach((edge) => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });
    tags = _.uniq(tags);

    tags.forEach((tag) => {
      const tagPath = `/tags/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/tags.js`),
        context: {
          tag,
        },
      });
    });
  } catch (error) {
    console.error('Error creating pages:', error);
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

// Optionally, you can add type definitions for MarkdownRemark fields if needed
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemark implements Node {
      fields: Fields
      frontmatter: Frontmatter
    }

    type Fields {
      slug: String
    }

    type Frontmatter {
      tags: [String]
      templateKey: String
    }
  `);
};
