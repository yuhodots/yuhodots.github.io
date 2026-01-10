import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "components/layout";
import Seo from "components/seo";
import Home from "components/Home";

const IndexTemplate = () => {
    const {
      allMarkdownRemark: { edges: data }
    } = useStaticQuery(graphql`
        query PostListQuery {
            allMarkdownRemark(
                filter: {
                    frontmatter: {
                        draft: { ne: true }
                        template: { eq: "post" }
                    }
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
    `);

    return (
        <Layout type="main">
            <Seo title="Home" />
            <Home posts={data} />
        </Layout>
    );
};

export default IndexTemplate;
