import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilitySensor from 'react-visibility-sensor';
import { getPosts } from '../actions/app';
import LoadingIndicator from '../components/loading-indicator';
import Post from '../components/post';
import Filter from '../components/filter';

const PAGE_SIZE = 15;

const Home = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.app.posts);
  const categories = useSelector(state => state.app.categories);

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState({});
  const [filterHidden, setFilterHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const renderItems = Object.values(selectedFilter).some(i => i) ? filteredPosts : posts;
  let timeout;

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    const selectedFilterNames = Object.keys(selectedFilter).filter(f => selectedFilter[f]);
    if (selectedFilterNames.length) {
      const data = posts.filter(p => p.categories.some(c => selectedFilterNames.indexOf(c) >= 0))
      setFilteredPosts(data)
    } else {
      setFilteredPosts([])
    }
    setLoading(false);
  }, [selectedFilter])

  const handleCheckboxChange = e => {
    setLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const filterName = e.target.name;
      const filterStatus = e.target.checked;
      setSelectedFilter({ ...selectedFilter, [filterName]: filterStatus });
      setPage(1);
    }, 500)
  }

  const onLoadingVisible = isVisible => {
    isVisible && setTimeout(() => {
      setPage(page + 1);
    }, 1000);
  }

  const handleOpenFilter = () => setFilterHidden(false);

  const handleCloseFilter = () => setFilterHidden(true);

  return (
    <main className='flex md:flex-row flex-col overflow-hidden h-full relative'>
      <div className='md:hidden block px-4 pb-4 text-right'>
        <button
          onClick={handleOpenFilter}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-xs px-5 py-2.5 focus:outline-none">
          Filter
        </button>
      </div>
      <div className="w-1/4 overflow-y-auto p-4 hidden md:block">
        <Filter
          items={categories}
          onChange={handleCheckboxChange}
        />
      </div>
      <section className='md:w-3/4 overflow-y-scroll px-3 relative'>
        {renderItems.slice(0, PAGE_SIZE * page).map(p => <Post key={p.id} post={p} />)}
        <div className='clear-both py-8 flex justify-center'>
          {PAGE_SIZE * page < renderItems.length && <VisibilitySensor onChange={onLoadingVisible} ><LoadingIndicator /></VisibilitySensor>}
        </div>
        {loading && <div className='absolute w-full h-full top-0 left-0 flex justify-center items-center z-50 bg-white bg-opacity-80'>
          <LoadingIndicator hideText />
        </div>}
      </section>
      <div className={`absolute overflow-y-auto transition-all ease-out p-4 w-full h-full bg-white z-10 top-0 ${filterHidden ? "left-full" : "left-0"} md:hidden`}>
        <div className='text-right py-2 border-b mb-4'>
          <button
            onClick={handleCloseFilter}
            className='font-bold text-lg p-2 cursor-pointer'>✕</button>
        </div>
        <Filter
          items={categories}
          onChange={handleCheckboxChange}
        />
      </div>
    </main>
  );
};

export default Home;
