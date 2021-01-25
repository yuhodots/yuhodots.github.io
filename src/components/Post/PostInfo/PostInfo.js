import React from "react";

import "./PostInfo.scss";

const PostInfo = ({ category, date }) => {
    return (
        <div className="post-info">
            <span className="category">{category}</span>
            <span className="date">{date}</span>
        </div>
    );
};

export default PostInfo;
