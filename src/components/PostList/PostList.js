import React, { useState } from "react";
import PostItem from "./PostItem";

import "./PostList.scss";

const PostList = ({ posts }) => {
    const [keyword, setKeyword] = useState("");
    const onChange = ({ target }) => {
        setKeyword(target.value);
    };
    return (
        <div className="post-list-container">
            <ul className="post-list">
                {posts
                    .filter(({ node }) => {
                        const { title, category } = node.frontmatter;
                        const lowerKeyword = keyword.toLowerCase();
                        return (
                            category.toLowerCase().includes(lowerKeyword) ||
                            title.toLowerCase().includes(lowerKeyword)
                        );
                    })
                    .map((post, idx) => (
                        <PostItem
                            item={post.node.frontmatter}
                            key={`post-list-${idx}`}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default PostList;
