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
                    }
                }
            }
        `
    );
    return site.siteMetadata;
};

const Comment = ({ title, path }) => {
    const { disqusShortname } = useSiteMetaData();
    if (!disqusShortname) return null;
    return (
        <div style={{ marginTop: 20 }}>
            <Utterances repo='yuhodots/yuhodots.github.io' theme='github-light' />
        </div>
    );
};

export default Comment;
