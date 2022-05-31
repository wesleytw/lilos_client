import React from "react";


const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
				<div className={` text-black font-bold font-mono text-3xl`} to="/lava-test/welcome">
          LILO
        </div>
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-black text-base text-center mx-2 cursor-pointer">White Paper</p>
        <p className="text-black text-base text-center mx-2 cursor-pointer">About</p>
        <p className="text-black text-base text-center mx-2 cursor-pointer">Tutorials</p>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <a className="text-black text-sm text-center font-medium mt-2" href="https://rinkeby.etherscan.io/address/0xa4f2020bf0bbe5c507b41e230f590957ebc63d13">
        lilonft@gmail.com</a>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-black text-left text-xs">@lilosnft2022</p>
      <p className="text-black text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;