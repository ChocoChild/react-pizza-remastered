import React from 'react';
import axios from 'axios';

import LoadingSkeleton from '../components/PizzaBlock/LoadingSkeleton';
import { Categories, Sort, PizzaBlock } from '../components/allComponents';

function Home({ searchValue }) {
    const [pizzasStore, setPizzasStore] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [category, setCategory] = React.useState(0);
    const [sort, setSort] = React.useState({
      name: 'популярности',
      sortBy: 'rating',
    });
    React.useEffect(() => {
      setIsLoading(true)

      const sortBy = sort.sortBy.replace('-', '');
      const order = sort.sortBy.includes('-') ? 'desc' : 'asc';
      const categoryId = category > 0 ? `category=${category}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      axios.get(`https://646910e803bb12ac20855e11.mockapi.io/pizzaStore?${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
      .then(({ data }) => {
        console.log(data)
        setPizzasStore(data)
        setIsLoading(false);
      })
      window.scrollTo(0, 0)
    },[category, sort, searchValue])

    const pizzaItems = pizzasStore.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
    <div className="content__top">
            <Categories value={category} onClickCategory={(index) => setCategory(index)} />
            <Sort value={sort} onClickSort={(obj) => setSort(obj)} />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading 
            ? [...new Array(6)].map((_, index) => <LoadingSkeleton key={index} />)
            : pizzaItems
          }
          </div>
    </>
  )
}

export default Home