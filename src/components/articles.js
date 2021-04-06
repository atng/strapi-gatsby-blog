import { Box, Grid } from "grommet";
import React from "react";
import Card from "./card";

const Articles = ({ articles }) => {
  const featuredArticles = articles.slice(0, 2);
  const remainingArticles = articles.slice(2, articles.length);

  return (
    <Grid
      fill
      rows={["auto", "auto"]}
      columns={["2/3", "1/3"]}
      gap="medium"
      alignContent="stretch"
      areas={[
        { name: "featured", start: [0, 0], end: [0, 0] },
        { name: "articles", start: [0, 1], end: [1, 1] },
        { name: "articleRemain", start: [1, 0], end: [1, 0] },
      ]}
    >
      <Box gridArea="featured" gap="large">
        {featuredArticles.map((article, i) => {
          return (
            <Card
              article={article}
              key={`article__left__${article.node.slug}`}
            />
          );
        })}
      </Box>
      <Box gridArea="articleRemain" gap="large" background="light-2">
        {remainingArticles.map((article, i) => {
          return (
            <Card
              article={article}
              key={`article__left__${article.node.slug}`}
            />
          );
        })}
      </Box>
      <Box gridArea="articles" gap="large" background="dark-5">
        {featuredArticles.map((article, i) => {
          return (
            <Card
              article={article}
              key={`article__left__${article.node.slug}`}
            />
          );
        })}
      </Box>
    </Grid>
  );
};

export default Articles;
