import { useEffect, useState, useContext } from "react";
import SearchBar from "./SearchBar";
import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import  FOOD_STDUIO_LOGO  from "../assets/img/logo.png"
import { auth } from "../firebase";
import PathContext from "../utils/PathContext";


const Header = () => {

  const {currentPath} = useContext(PathContext);

  const [userName, setUserName] = useState(null);

  // Subscribe to the redux store
  const cartItems = useSelector(store => store.cart.cartItems);
  const path = "/login";

  // console.log("Header rendering");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      // console.log(user);
      if(user != null){
        // console.log(user.displayName);
        if(!user.displayName){
          await user.reload();
        }
        setUserName(user.displayName);
      }else{
        setUserName(null);
      }
    })

    return () => {
      unsubscribe();
    }
  })

  const handleClick = () => {
    // console.log("log out");
    auth.signOut();
    // setUser(null);
  }

  return (
    <div className="shadow-xl sticky top-0 z-10 bg-white rounded-b-lg">
      <div className="flex justify-between p-[13px] container mx-auto ">
        <a className="w-[70px] h-[70px] overflow-hidden rounded-full flex justify-center" href="/">
          <img className="max-w-full max-h-full object-cover"
            src= {FOOD_STDUIO_LOGO}
            alt=""
          />
        </a>

        {
          currentPath === "/" && <SearchBar/>
        }

        <div className="flex justify-end items-center font-gilroy ">
          <ul className="list-none flex justify-between m-0 p-0">
            <li className="font-gilroy font-semibold p-[10px] text-[18px]"><Link to="/">Home</Link></li>
            <li className="font-gilroy font-semibold p-[10px] text-[18px]"><Link to="/about">About Us</Link></li>
            <li className="font-gilroy font-semibold p-[10px] text-[18px]"><Link to="/contact">Contact Us</Link></li>
            <li className="font-gilroy font-semibold p-[10px] text-[18px]"><Link to="/cart">Cart ({cartItems.items.length})</Link></li>
            
          </ul>
          <div className="flex items-center">
            {
              !userName ? (<Link to={path}><button className=" bg-inherit border-2 border-black rounded p-1 px-4 font-gilroy font-semibold text-[18px] h-[37px]"
              >Login</button></Link>) : 
              (<button className=" bg-inherit border-2 border-black rounded p-1 px-4 font-gilroy font-semibold text-[18px] h-[37px]"
              onClick= {() => handleClick()}
              >{userName} - Logout</button>)
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
