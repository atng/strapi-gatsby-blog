import { useStaticQuery, graphql } from "gatsby";
import React from "react";

const MetaData = (props) => {
  return <div>{props.children}</div>;
};

const query = graphql`
  query {
    strapiHomepage {
      seo {
        metaTitle
        metaDescription
        shareImage {
          publicURL
        }
      }
    }
    allStrapiCategory {
      edges {
        node {
          slug
          name
        }
      }
    }
    allStrapiArticle {
      edges {
        node {
          title
        }
      }
    }
    strapiGlobal {
      siteName
      favicon {
        publicURL
      }
      defaultSeo {
        metaTitle
        metaDescription
        shareImage {
          publicURL
        }
      }
    }
  }
`;

export const PageWrapper = ({ metaData, children }) => {
  const { strapiGlobal } = useStaticQuery(query);
  console.log(strapiGlobal);
  return <MetaData>{children}</MetaData>;
};
