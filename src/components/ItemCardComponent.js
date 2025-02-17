import { useState } from "react";
import MealComponent from "./MealComponent";

const ItemCardComponent = ({category,menu,restaurantData}) => {
 
  //state variables
  const [expanded, setexpanded] = useState(false);

  //extracting data from props
  const title = category;
  // console.warn(menu);
  //when there is no dish 
  if (menu === undefined) {
    return;
  }

  return (
    <>
      <div className="font-gilroy">
        <div>
          <div
            className="flex cursor-pointer py-[15px] "
            onClick={() => setexpanded(!expanded)}
          >
            <h3 className="text-center w-[90%] font-bold text-[20px]">
              Menu ({menu.length})
            </h3>
            {/* <p className="text-center w-[10%]">{expanded ? "✖️" : "➕"}</p> */}
          </div>
          <hr className="w-[100%] mx-auto border-gray-600" />

          {
            menu.map((curMenu, index) => {
              return <MealComponent curMenu = {curMenu} key={index} restaurantData={restaurantData}/>;
            })
          }
        </div>
      </div>
    </>
  );
};

export default ItemCardComponent;
