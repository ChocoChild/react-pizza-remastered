import React from 'react';
import axios from 'axios';
import qs from 'qs';
import LoadingSkeleton from '../components/PizzaBlock/LoadingSkeleton';
import { Categories, Sort, PizzaBlock } from '../components/allComponents';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sortCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sorts } from '../components/Sort';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);
  const [pizzasStore, setPizzasStore] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { category, sort, currentPage } = useSelector((state) => state.filter);

  const onClickCategory = (id) => {
    dispatch(sortCategoryId(id))
  }

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((obj) => obj.sortBy === params.sortBy);

      dispatch(setFilters({
        ...params,
        sort,

      })
      );
      isSearch.current = true;
    }
  }, [])

  React.useEffect(() => {
    if (!isSearch.current) {
      setIsLoading(true)
  
      const sortBy = sort.sortBy.replace('-', '');
      const order = sort.sortBy.includes('-') ? 'desc' : 'asc';
      const categoryId = category > 0 ? `category=${category}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';
  
      axios.get(`https://646910e803bb12ac20855e11.mockapi.io/pizzaStore?page=${currentPage}&limit=4&${categoryId}&sortBy=${sortBy}&order=${order}${search}`)
        .then((res) => {
          setPizzasStore(res.data);
          setIsLoading(false);
        })
    }
    isSearch.current = false;
    window.scrollTo(0, 0)

  }, [category, sort.sortBy, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        category,
        currentPage,
      });
      
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [category, sort.sortBy, currentPage])

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
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  )
}

export default Home