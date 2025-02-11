import React from "react";
import { useContext } from "react";
import SearchTextContext from "../utils/SearchTextContext";

function SearchBar() {
    const {searchTxt, setsearchTxt, setsearchTxtFound} = useContext(SearchTextContext);

    // built for search when enter is pressed.
  // function handleKeyPress(event) {
  //   if (event.key === "Enter") {
  //     setsearchTxtFound(!searchTxtFound);
  //   }
  // }
  return (
    <div className="flex items-center">
      <input className="h-[40px] w-20 lg:w-[500px] md:w-52 sm:w-40 font-gilroy font-bold p-4 text-lg border-[1px] border-[#818080] border-opacity-60 rounded"
        type="search"
        placeholder="Search for restaurants and food"
        value={searchTxt}
        onChange={(e) => {
          setsearchTxt(e.target.value);
          setsearchTxtFound((prev) => !prev);
        }}
        // onKeyDown={handleKeyPress}
      />
      <div className="relative right-8">
      <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      </div>
    </div>
  );
}

export default SearchBar;
