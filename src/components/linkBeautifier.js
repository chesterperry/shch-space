import React from "react";

const httpRegExpStart = /^https?:\/\/(.*)/gm
const httpRegExpEnd = /\/(.*)/gm

const LinkBeautifier = ({ link }) => {
    let title = link;
    if (!link.match(httpRegExpStart)) link = "http://" + link;
    if (title.match(httpRegExpStart))
      title = title.replace(/^https?:\/\/(www\.)?/, "");
      title = title.replace(httpRegExpEnd, "");
    return (
      <>
        <a className=" no-underline hover:underline" href={link}>{title}</a>
      </>
    );
  };

export default LinkBeautifier;