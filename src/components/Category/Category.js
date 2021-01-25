import React, { useState } from "react";

import CategoryList from "./CategoryList";
import SelectedCategory from "./SelectedCategory";

const Category = ({ categories, posts }) => {
    const sortedCategories = Object.keys(categories).sort();
    const [selectedCategory, setSelectedCategory] = useState(
        sortedCategories[0]
    );
    return (
        <div className="category">
            <CategoryList
                categories={categories}
                categoryOrder={sortedCategories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <SelectedCategory
                posts={posts}
                selectedCategory={selectedCategory}
            />
        </div>
    );
};

export default Category;
