import { PropTypes } from 'prop-types';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import prev_icon from '/assets/icons/prev_icon.svg';

function SearchHeaderComp({ setSearchTerm }) {
  const navigate = useNavigate();
  const handleGoPrevPage = () => {
    navigate(-1);
  };

  const [tempSearchTerm, setTempSearchTerm] = useState('');
  const searchInputRef = useRef();

  const onChange = (e) => {
    setTempSearchTerm(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(tempSearchTerm);
    searchInputRef.current.blur();
  };

  return (
    <>
      <div className="max-w-screen-pet-l mx-auto pt-5 pb-5 px-4 bg-pet-bg border-gray-800 shadow-lg sticky top-0 z-10">
        <div className="flex items-center justify-between w-full">
          <button className="flex items-center" onClick={handleGoPrevPage}>
            <img src={prev_icon} alt="뒤로가기 아이콘" className="mr-2" />
          </button>
          <h1 className="sr-only">상품 검색창</h1>
          <form
            action="/"
            onSubmit={onSubmit}
            className="ml-4 w-full flex flex-nowrap"
          >
            <fieldset style={{ flexGrow: 1 }}>
              <legend className="sr-only">검색 폼</legend>
              <label className="sr-only" htmlFor="search">
                검색
              </label>
              <input
                type="search"
                id="search"
                value={tempSearchTerm}
                onChange={onChange}
                placeholder="상품명을 입력하세요."
                className="w-full bg-[#E9E9E9] text-ellipsis text-pet-black py-1 px-2 rounded-lg focus:outline-none"
                ref={searchInputRef}
              />
            </fieldset>
            <button
              type="submit"
              className="bg-primary rounded-xl px-4 ml-5 pet-s:w-20"
            >
              검색
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SearchHeaderComp;

SearchHeaderComp.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};
