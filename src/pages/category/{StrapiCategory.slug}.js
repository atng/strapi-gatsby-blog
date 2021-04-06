import React from "react";
import { graphql } from "gatsby";
import ArticlesComponent from "../../components/articles";
import Layout from "../../components/layout";
import { Box, Heading } from "grommet";

export const query = graphql`
  query Category($slug: String!) {
    articles: allStrapiArticle(
      filter: {
        status: { eq: "published" }
        categories: { elemMatch: { slug: { in: [$slug] } } }
      }
    ) {
      edges {
        node {
          slug
          title
          categories {
            name
          }
          image {
            childImageSharp {
              fixed(width: 660) {
                src
              }
            }
          }
          authors {
            name
            picture {
              childImageSharp {
                fixed(width: 30, height: 30) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
          }
        }
      }
    }
    category: strapiCategory(slug: { eq: $slug }) {
      name
    }
  }
`;

const Category = ({ data }) => {
  const articles = data.articles.edges;
  const category = data.category.name;
  const seo = {
    metaTitle: category,
    metaDescription: `All ${category} articles`,
  };

  return (
    <Layout seo={seo}>
      <Box
        pad={{ top: "large" }}
        margin={{ vertical: "xlarge", horizontal: "large" }}
        gap="xlarge"
      >
        <Heading>{category}</Heading>
        <ArticlesComponent articles={articles} />
      </Box>
    </Layout>
  );
};

export default Category;
