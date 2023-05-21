import React from 'react';


function Categories({ value, onClickCategory }) {
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