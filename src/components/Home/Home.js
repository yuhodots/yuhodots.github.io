import React from "react";
import Item from "./Item";

import "./Home.scss";

const Home = ({ posts }) => {
    return (
        <div className="post-list-container">
            <ul className="post-list">
                {posts.map((post, idx) => (
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
