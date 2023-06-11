import React from 'react';

type CategoriesProps = {
  value: number,
  onClickCategory: (index:number) => void;
}

const Categories:React.FC<CategoriesProps> = ({ value, onClickCategory }) => {
  const categories = ['Все','Мясные', 'Вегетаринская', 'Гриль', 'Острые','Закрытые']
  return (
    <div className="categories">
              <ul>
                {categories.map((categories, index) => (
                  <li
                  key={index}
                  onClick={() => onClickCategory(index)} 
                  className={value === index ? 'active' : ''}>{categories}</li>
                ))}
              </ul>
            </div>
  ) 
}

export default Categories