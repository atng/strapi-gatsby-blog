import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import { Box, DropButton, List } from "grommet";
import { defaultFormatUtc } from "moment";

const Nav = () => (
  <StaticQuery
    query={graphql`
      query {
        strapiGlobal {
          siteName
        }
        allStrapiCategory {
          edges {
            node {
              slug
              name
            }
          }
        }
      }
    `}
    render={(data) => (
      <>
        <Box
          direction="row"
          as="nav"
          pad={{ vertical: "medium", horizontal: "medium" }}
          align="center"
        >
          <Box fill>
            <Link to="/">{data.strapiGlobal.siteName.toUpperCase()}</Link>
          </Box>
          <Box direction="column-reverse">
            <DropButton
              border
              dropContent={
                <Box width="small" margin="small">
                  <List
                    border={null}
                    data={data.allStrapiCategory.edges}
                    children={(datum, index) => (
                      <Link to={`/category/${datum.node.slug}`}>
                        {datum.node.name}
                      </Link>
                    )}
                  />
                </Box>
              }
              focusIndicator={false}
              dropProps={{
                border: null,
                elevation: "small",
              }}
              dropAlign={{ top: "bottom" }}
            >
              <Box border pad={{ horizontal: "large", vertical: "small" }}>
                CATEGORIES
              </Box>
            </DropButton>
          </Box>
        </Box>
      </>
    )}
  />
);

export default Nav;
