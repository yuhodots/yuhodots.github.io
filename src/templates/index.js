import React from "react";
import { graphql } from "gatsby";

import Layout from "components/layout";
import Seo from "components/seo";
import Home from "components/Home";

const IndexTemplate = ({ data, pageContext }) => {
    const { language } = pageContext;
    const { allMarkdownRemark: { edges: posts } } = data;

    return (
        <Layout type="main" language={language}>
            <Seo title="Home" lang={language === "eng" ? "en" : "ko"} />
            <Home posts={posts} language={language} />
        </Layout>
    );
};

export default IndexTemplate;

export const pageQuery = graphql`
    query PostListQuery($langRegex: String) {
        allMarkdownRemark(
            filter: {
                frontmatter: {
                    draft: { ne: true }
                    template: { eq: "post" }
                }
                fileAbsolutePath: { regex: $langRegex }
            }
            sort: {frontmatter: {date: DESC}}
        ) {
            edges {
                node {
                    frontmatter {
                        description
                        title
                        path
                        date
                        category
                        thumbnail
                    }
                }
            }
        }
    }
`;
