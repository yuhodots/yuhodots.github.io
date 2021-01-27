import React, { useState } from "react";

import CategoryList from "./CategoryList";
import SelectedCategory from "./SelectedCategory";

const Category = ({ categories, posts }) => {
    const sortedCategories = Object.keys(categories).sort();
    const [selectedCategory, setSelectedCategory] = useState(
        sortedCategories[0]
    );
    const upperCategory = {
        'MachineLearning':['Deep Learning', 'Data Science'],
        'Web':['FrontEnd', 'BackEnd', 'Server'],
        'Archive':['Branding', 'Cheat Sheet'],
    }
    return (
        <div className="category">
            <CategoryList
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                upperCategory={upperCategory}
            />
            <SelectedCategory
                posts={posts}
                selectedCategory={selectedCategory}
            />
        </div>
    );
};

export default Category;
