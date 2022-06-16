import React, { useEffect, useState } from "react";
import { ModalNative } from "../components";
import { shortenAddress } from "../src/utils/shortenAddress";
import { MdOutlineVerified } from "react-icons/md";
import { useNFTBalances } from "react-moralis";
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import { marketAddress } from '../src/constant'

const CardNative = ({ currentAccount }) => {
  const { getNFTBalances, data } = useNFTBalances();
  const [nfts, setNfts] = useState([]);
  const nftsData = []
  const [cardInfo, setcardInfo] = useState();
  useEffect(() => {
    if (!currentAccount) return
    getNFTBalances({
      params: {
        chain: "rinkeby",
        address: currentAccount,
      }
    })
  }, [currentAccount])

  useEffect(() => {
    if (!data) return
    fetchWeb3Items();
  }, [data])

  async function fetchWeb3Items() {
    const provider = new ethers.providers.InfuraProvider('rinkeby', "fed1ef26af5648de8dea5d37316687db");
    const marketContract = new ethers.Contract(marketAddress, market.abi, provider)
    await Promise.all(data?.result.map(async i => {
      const getItemByCollctionAndTokenId = await marketContract.getItemByCollctionAndTokenId(i.token_address, i.token_id)
      if (getItemByCollctionAndTokenId?.status !== 1 && i.contract_type == "ERC721") {
        const openseaLink = "https://testnets.opensea.io/assets/rinkeby/" + i.token_address + "/" + i.token_id
        let item = {
          name: i.name,
          token_address: i.token_address,
          token_id: i.token_id,
          image: i.image,
          openseaLink: openseaLink
        }
        nftsData.push(item)
      }
    }))
    setNfts(nftsData)
    console.log("nfts",nftsData)
  }

  const verifyCollection = (tokenAddress) => {
    if (tokenAddress == "0x3bed33dab84a9415198d3fdb452e94829e16c1b6") {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      <div className="w-screen mt-12 pt-12 px-5 overflow-y-auto flex flex-wrap ">
        {nfts && nfts.map(nft => (
          <div key={`${nft.token_id} ${nft.token_address}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
            <div className="w-full m-auto">
              <div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-2xl items-center border-[1px] border-slate-200">
                <div className="card-wrap relative m-auto outline-none " >
                  <div className="h-full py-3 flex flex-col">
                    <div className="text-center px-2">
                      <div className="flex justify-center ">
                        <p className="  text-black text-xl font-bold truncate">
                          {`${nft.name}`}
                        </p>
                        {verifyCollection(nft.token_address) &&
                          <div>
                            <MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
                          </div>
                        }
                      </div>
                      <p className="text-black text-l truncate">
                        #{`${nft.token_id}`}
                      </p>
                    </div>
                    <img className="object-contain w-full h-48 " src={nft.image} alt={nft.name} />
                    {/* <div className="px-6 py-4 "> */}
                      {/* <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800 break-words truncate">{`${nft.name}`} </h4> */}
                      {/* <p className="leading-normal text-gray-700 flex-wrap truncate">{`${shortenAddress(nft.owner_of)}`}</p> */}
                    {/* </div> */}
                  </div>
                  <div className="px-6 relative mt-1">
                    <div className="flex justify-end md:items-baseline">
                      <label htmlFor="my-modal-4" onClick={() => setcardInfo(nft)} className="btn btn-sm text-white btn-primary normal-case modal-button mb-1 border-none hover:btn-secondary">
                        View
  										</label>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ModalNative cardInfo={cardInfo} currentAccount={currentAccount} />
    </>
  )
}

export default CardNative