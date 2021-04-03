import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import url from "url"

import config from "../../../../gatsby-config-constants"
import ArticleMeta from "./ArticleMeta"
import WebsiteMeta from "./WebsiteMeta"
import AuthorMeta from "./AuthorMeta"

/**
 * MetaData will generate all relevant meta data information incl.
 * JSON-LD (schema.org), Open Graph (Facebook) and Twitter properties.
 *
 */

const MetaData = ({
  data,
  settings,
  title,
  description,
  image,
  location,
  pageContext,
}) => {
  const _canonical =
    pageContext.canonical || url.resolve(pageContext.siteUrl, location.pathname)
  const { ghostPost, ghostTag, ghostAuthor, ghostPage } = data
  settings = settings.allGhostSettings.edges[0].node

  if (ghostPost) {
    return (
      <ArticleMeta {...pageContext} data={ghostPost} canonical={_canonical} />
    )
  } else if (ghostTag) {
    return (
      <WebsiteMeta
        {...pageContext}
        data={ghostTag}
        canonical={_canonical}
        type="Series"
      />
    )
  } else if (ghostAuthor) {
    return (
      <AuthorMeta {...pageContext} data={ghostAuthor} canonical={_canonical} />
    )
  } else if (ghostPage) {
    return (
      <WebsiteMeta
        {...pageContext}
        data={ghostPage}
        canonical={_canonical}
        type="WebSite"
      />
    )
  } else {
    title = title || config.siteTitleMeta || settings.title
    description =
      description || config.siteDescriptionMeta || settings.description
    image = image || settings.cover_image || null

    image = image ? url.resolve(pageContext.siteUrl, image) : null

    return (
      <WebsiteMeta
        {...pageContext}
        data={{}}
        canonical={_canonical}
        title={title}
        description={description}
        image={image}
        type="WebSite"
      />
    )
  }
}

MetaData.defaultProps = {
  data: {},
}

MetaData.propTypes = {
  data: PropTypes.shape({
    ghostPost: PropTypes.object,
    ghostTag: PropTypes.object,
    ghostAuthor: PropTypes.object,
    ghostPage: PropTypes.object,
  }).isRequired,
  settings: PropTypes.shape({
    allGhostSettings: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
}

const MetaDataQuery = props => (
  <StaticQuery
    query={graphql`
      query GhostSettingsMetaData {
        allGhostSettings {
          edges {
            node {
              title
              description
            }
          }
        }
      }
    `}
    render={data => <MetaData settings={data} {...props} />}
  />
)

export default MetaDataQuery
