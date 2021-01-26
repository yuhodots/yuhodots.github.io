import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "components/layout";
import About from "../components/About"

const AboutTemplate = () => {
    const { allMarkdownRemark: { edges: data } }= useStaticQuery(graphql`
      {
        allMarkdownRemark(
          filter: {
            frontmatter: {
              title: { eq:"about" }
            }
          }
        ) {
          edges {
            node {
              html
            }
          }
        }
      }
    `);
    return (
        <Layout type="about">
            <About html={data[0].node.html}/>
        </Layout>
    );
};

export default AboutTemplate;
