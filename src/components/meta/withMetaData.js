import React from "react";

export const withMetaData = (Component) => {
  const WithMetaDataComponent = (props) => {
    const { data } = props;
    console.log("data", data);
    return <Component {...props} />;
  };
  return WithMetaDataComponent;
};
