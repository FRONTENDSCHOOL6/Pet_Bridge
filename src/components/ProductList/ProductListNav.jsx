import { PropTypes } from 'prop-types';
import { useState } from 'react';

function ProductListNav({ onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  const categories = ['전체', '신상품', '베스트', '무료배송'];

  return (
    <>
      <h2 className="sr-only">카테고리</h2>
      <ul className="max-w-screen-pet-l mx-auto bg-pet-bg font-bold flex gap-4 justify-evenly flex-wrap pt-2 border-gray-1 sticky top-13 z-10">
        {categories.map((category) => (
          <li key={category} className="">
            <button onClick={() => handleCategoryClick(category)}>
              <h3
                className={`relative cursor-pointer block ${
                  selectedCategory === category
                    ? 'border-pet-orange border-b-4 z-10 text-pet-orange'
                    : ''
                } py-[13px] xs:w-auto`}
              >
                {category}
              </h3>
            </button>
            <span className="absolute bottom-0 left-0 w-full border-gray-1 border-b-2"></span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductListNav;

ProductListNav.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};
