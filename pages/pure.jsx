import { useNFTBalances } from "react-moralis";
import React from "react";

export default function Nft() {
  const { getNFTBalances, data } = useNFTBalances();

  React.useEffect(() => {
    getNFTBalances({
      params: {
        // chain: "rinkeby",
        address: "0xba5D21502a127e49F03C25Fcf4c68E4Ab71f29a6"
      }
    })
  }, [])
  return (
    <>
      <h1 >Your NFTs</h1>
      <button className="btn" onClick={() => {
        getNFTBalances({
          params: {
            // chain: "rinkeby",
            address: "0xba5D21502a127e49F03C25Fcf4c68E4Ab71f29a6"
          }
        })
      }}>
        getNFTBalances
      </button>
      {data && console.log("data", data)}
      {data && data.result.map(nft => (
        <div key={nft.token_uri}>
          {nft.image && <img src={nft.image} />}
          <p>{nft.token_uri}</p>
          <p>{nft.image}</p>
        </div>
      ))}
    </>
  )
}