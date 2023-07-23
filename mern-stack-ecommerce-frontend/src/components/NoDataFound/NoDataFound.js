import React from "react";

import { Button } from "@material-tailwind/react";
const reloadPage =()=>{
  window.location.reload();
}
const NoDataFound = () => {
  return (
    <div className="flex justify-center  flex-col "> 
      <img className="h-[400px] " src="https://res.cloudinary.com/dz1pzeo5w/image/upload/v1690108668/image-api/ikbgfhemyqwmdlgppfo3.svg"></img>
      
      <Button size="lg" color="blue" className="flex items-center mx-auto w-fit" onClick={reloadPage}>
        
        <span className="material-symbols-outlined h-6 w-6 mr-2" >
          frame_reload
        </span>
        Reload Page
      </Button>
    </div>
  );
};

export default NoDataFound;