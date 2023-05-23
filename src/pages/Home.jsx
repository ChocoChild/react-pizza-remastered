import React from 'react';
import axios from 'axios';

import LoadingSkeleton from '../components/PizzaBlock/LoadingSkeleton';
import { Categories, Sort, PizzaBlock } from '../components/allComponents';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { sortCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

function Home() {
  const {category, sort, currentPage } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const onClickCategory = (id) => {
    dispatch(sortCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  const { searchValue } = React.useContext(SearchContext);
  const [pizzasStore, setPizzasStore] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true)

    const sortBy = sort.sortBy.replace('-', '');
    const order = sort.sortBy.includes('-') ? 'desc' : 'asc';
    const categoryId = category > 0 ? `category=${category}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    axios.get(`https://646910e803bb12ac20855e11.mockapi.io/pizzaStore?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
      .then(({ data }) => {
        setPizzasStore(data)
        setIsLoading(false);
      })
    window.scrollTo(0, 0)
  }, [category, sort, searchValue, currentPage])

  const pizzaItems = pizzasStore.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

  return (
    <>
      <div className='container'>
        <div className="content__top">
          <Categories value={category} onClickCategory={(index) => onClickCategory(index)} />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(4)].map((_, index) => <LoadingSkeleton key={index} />)
            : pizzaItems
          }
        </div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
      </div>
    </>
  )
}

export default Home