// components/CategoryPicker.tsx
import React, { useState } from "react";

interface CategoryPickerProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
}

const CategoryPicker: React.FC<CategoryPickerProps> = ({ categories, onCategorySelect }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onCategorySelect(selectedValue);
  };

  return (
    <div>
      <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">בחר קטגוריה:</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryPicker;
