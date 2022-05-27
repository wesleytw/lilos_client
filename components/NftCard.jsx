import React, { useContext, useRef, useState }from "react";


const NFTCard = ({nftItem}) =>{
    return (
        <img src={nftItem.image} alt="" />
    );
}
export default NFTCard;