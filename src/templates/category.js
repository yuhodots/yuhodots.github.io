import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Layout from "../components/layout";
import Category from "../components/Category";

const CategoryTemplate = () => {
  const { allMarkdownRemark: { edges: data }} = useStaticQuery(graphql`
    query CategoryListQuery($category: String) {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true }, template: { eq: "post" }, category: { eq: $category } } }
        sort: { order: DESC, fields: [frontmatter___date] }
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
  `);

  const categories = data
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
    <Layout type="category">
      <Category categories={categories} posts={data.map(item => item.node.frontmatter)} />
    </Layout>
  )
};

export default CategoryTemplate;