import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import {
  Box,
  Card as GrommetCard,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Paragraph,
  Text,
} from "grommet";

const Card = ({ article }) => {
  return (
    <Link to={`/article/${article.node.slug}`}>
      <GrommetCard background="light-1">
        <Img
          fixed={article.node.image.childImageSharp.fixed}
          imgStyle={{ position: "static" }}
        />
        <CardHeader pad={{ horizontal: "medium", top: "medium" }}>
          <Heading level={5} size="small">
            {article.node.categories
              .map((category) => category.name.toUpperCase())
              .join(", ")}
          </Heading>
        </CardHeader>
        <CardBody pad={{ horizontal: "medium", top: "xsmall" }}>
          <Heading level={3}>{article.node.title}</Heading>
          <Paragraph>{article.node.excerpt}</Paragraph>
        </CardBody>
        <CardFooter
          pad={{ horizontal: "medium", vertical: "small" }}
          direction="column"
          align="start"
        >
          <Box direction="row-responsive">
            {article.node.authors.map((author) => (
              <Box direction="row" align="center" pad={{ right: "small" }}>
                {author.picture && (
                  <Img
                    fixed={author.picture.childImageSharp.fixed}
                    imgStyle={{ position: "static", borderRadius: "50%" }}
                  />
                )}
                <Text margin="small" size="small">
                  {author.name}
                </Text>
              </Box>
            ))}
          </Box>
        </CardFooter>
      </GrommetCard>
    </Link>
  );
};

export default Card;
