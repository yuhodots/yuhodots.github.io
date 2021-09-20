import React from "react";
import { graphql } from "gatsby";
import '../../node_modules/katex/dist/katex.min.css';

import Layout from "components/layout";
import Post from "components/Post";
import SEO from "components/seo";

const PostTemplate = ({ data }) => {
    const { markdownRemark: { frontmatter, html } } = data;
    const tocItems = data.markdownRemark.tableOfContents;
    return (
        <Layout type="post">
            <SEO title={frontmatter.title} />
            <Post {...frontmatter} html={html} tocItems={tocItems}/>
        </Layout>
    );
};

export default PostTemplate;

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path } }) {
            html
            tableOfContents
            frontmatter {
                path
                title
                category
                date(formatString: "YYYY-MM-DD")
            }
        }
    }
`;