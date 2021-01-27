import React from "react";

import "./CategoryList.css";

const CategoryList = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    categoryOrder
}) => {
    return (
        <div className="category-list">
            <div className="category-title"></div>
            {categoryOrder.map(category => (
                <span 
                    className={ `category-item ${category === selectedCategory && "selected"}` } 
                    key={ `category_${category}` }
                    onClick={() => setSelectedCategory(category)}
                >
                    <span className="category-post-count"> {categories[category]} </span>
                    <span> {category} </span>
                </span>
            ))}
        </div>
    );
};

export default CategoryList;
