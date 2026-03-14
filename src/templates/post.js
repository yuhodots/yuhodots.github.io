import React from "react";
import { graphql } from "gatsby";
import '../../node_modules/katex/dist/katex.min.css';

import Layout from "components/layout";
import Post from "components/Post";
import Seo from "components/seo";

const PostTemplate = ({ data, pageContext }) => {
    const { language } = pageContext;
    const { markdownRemark: { frontmatter, html } } = data;
    const tocItems = data.markdownRemark.tableOfContents;
    return (
        <Layout type="post" language={language}>
            <Seo title={frontmatter.title} lang={language === "eng" ? "en" : "ko"} />
            <Post {...frontmatter} html={html} tocItems={tocItems}/>
        </Layout>
    );
};

export default PostTemplate;

export const pageQuery = graphql`
    query($postPath: String!, $langRegex: String) {
        markdownRemark(
            frontmatter: { path: { eq: $postPath } }
            fileAbsolutePath: { regex: $langRegex }
        ) {
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
