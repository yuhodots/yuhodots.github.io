import React, { useState } from "react";
import Item from "./Item";

import "./Home.scss";

const Home = ({ posts }) => {
    const [keyword, setKeyword] = useState("");
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
                        <Item
                            item={post.node.frontmatter}
                            key={`post-list-${idx}`}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default Home;
