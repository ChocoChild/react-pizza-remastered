import React from 'react';


function Categories() {
  const [categoriesItem, setCategoriesItem] = React.useState(0);
  const activeItem = (index) => {
    setCategoriesItem(index)
  }
  const categories = ['Все','Мясные', 'Вегетаринская', 'Гриль', 'Острые','Закрытые']
  return (
    <div className="categories">
              <ul>
                {categories.map((categories, index) => (
                  <li
                  key={index}
                  onClick={() => activeItem(index)} 
                  className={categoriesItem === index ? 'active' : ''}>{categories}</li>
                ))}
              </ul>
            </div>
  ) 
}

export default Categories