import React from "react";
import { Link } from "gatsby";

import PostInfo from "../Post/PostInfo";

import "./Item.scss";

function importAll(r) {
    return r.keys().map(r);
}
  
const images = importAll(require.context('../../../images', false, /\.(png|jpe?g|svg)$/));

const Item = ({ item }) => {
    const { title, description, path, date, category } = item;
    const thumbnail_path = images[category.toLowerCase()];
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
