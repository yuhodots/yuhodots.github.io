import React, { useEffect, useState } from "react";

import Comment from "./Comment";
import PostInfo from "./PostInfo";

import "./Post.scss";

const Post = ({ title, date, category, html, path }) => {
    const [showTopButton, setShowTopButton] = useState(false);
    const onScroll = () => {
        setShowTopButton(window.scrollY > 100);
    };
    const toTop = () => {
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        document.addEventListener("scroll", onScroll);
        return () => {
            document.removeEventListener("scroll", onScroll);
        };
    }, []);
    return (
        <div className="post-container">
            <div className="post-info-container">
                <PostInfo category={category} date={date} />
                <h2 className="post-title">{title}</h2>
            </div>
            <div
                className="post-content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
            {showTopButton && (
                <button type="button" className="to-top" onClick={toTop}>
                    top
                </button>
            )}
            <Comment path={path} title={title} />
        </div>
    );
};

export default Post;
