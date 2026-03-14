const path = require("path");
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;
    const IndexTemplate = path.resolve("src/templates/index.js");
    const PostTemplate = path.resolve("src/templates/post.js");
    const CategoryTemplate = path.resolve("src/templates/category.js");
    const AboutTemplate = path.resolve("src/templates/about.js");

    const languages = [
        { code: "kor", prefix: "", regex: "/contents/kor/" },
        { code: "eng", prefix: "/eng", regex: "/contents/eng/" },
    ];

    languages.forEach(({ code, prefix, regex }) => {
        createPage({
            path: prefix + "/",
            component: IndexTemplate,
            context: { language: code, langRegex: regex }
        });
        createPage({
            path: prefix + "/category",
            component: CategoryTemplate,
            context: { language: code, langRegex: regex }
        });
        createPage({
            path: prefix + "/about",
            component: AboutTemplate,
            context: { language: code, langRegex: regex }
        });
    });

    return graphql(`
        {
            kor: allMarkdownRemark(
                filter: {
                    frontmatter: { draft: { ne: true }, template: { eq: "post" } }
                    fileAbsolutePath: { regex: "/contents/kor/" }
                }
                sort: {frontmatter: {date: DESC}}
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter { path }
                    }
                }
            }
            eng: allMarkdownRemark(
                filter: {
                    frontmatter: { draft: { ne: true }, template: { eq: "post" } }
                    fileAbsolutePath: { regex: "/contents/eng/" }
                }
                sort: {frontmatter: {date: DESC}}
                limit: 1000
            ) {
                edges {
                    node {
                        frontmatter { path }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            return Promise.reject(result.errors);
        }
        result.data.kor.edges.forEach(({ node }) => {
            createPage({
                path: node.frontmatter.path,
                component: PostTemplate,
                context: {
                    postPath: node.frontmatter.path,
                    language: "kor",
                    langRegex: "/contents/kor/"
                }
            });
        });
        result.data.eng.edges.forEach(({ node }) => {
            createPage({
                path: "/eng" + node.frontmatter.path,
                component: PostTemplate,
                context: {
                    postPath: node.frontmatter.path,
                    language: "eng",
                    langRegex: "/contents/eng/"
                }
            });
        });
    });
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
