import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addItem, clearCart, removeItem } from "../utils/cartSlice";
import { IMG_CDN_URL } from "./Config";
import { auth } from "../firebase";
import OrderHistory from "./OrderHistory";
import PathContext from "../utils/PathContext";

const Cart = () => {
  //------------------------------------------- Initialisation area ---------------------------------------
  // State variables
  const [totalBill, setTotalBill] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  // Subscribe to items array of cart slice in the store.
  const cartItems = useSelector((store) => store.cart.cartItems);

  //path will take you to respective restaurnat menu.
  const path = "/restaurant/" + cartItems.restaurant_id;

  const {setCurrentPath} = useContext(PathContext);
  const {pathname} = useLocation();

  //--------------------------------------- useEffects --------------------------------------------------
  useEffect(()=> {
    setCurrentPath(pathname);
  }, [])
  
  useEffect(() => {
    let total = 0;
    cartItems.items.forEach((cur) => {
      if (cur.price != "NaN") total += (Number(cur.price)) * cur.quantity;
    });
    total.toFixed(2);
    setTotalBill(total);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //--------------------------------------- Cart modifications ------------------------------------------

  const dispatch = useDispatch();
  const store = useStore();

  // Add menu in cart
  const addMenu = (curItem) => {
    dispatch(addItem(curItem));
    setTotalBill(totalBill + Number(curItem.price));
  };

  //remove menu
  const removeMenu = (curItem) => {
    dispatch(removeItem(curItem));
    const bill = Math.max(0, totalBill - Number(curItem.price));
    setTotalBill(bill);
  };

  //---------------------------------------- Checkout -> Push data to Firebase RTDB -----------------------

  const handleClick = () => {
    //check if user is logged in.
    if (!currentUser) {
      alert("Please Login/Sign up first to place an order");
      return;
    }

    //fetch cart items from redux store.
    const cartState = store.getState().cart;
    const cartItems = cartState.cartItems;

    //user details
    // const uid = currentUser.uid;
    // const databaseRef = database.ref("users/" + uid);
    // const newChildRef = databaseRef.push();

    // newChildRef.set(cartItems);

    alert("Order Successful");
    dispatch(clearCart());
  };

  //---------------------------------------- Rendering area -----------------------------------------------

  return (
    <>
      <div className="flex bg-slate-200 px-4 min-h-screen">
        {/* account details side */}
        <div className="w-[70%] m-4 p-4">
          {/* Account */}
          <div className="py-5 px-10 bg-white">
            <h3 className="text-lg font-bold font-Arvo">Account</h3>

            {currentUser ? (
              <div className="my-1">
                {/* personal information */}
                <div className="my-1">
                  <h2 className="text-md font-semibold font-Arvo">
                    Personal Information
                  </h2>
                  <h2 className="text-md font-Arvo m-1">
                    Name: {currentUser.displayName}
                  </h2>
                  <h3 className="text-md font-Arvo m-1">
                    Email: {currentUser.email}
                  </h3>
                </div>
                {/* Order History */}
                <div className="my-1">
                  <h2 className="text-md font-semibold font-Arvo">
                    Order History
                  </h2>
                  <OrderHistory currentUser={currentUser} />
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-Arvo text-slate-400 mb-4">
                  To place your order now, log in to your existing account or
                  sign up.
                </h4>
                <Link to="/login">
                  <button className="border border-green-700 rounded text-green-700 font-Arvo mx-2 py-1 px-3 text-sm">
                    Have an account? <br />
                    <span className="text-md font-bold">LOG IN</span>
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-green-700 rounded text-white font-Arvo mx-2 py-1 px-3 text-sm">
                    New to Food Studio? <br />
                    <span className="text-md font-bold"> SIGN UP</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
          {/* Delivery Address */}
          <div className="py-5 px-10 bg-white my-4">
            <h3 className=" font-gilroy font-bold text-lg">Delivery Address</h3>
          </div>
          {/* payment */}
          <div className="py-5 px-10 bg-white my-4">
            <h3 className="font-gilroy font-bold text-lg">Payment</h3>
          </div>
        </div>

        {/* Cart details side */}
        {cartItems.items.length > 0 && (
          <div className="bg-white w-[30%] h-[70vh] p-4 my-8 mx-4 ">
            {/* restaurant details */}
            <div className="flex">
              <div className="w-[50px] h-[50px] mx-2 overflow-hidden">
                <Link to={path}>
                  <img
                    className="w-[50px] h-[50px] object-cover"
                    src={cartItems.logo}
                    alt=""
                  />
                </Link>
              </div>
              <div className="mx-2">
                <h3 className="text-lg font-gilroy font-bold">
                  {cartItems.restaurantName}
                </h3>
                <h4 className="text-sm">{cartItems.areaName}</h4>
              </div>
            </div>

            {/* menu items list */}
            {/* Title, buttons to change quantity, price per piece */}
            <div className="h-[35vh] overflow-y-auto mt-4">
              {cartItems.items.map((curItem) => {
                return (
                  <div className="my-4 flex justify-between items-center">
                    <h3 className="w-[40%] font-gilroy font-semibold">{curItem.name}</h3>
                    <div className="w-[20%] font-bold flex justify-between items-center border border-gray-400 px-2 pb-1 mx-2 text-[#1ba672]">
                      <button className="text-xl" onClick={() => removeMenu(curItem)}>-</button>

                      <h4 className="mx-1 mt-1 font-gilroy">{curItem.quantity}</h4>

                      <button className="text-xl" onClick={() => addMenu(curItem)}>+</button>
                    </div>
                    <p className="w-[25%] text-end font-gilroy pr-4">
                    ₹{(curItem.price) * curItem.quantity}
                    </p>
                  </div>
                );
              })}
            </div>
            {/* Total Charge */}
              <div className="w-full h-[2px] bg-[#02060c]"></div>
            <div className="mt-2 py-2 flex justify-between ">
              <h3 className="font-bold">Total Amount to Pay:</h3>
              <h3 className="font-semibold pr-6">₹{totalBill}</h3>
            </div>

            <div className="flex justify-between my-1">
              <button
                className="bg-green-600 text-white font-gilroy font-bold p-2 rounded"
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                Clear Cart
              </button>
              <button
                className="bg-green-600 text-white font-gilroy font-bold p-2 rounded mr-4"
                onClick={handleClick}
              >
                CheckOut
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
