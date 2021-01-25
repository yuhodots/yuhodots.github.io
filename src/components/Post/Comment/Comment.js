import React from "react";
import ReactDisqusComments from "react-disqus-comments";
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
            <ReactDisqusComments
                shortname={disqusShortname}
                identifier={title}
                title={title}
                url={url.concat(path)}
            />
        </div>
    );
};

export default Comment;
