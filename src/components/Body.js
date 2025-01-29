import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { filterRestaurants } from "../utils/utils";
import { RESTAURANTS, OFFERS } from "./Config";
import RestaurantCard from "./RestaurantCard";
import ShimmerUI from "./ShimmerUI";
import SearchTextContext from "../utils/SearchTextContext";
import PathContext from "../utils/PathContext";

const Body = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const { searchTxt, setsearchTxt, searchTxtFound } =
    useContext(SearchTextContext);

  const { pathname } = useLocation();
  const { setCurrentPath } = useContext(PathContext);

  useEffect(() => {
    setCurrentPath(pathname);
    setsearchTxt("");
  }, []);

  // searching
  useEffect(() => {
    const result = filterRestaurants(searchTxt, RESTAURANTS);
    if (result.length === 0) {
      alert("No Restaurant Found");
    } else {
      setFilteredRestaurants(result);
    }
  }, [searchTxtFound]);

  const isOnline = useOnlineStatus();
  if (!isOnline) {
    alert("You're offline, Please check your internet connection");
    return <ShimmerUI />;
  }

  return RESTAURANTS.length === 0 || filteredRestaurants.length === 0 ? (
    <ShimmerUI />
  ) : (
    <>
      <div className="flex justify-around flex-wrap my-6 mx-auto min-h-screen container">
        {filteredRestaurants.map((restaurant,index) => {
          return <RestaurantCard key={restaurant['web-scraper-order']} 
          title={restaurant.title}
          ImageURL={restaurant['imageUrl-src']}
          cuisines={restaurant['category']}
          areaName={restaurant['area']}
          id={restaurant['web-scraper-order']}
          avgRating={restaurant['ratingAndTime']}
          offers={OFFERS[index]}
          />;
        })}
      </div>
    </>
  );
};

export default Body;
