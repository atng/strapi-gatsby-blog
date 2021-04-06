import { PageWrapper } from "./src/global/PageWrapper";
import React from "react";

export const wrapPageElement = ({ element, props }) => {
  console.log("page wrapper", props);
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <PageWrapper {...props}>{element}</PageWrapper>;
};
