import React from "react";

import "./CategoryList.css";

const CategoryList = ({
    categories,
    selectedCategory,
    setSelectedCategory,
    upperCategory
}) => {
    return (
        <div className="category-list">
            <div className="category-title"></div>
            {upperCategory['MachineLearning'].map(category => (
                <span 
                    className={ `category-item ${category === selectedCategory && "selected"}` } 
                    key={ `category_${category}` }
                    onClick={() => setSelectedCategory(category)}
                >
                    <span className="category-post-count" style={{background:'#dae9d6'}}> 
                        {categories[category]} 
                    </span>
                    <span> {category} </span>
                </span>
            ))}
            {upperCategory['Web'].map(category => (
                <span 
                    className={ `category-item ${category === selectedCategory && "selected"}` } 
                    key={ `category_${category}` }
                    onClick={() => setSelectedCategory(category)}
                >
                    <span className="category-post-count" style={{background:'#F0E5DE'}}> 
                        {categories[category]} 
                    </span>
                    <span> {category} </span>
                </span>
            ))}
            {upperCategory['Archive'].map(category => (
                <span 
                    className={ `category-item ${category === selectedCategory && "selected"}` } 
                    key={ `category_${category}` }
                    onClick={() => setSelectedCategory(category)}
                >
                    <span className="category-post-count" style={{background:'#d9e1e8'}}> 
                        {categories[category]} 
                    </span>
                    <span> {category} </span>
                </span>
            ))}
        </div>
    );
};

export default CategoryList;
