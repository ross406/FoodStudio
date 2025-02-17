import {useState, useContext, useEffect} from "react";
import { IMG_CDN_URL } from "./Config";
import { useDispatch ,useSelector } from "react-redux";
import { checkAvailability, findQuantity, removeMenu } from "../utils/utils";
import { useParams } from "react-router-dom";
import RestaurantContext from "../utils/RestaurantContext";

const MealComponent = ({curMenu, restaurantData}) => {

    //destructure props
    const {name, price, description} = curMenu;

    //state variables
    const [itemQuantity, setItemQuantity] = useState(0);

    //Read data from context API
    // const myData = useContext(RestaurantContext);

    //fetch the id of opened restaurant
    const { id } = useParams();
    
//Cart operations
    //susbcribe to cart
    const cartItems = useSelector(store => store.cart.cartItems);
    //push to cart
    const dispatch = useDispatch();

    //action functions
    const handleAdd = (meal) => {
        const check = checkAvailability(id, meal, cartItems, dispatch, restaurantData);
        if(check){
            setItemQuantity(itemQuantity+1);
        }
    }

    const handleRemove = (meal) => {
        removeMenu(meal, cartItems, dispatch);
        setItemQuantity(Math.max(0, itemQuantity-1));
    }

    useEffect(() => {
      setItemQuantity(findQuantity(curMenu?.curMenu?.card?.info?.id, cartItems));
    }, []);
    

  return (
    <>
        <div className="flex p-[5px] items-center mt-5">
          <div className="w-[80%] mb-[10px] px-[10px] font-gilroy">
            <h4 className="mt-0 mb-[8px] font-gilroy font-semibold text-[#02060CBF]">{name}</h4>
            <h5 className="my-[4px] font-semibold text-[#02060CBF]">
            ₹ {price}
            </h5>
            <p className="my-[4px] text-[#02060CBF] opacity-70">
              {description}
            </p>
          </div>
          <div className="relative w-[20%] text-center px-[10px] overflow-hidden">
            {curMenu["image-src"] ? (
              <img
                className="w-full h-[144px] object-cover rounded-xl shadow-md"
                src={curMenu["image-src"]}
                alt="meal-image"
              />
            ) : (
              <></>
            )}
            <div>
              <button className="text-[#1BA672] relative bottom-5 font-semibold font-gilroy text-lg w-[120px] h-[38px] border-[1px] border-[#818080] border-opacity-40 rounded-lg bg-white shadow-md" onClick={() => handleAdd(curMenu)}>
                ADD
              </button>
            </div>
            {/* <div className="flex justify-evenly rounded">
              <button
                className=" text-sm text-white p-1 transform transition duration-300 hover:scale-125"
                onClick={() => handleRemove(curMenu)}
              >
                ➖
              </button>

              <h1 className="p-1">{itemQuantity}</h1>

              <button
                className=" text-sm text-white p-1 transform transition duration-300 hover:scale-125"
                onClick={() => handleAdd(curMenu)}
              >
                ➕
              </button>
            </div> */}
          </div>
        </div>
        <hr className="w-[100%]" />
        {/* {index < menu.length - 1 ? (
          <div>
            
          </div>
        ) : (
          <></>
        )} */}
    </>
  );
};

export default MealComponent;
