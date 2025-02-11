import { Link, useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ItemCardComponent from "./ItemCardComponent";
import RestaurantContext from "../utils/RestaurantContext";
import RestaurantMenuData from "../data/RestaurantMenuData.json"
import { getRandomObjects } from "../utils/utils";
import { RESTAURANTS } from "./Config";

const RestaurantMenu = () => {
  const { id } = useParams();
  const restaurant = RESTAURANTS.filter(res => res['web-scraper-order'] === id)[0]
  // const restaurant = useRestaurantMenu(id);
  const {
    title,
    category,
    area,
    deliverymsg,
    ratingAndTime,
    // totalratings,
    
  } = restaurant;
  // console.warn(itemCards);
  //we've to pass the name, id, areaname & logo of restaurant to MealComponent so that they can be added to cart details along with a meal. Hence we create a context and put these into it.

  const menu = getRandomObjects(RestaurantMenuData)
  
  // const myData = {
  //   name: name,
  //   id: id,
  //   areaname: areaname,
  //   logo: logo,
  // };

  //----------------------    Context ends    ----------------------

  return (
    <>
      <div className="w-full min-h-screen">
        {/* Restaurant details */}
        <div className="w-[60%] mx-auto font-gilroy mt-[20px]">
          <Link to="/">
        <a href="#"
            class="inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-black hover:bg-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                </path>
            </svg>
            <span class="ml-1 font-bold text-lg">Back</span>
        </a>
        </Link>
          <div>
            <h2 className="font-bold text-[26px] mb-[15px] mt-4 text-[#02060CEB]">{title}</h2>
            <div className="p-4 bg-gradient-to-b from-slate-50 to-[#DFDFE7] rounded-3xl mb-4">
            <div className="p-4 border-[1px] bg-white border-[#818080] border-opacity-60 rounded-2xl">
                {ratingAndTime != "--" && (
                  <div className="">
                    <span className="star-rating text-sm font-gilroy flex gap-2">
                      <div className="bg-green-500 w-6 text-center rounded-full items-center">

                      <i className="fa fa-star text-white text-[12px] "></i>
                      </div>
                      <div className="font-semibold text-base font-gilroy">
                      {ratingAndTime}

                      </div>
                    </span>
                  </div>
                )}
                <h5 className="my-1 text-[#FF5200] font-semibold">
                  {category}
                </h5>
                <div className="flex my-1">
                  <img
                    className="h-5 w-4 mr-1"
                    src="https://www.clipartmax.com/png/small/207-2072371_or-combined-to-be-gigantic-location-icon-in-orange-color.png"
                    alt=""
                  />
                  <h5 className="font-normal text-[#02060CEB]">{area}</h5>
                </div>
                <h5 className="font-normal text-[#02060CEB]">{deliverymsg || "MSG"}</h5>
            </div>

            </div>
          </div>
        </div>

        {/* <hr className="w-[60%] mx-auto my-2 border-gray-600" /> */}

        {/* Offers area */}

        <div className="w-[60%] mx-auto font-gilroy flex items-center overflow-x-auto whitespace-nowrap scrollbar-none">
          {
            [...new Array(5)].map((val,idx) => (
              <div className="rounded-md m-1 p-2 shadow cursor-pointer border border-gray-400">
                <div className="flex">
                <img className="w-10 h-10 mt-1 mr-4 flex-grow" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/generic" />
                <div>
                <h5 className="font-bold text-xl mr-10">30% upto 75rs</h5>
                <span className="text-sm text-[#02060C73] font-semibold">
                  USE TRYNEW 
                </span>
                </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Veg/non veg declaration */}

        <div className="w-[60%] mx-auto font-gilroy">
          <h4 className="mt-[20px] mb-[10px] font-[600] text-[18px]">
            <i className="fa fa-leaf text-green-800"></i> Pure Veg
          </h4>
        </div>

        <hr className="w-[60%] mx-auto border-gray-600" />

        {/* Menu items with categories */}

        {/* <RestaurantContext.Provider value={myData}> */}
          <div className="w-[60%] mx-auto my-1">
            {["Recommended"]?.map((category, index) => {
                return <ItemCardComponent key={index} category={category} menu={menu}/>;
            })}
          </div>
        {/* </RestaurantContext.Provider> */}
      </div>
    </>
  );
};

export default RestaurantMenu;
