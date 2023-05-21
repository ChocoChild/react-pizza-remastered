import React from 'react';
import axios from 'axios';

import LoadingSkeleton from '../components/PizzaBlock/LoadingSkeleton';
import { Categories, Sort, PizzaBlock } from '../components/allComponents';

function Home() {
    const [pizzasStore, setPizzasStore] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    React.useEffect(() => {
      axios.get('https://646910e803bb12ac20855e11.mockapi.io/pizzaStore')
      .then(({ data }) => {
        setPizzasStore(data[0].pizzas)
        setIsLoading(false);
      })
      window.scrollTo(0, 0)
    },[])

  return (
    <>
    <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading 
            ? [...new Array(6)].map((_, index) => <LoadingSkeleton key={index} />)
            : pizzasStore.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
          }
          </div>
    </>
  )
}

export default Home