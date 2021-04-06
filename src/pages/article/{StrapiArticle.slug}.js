import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import Moment from "react-moment";
import Layout from "../../components/layout";
import ReactMarkdown from "react-markdown";
import { withMetaData } from "../../components/meta/withMetaData";
import { Box, Heading, Layer, Markdown, Text } from "grommet";

export const query = graphql`
  query ArticleQuery($slug: String!) {
    strapiArticle(slug: { eq: $slug }, status: { eq: "published" }) {
      strapiId
      title
      description
      content
      publishedAt
      image {
        publicURL
        childImageSharp {
          fixed(width: 700, height: 700) {
            ...GatsbyImageSharpFixed
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
`;

const Article = ({ data }) => {
  const article = data.strapiArticle;
  const seo = {
    metaTitle: article.title,
    metaDescription: article.description,
    shareImage: article.image,
    article: true,
  };
  const pictureRef = React.useRef();
  console.log(pictureRef);
  return (
    <Layout seo={seo}>
      <Box margin="large">
        <Box
          align="center"
          overflow="hidden"
          ref={pictureRef}
          height="large"
          fill="horizontal"
        >
          <Img fixed={article.image.childImageSharp.fixed} />
          {pictureRef.current && (
            <Layer plain full responsive={false} target={pictureRef.current}>
              <Heading level={1} size="xlarge" color={"light-1"}>
                {article.title.toUpperCase()}
              </Heading>
            </Layer>
          )}
        </Box>
        <Markdown>{article.content}</Markdown>
        <hr style={{ maxWidth: "200px", width: "20%" }} />
        {article.authors.map((author) => (
          <Box direction="row">
            <div>
              {author.picture && (
                <Img
                  fixed={author.picture.childImageSharp.fixed}
                  imgStyle={{ position: "static", borderRadius: "50%" }}
                />
              )}
            </div>
            <Box direction="column" pad={{ horizontal: "medium" }}>
              <Text size="small">By {author.name}</Text>
              <Text size="xsmall">
                <Moment format="MMM Do YYYY">{article.published_at}</Moment>
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Layout>
  );
};

export default withMetaData(Article);
