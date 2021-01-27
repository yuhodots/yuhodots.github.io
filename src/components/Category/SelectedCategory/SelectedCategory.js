import React from "react";
import { Link } from "gatsby";

import PostInfo from "../../Post/PostInfo";

import "./SelectedCategory.css";

const SelectedCategory = ({ selectedCategory, posts }) => {
    if (!selectedCategory) {
        return null;
    }

    return (
        <div className="category-post-list">
            {posts
                .filter(post => post.category === selectedCategory)
                .map(post => (
                    <div>
                        <PostInfo {...post} />
                        <p className="category-post-name">
                            <Link to={post.path}>{post.title}</Link>
                        </p>
                        <p className="category-post-description">
                            {post.description}
                        </p>
                    </div>
                ))}
        </div>
    );
};

export default SelectedCategory;
