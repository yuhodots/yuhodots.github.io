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
            <h1 className="category-title">Category</h1>
            {categoryOrder.map(category => (
                <span
                    className={`category-item ${category === selectedCategory &&
                        "selected"}`}
                    key={`category_${category}`}
                    onClick={() => setSelectedCategory(category)}
                >
                    <span>{category}</span>
                    <span className="category-post-count">
                        {categories[category]}
                    </span>
                </span>
            ))}
        </div>
    );
};

export default CategoryList;
