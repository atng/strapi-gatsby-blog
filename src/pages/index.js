import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import ArticlesComponent from "../components/articles";
import { Box, Heading } from "grommet";

const IndexPage = () => {
  const data = useStaticQuery(query);

  return (
    <Layout seo={data.strapiHomepage.seo}>
      <Box
        pad={{ top: "large" }}
        margin={{ vertical: "xlarge", horizontal: "large" }}
        gap="xlarge"
      >
        <Heading>{data.strapiHomepage.hero.title}</Heading>
        <ArticlesComponent articles={data.allStrapiArticle.edges} />
      </Box>
    </Layout>
  );
};

const query = graphql`
  query {
    strapiHomepage {
      hero {
        title
      }
      seo {
        metaTitle
        metaDescription
        shareImage {
          publicURL
        }
      }
    }
    allStrapiArticle(filter: { status: { eq: "published" } }) {
      edges {
        node {
          strapiId
          slug
          title
          categories {
            name
          }
          image {
            childImageSharp {
              fixed(width: 800, height: 500) {
                src
              }
            }
          }
          authors {
            name
            picture {
              childImageSharp {
                fixed(width: 30, height: 30) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
