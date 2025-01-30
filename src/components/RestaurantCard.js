import { IMG_CDN_URL } from "./Config";
import { Link } from "react-router-dom";
import star from '../assets/img/star.png'

const RestaurantCard = ({
  title,
  ImageURL,
  cuisines,
  areaName,
  id,
  avgRating,
  offers
}) => {
  // console.warn(id);
  const path = "/restaurant/" + id;
  // console.warn(path);
  if (!title) return;
  return (
    <Link to={path}>
      <div className="w-[330px] mt-6 rounded-[5px] transition duration-300 ease-in-out hover:scale-95">
        <div className="w-full h-full relative rounded-[16px] shadow-lg drop-shadow-lg">
          <img
            className="w-[330px] h-[220px] rounded-[16px] object-cover"
            src={ImageURL}
            alt="restaurants-logo"
          />
          <div className="absolute h-16 w-full bottom-0 bg-gradient-to-b from-transparent to-[#1B1E24] rounded-b-[16px]">
            <div className="font-proxima font-extrabold text-white p-2 bottom-0 absolute text-xl">{offers}</div>
          </div>

        </div>
        <div className="p-2">
          <h3 className="m-[2px] font-gilroy font-bold text-lg">{title}</h3>
          <div className="items-center">
            <div className="px-[3px] w-[75%]">

              
              {avgRating != "--" && (
              <div className="">
                <span className="star-rating text-sm font-gilroy flex gap-2">
                  <div className="bg-green-500 w-6 text-center rounded-full items-center">

                  <i className="fa fa-star text-white text-[12px] "></i>
                  </div>
                  <div className="font-semibold text-base font-gilroy">
                   {avgRating}

                  </div>
                </span>
              </div>
            )}
              <h5 className="ml-[2px] mt-[2px] mb-0 font-gilroy text-[#02060C] opacity-70 font-medium max-w-[330px] overflow-ellipsis whitespace-nowrap overflow-hidden">
                {cuisines}
              </h5>
              <div className="flex items-center mt-[-4px]">
                {/* <img
                  className="h-5 w-4 mr-1"
                  src="https://www.clipartmax.com/png/small/207-2072371_or-combined-to-be-gigantic-location-icon-in-orange-color.png"
                  alt=""
                /> */}
                <h5 className="ml-[2px] font-gilroy text-[#02060C] opacity-70 font-medium">{areaName}</h5>
              </div>
            </div>

            
          </div>

          {/* <div className="flex items-center">
            <img
              className="h-6 w-6"
              src="https://thumbs.dreamstime.com/b/print-144632261.jpg"
              alt=""
            />

            <span className="text-[#a0522d] text-xs font-gilroy">
              40% Off | Use TRYNEW
            </span>
          </div> */}

        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
