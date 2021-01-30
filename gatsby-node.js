/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    const IndexTemplate = path.resolve("src/templates/index.js");
    const PostTemplate = path.resolve("src/templates/post.js");
    const CategoryTemplate = path.resolve("src/templates/category.js");
    const AboutTemplate = path.resolve("src/templates/about.js");
    

    createPage({
        path: "/",
        component: IndexTemplate,
        context: {}
    });
    
    // Category
    createPage({
        path: "/category",
        component: CategoryTemplate,
        context: {}
    });

    // About
    createPage({
        path: "/about",
        component: AboutTemplate,
        context: {}
    });

    return graphql(`
        {
            allMarkdownRemark(
                filter: {
                    frontmatter: {
                        draft: { ne: true }
                        template: { eq: "post" }
                    }
                }
                sort: { order: DESC, fields: [frontmatter___date] }
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter {
                            path
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: PostTemplate,
                context: {}
            });
        });
    });
};