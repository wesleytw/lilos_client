import React, { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import erc721 from '../src/abi/ILOVENTHU.json'
import { marketAddress } from '../src/constant'

const CardModal = ({ cardInfo, currentAccount }) => {
  const [signer, setSinger] = useState();
  const [error, setError] = useState("");

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const accounts = await provider.listAccounts();
      const network = await provider.getNetwork();
      console.log(accounts[0])
      if (signer) setSinger(signer);
      console.log("signer", signer)
    } catch (error) {
      setError(error);
      console.log("error", error)
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);


  async function leaseIn() {
    const marketContract = new ethers.Contract(marketAddress, market.abi, signer)
    const totalValue = parseFloat(cardInfo.collateral_value) + parseFloat(cardInfo.rental_value)
    const msgValue = ethers.utils.parseUnits(totalValue.toString(), 'ether')
    console.log("totalValue,totalValue", totalValue)
    console.log("msgValue", msgValue)
    const transaction = await marketContract.leaseIn(cardInfo.listingId, {
      value: msgValue
    })
    await transaction.wait()
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
      <input type="checkbox" id="my-modal-4" className="modal-toggle " />
      <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
        <label className="modal-box relative h-5/6 w-11/12 max-w-5xl p-0 bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl shadow-[#000000ce]" htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-primary btn-circle border-none text-white overflow-hidden hover:bg-secondary absolute right-4 top-4 ">
            ✕</label>
          <div className="flex h-full justify-center items-center overflow-hidden px-16 bg-[#e9dfdf8e]  shadow-lg">
            <div className=' w-2/5 bg-accent overflow-hidden object-cover '>
              <img className='object-cover' src={cardInfo?.image}></img>
            </div>
            <div className="h-[400px] w-3/5 px-16 pt-10 overflow-scroll">
              <div className="flex justify-center ">
                <h1 className="text-3xl font-BADABB p-5">{cardInfo?.name} #{cardInfo?.tokenId}</h1>
                {verifyCollection(cardInfo?.collection) &&
                  <div>
                    <MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
                  </div>
                }
              </div>
              {/* <p className="py-4">You've been selected htmlFor a chance to get one year of subscription to use Wikipedia htmlFor free!</p> */}
              <div className="px-6 relative mt-2">
                <div className="block pb-2">
                  <p className="text-gray-800 text-xs">
                    Collateral </p>
                  <div className="text-gray-700 text-2xl">
                    <div className="flex items-baseline space-x-1">
                      <div className="truncate leading-normal">{cardInfo?.collateral_value}</div>
                      <img className='h-4' src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
                      <div className="text-xs text-gray-500 truncate">
                        ~ $83.15</div>
                    </div>
                  </div>
                </div>
                <div className="block pb-2">
                  <p className="text-gray-800 text-xs">
                    Rent </p>
                  <div className="text-gray-700 text-xl">
                    <div className="flex items-baseline space-x-1">
                      <div className="truncate leading-normal">{cardInfo?.rental_value}</div>
                      <img className='h-3' src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      ~ {((cardInfo?.rental_wei / cardInfo?.lease_term) / Math.pow(10, 9)).toFixed(1)}    gwei/sec
													</div>
                  </div>
                </div>
                <div className="block pb-2">
                  <p className="text-gray-800 text-xs">
                    Lease term </p>
                  <div className="text-gray-700 text-2xl">
                    <div className="flex items-baseline space-x-1">
                      <div className="font-mono truncate leading-normal text-lg">{cardInfo?.day}</div>
                      <div className="font-mono text-sm">days</div>
                      <div className="font-mono truncate leading-normal text-lg">{cardInfo?.hour}</div>
                      <div className="font-mono text-sm">hours</div>
                      <div className="font-mono truncate leading-normal text-lg">{cardInfo?.min}</div>
                      <div className="font-mono text-sm">mins</div>
                    </div>
                  </div>
                </div>
                {!signer ? (
                  <div class="badge badge-warning gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Please connect wallet
                  </div>
                ) : (
                  <button className="btn text-white btn-primary btn-sm normal-case border-none justify-center hover:bg-secondary" onClick={() => leaseIn()}>
                    Lease In</button>
                )
                }
              </div>
            </div>
          </div>
        </label>
      </label>
    </>
  )
};

export default CardModal;


