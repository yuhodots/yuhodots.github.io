import React from "react";
import { Link } from "gatsby";

import PostInfo from "../Post/PostInfo";

import "./Item.scss";
import images from "../../../images";

function importAll(r) {
    return r.keys().map(r);
}

const Item = ({ item }) => {
    const { title, description, path, date, category, thumbnail } = item;
    const thumbnail_path = images[thumbnail];
    console.log(images)
    return (
        <li className="post-item">
            <Link to={path}>
                <div>
                    <PostInfo category={category} date={date} />
                    <h2>{title}</h2>
                    <div className="description">{description}</div>
                </div>
                {thumbnail_path && <img src={thumbnail_path} alt={category} />}
            </Link>
        </li>
    );
};

export default Item;
