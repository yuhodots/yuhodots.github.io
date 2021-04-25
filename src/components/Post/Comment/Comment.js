import React from "react";
import Utterances from "./Utterances";
import { useStaticQuery, graphql } from "gatsby";
import "./Comment.scss";

const useSiteMetaData = () => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        author
                        description
                        disqusShortname
                        url
                    }
                }
            }
        `
    );
    return site.siteMetadata;
};

const Comment = ({ title, path }) => {
    const { disqusShortname, url } = useSiteMetaData();
    if (!disqusShortname) return;
    return (
        <div style={{ marginTop: 20 }}>
            <Utterances repo='wwlee94/wwlee94.github.io' theme='github-light' />
        </div>
    );
};

export default Comment;
