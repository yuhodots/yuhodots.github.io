import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "components/layout";
import SEO from "components/seo";
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
                sort: { order: DESC, fields: [frontmatter___date] }
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
            <SEO title="Home" />
            <Home posts={data} />
        </Layout>
    );
};

export default IndexTemplate;
