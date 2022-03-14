import React, { useState } from "react";

import CategoryList from "./CategoryList";
import SelectedCategory from "./SelectedCategory";

const Category = ({ categories, posts }) => {
    const sortedCategories = Object.keys(categories).sort();
    const [selectedCategory, setSelectedCategory] = useState(
        sortedCategories[0]
    );
    const upperCategory = {
        'MachineLearning':['Deep Learning', 'Data Science', 'MLOps'],
        'Web':['FrontEnd', 'BackEnd', 'Server'],
        'Archive':['Cheat Sheet', 'Diary'],
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
