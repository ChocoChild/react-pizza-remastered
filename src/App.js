import React from 'react'
import axios from 'axios';
import { Header, Categories, Sort, PizzaBlock } from './components/allComponents.js';
import './scss/app.scss';
import LoadingSkeleton from './components/PizzaBlock/LoadingSkeleton.jsx';

function App() {
  const [pizzasStore, setPizzasStore] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get('https://646910e803bb12ac20855e11.mockapi.io/pizzaStore')
    .then(({ data }) => {
      setPizzasStore(data[0].pizzas)
      setIsLoading(false);
    })
  },[])
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
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
        </div>
      </div>
    </div>
  );
}

export default App;
