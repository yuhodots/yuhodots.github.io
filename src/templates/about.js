import React from "react";
import { graphql } from "gatsby";

import Layout from "components/layout";
import About from "../components/About"

const AboutTemplate = ({ data, pageContext }) => {
    const { language } = pageContext;
    const { allMarkdownRemark: { edges: aboutData } } = data;
    return (
        <Layout type="about" language={language}>
            <About html={aboutData[0].node.html}/>
        </Layout>
    );
};

export default AboutTemplate;

export const pageQuery = graphql`
  query AboutQuery($langRegex: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: { title: { eq: "about" } }
        fileAbsolutePath: { regex: $langRegex }
      }
    ) {
      edges {
        node {
          html
        }
      }
    }
  }
`;
