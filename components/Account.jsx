import { shortenAddress } from "../src/utils/shortenAddress";
import { useMoralis, useNFTBalances } from "react-moralis";
import React, {useEffect, useState} from "react";
import { useMoralisWeb3Api } from "react-moralis";
// import { NftCard } from "./NftCard";
// const [nfts, setNfts] = useState([])

const Account =  () =>{
  const { account, isAuthenticated, authenticate, isAuthenticating, logout, user } = useMoralis();
  const {  getNFTBalances, data } = useNFTBalances();
  const { data: NFTBalances } = useNFTBalances();
  const Web3Api = useMoralisWeb3Api();
  // useEffect(()=>{
  //   getNFTBalances({
  //     params: {
  //       chain: "rinkeby",
  //       address: user.get("ethAddress")
  //     }
  //   })
  // },[])

  // get all NFTs in the collection
  // useEffect(() => {
  //   (async () => {
  //     const nfts = await Web3Api.Web3API.account.getNFTs({
  //       chain: "rinkeby",
  //       address: user.get("ethAddress"),
  //     });
  //     setNfts(nfts)
  //   })()
  // }, [])


  const fetchNFTs = async () => {
    const NFTs = await Web3Api.Web3API.account.getNFTs({
      chain: "rinkeby",
      address: user.get("ethAddress"),
    });
    console.log(NFTs.result);
    return NFTs;
  };
  // const NFTs = fetchNFTs();

  // console.log("NFTBalances", NFTBalances);
  return (
    <div>
      {isAuthenticated && (
        <div>
          <div className=" mx-auto bg-[#ad3a3a] mt-0 md:mt-0 h-screen px-4 py-40">
            <h1>Account</h1>
            <p className="bg-white px-4">
              {shortenAddress(user.get("ethAddress"))}
            </p>
            <button onClick={fetchNFTs} className="bg-[#2952e3] text-sm py-2 px-4 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] shadow text-white">
              show
            </button>
            <div>
            { fetchNFTs.result && fetchNFTs.result.map(nft =>(
              <div className=" mx-auto bg-[#000000] px-4 ">
                {/* <h1>ooooogggggggggggggggggggggggggg</h1> */}
                <p>${nft.token_address}</p>
                
                {/* <img src=nft. */}

              </div>
              ))
            }
            </div>
            {/* <div className="flex flex-wrap ">
              {nfts.map((nftItem, id) => (
                <NFTCard
                  key={id}
                  nftItem={nftItem}
                  title={collection?.title}
                  listings={listings}
                />
              ))}
            </div> */}
            <p>
              {/* { NFTBalances } */}
            </p>
          </div>
          <div className=" mx-auto bg-[#ad3a3a] mt-0 md:mt-0 h-screen py-20">
            <h1>Account</h1>
          </div>
        </div>
      )} 
    </div>
  );
}
export default Account;
