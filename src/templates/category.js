import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Category from "../components/Category";

const CategoryTemplate = ({ data, pageContext }) => {
  const { language } = pageContext;
  const { allMarkdownRemark: { edges: posts } } = data;

  const categories = posts
    .map(item => item.node.frontmatter.category)
    .reduce((acc, category) => {
      if (acc[category]) {
        acc[category] += 1;
      } else {
        acc[category] = 1;
      }
      return acc;
    }, {});

  return (
    <Layout type="category" language={language}>
      <Category categories={categories} posts={posts.map(item => item.node.frontmatter)} language={language} />
    </Layout>
  )
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryListQuery($langRegex: String) {
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true }, template: { eq: "post" } }
        fileAbsolutePath: { regex: $langRegex }
      }
      sort: {frontmatter: {date: DESC}}
    ) {
      edges {
        node {
          frontmatter {
            category
            title
            date
            description
            path
          }
        }
      }
    }
  }
`;
