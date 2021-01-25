import React from "react";
import { graphql } from "gatsby";

import Layout from "components/layout";
import Post from "components/Post";
import SEO from "components/seo";

const PostTemplate = ({ data }) => {
    const { markdownRemark: { frontmatter, html } } = data;
    return (
        <Layout type="post">
            <SEO title={frontmatter.title} />
            <Post {...frontmatter} html={html} />
        </Layout>
    );
};

export default PostTemplate;

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            frontmatter {
                date(formatString: "YYYY-MM-DD")
                path
                title
                category
            }
        }
    }
`;