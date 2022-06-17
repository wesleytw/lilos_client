import React, { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import { marketAddress } from '../src/constant'
import { MdOutlineVerified } from "react-icons/md";
import { shortenAddress } from "../src/utils/shortenAddress";

const ModalLeasedIn = ({ cardInfo, currentAccount }) => {
  const [signer, setSinger] = useState();
  const [error, setError] = useState("");
  const [btnState, setBtnState] = useState("");

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
    connectWallet()
    setBtnState("liquidate")
    // let stamp = 1578162600000
    let stamp = 1654505760 * 1000 //normal(java) timestamp is in milliseconds, but block.timestamp is in seconds.
    let time = new Date(stamp)
    let month = time.getMonth() + 1
    let year = time.getFullYear()
    let day = time.getDate()
    // console.log("month",month,"day",day,"year", year)
    console.log("cardInfo", cardInfo)
  }, [cardInfo])


  async function liquidate() {
    const marketContract = new ethers.Contract(marketAddress, market.abi, signer)
    try {
      setBtnState("liquidating")
      const liquidate = await marketContract.liquidate(cardInfo.listingId)
      await liquidate.wait()
      setBtnState("liquidated")
    } catch (error) {
      setBtnState("liquidate")
      alert(error)
    }

  }

  const verifyCollection = (tokenAddress) => {
    if (tokenAddress == "0x3BED33Dab84a9415198D3FdB452e94829E16c1b6") {
      return true
    } else {
      return false
    }
  }

  let btnAction
  if (btnState == "liquidate") {
    btnAction = <button className="btn text-white btn-primary border-none justify-center hover:btn-secondary " onClick={() => liquidate()}>liquidate</button>
  } else if (btnState == "liquidating") {
    btnAction = <button className="btn loading text-white btn-primary border-none justify-center hover:btn-secondary">liquidating</button>
  } else if (btnState == "liquidated") {
    btnAction = <div class="badge badge-lg badge-success text-sm p-3">Successfully liquidated 🎉</div>
  } 

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle " />
      <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
        <label className="modal-box relative h-5/6 w-11/12 max-w-5xl p-0 bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl shadow-[#000000ce]" htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-primary btn-circle border-none text-white overflow-hidden hover:bg-secondary absolute right-4 top-4 ">
            ✕</label>
          <div className="flex h-full justify-center items-center overflow-hidden px-16 bg-[#e9dfdf8e]  shadow-lg">
            <div className=' w-2/5 overflow-hidden object-cover ml-16'>
              <img className='object-cover' src={cardInfo?.image}></img>
            </div>
            <div className="h-[400px] w-3/5 px-12 ">
              <div className="flex justify-center ">
                <h1 className="text-3xl font-BADABB ">{cardInfo?.name} #{cardInfo?.tokenId}</h1>
                {verifyCollection(cardInfo?.collection) &&
                  <div className="pl-2">
                    <MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
                  </div>
                }
              </div>
              {/* <p className="py-4">You've been selected htmlFor a chance to get one year of subscription to use Wikipedia htmlFor free!</p> */}
              <div className="h-[300px] w-full pt-2 overflow-scroll">
                <div className="px-6 relative mt-2">
                  <div className="block pb-2">
                    <p className="text-gray-800 text-sm">
                      Collateral </p>
                    <div className="text-gray-700 text-2xl">
                      <div className="flex items-baseline space-x-1">
                        <div className="truncate leading-normal">{cardInfo?.collateral_eth}</div>
                        <img className='h-4' src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
                        <div className="text-xs text-gray-500 truncate">
                          ~ $83.15</div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-2">
                    <p className="text-gray-800 text-sm">
                      Rent </p>
                    <div className="text-gray-700 text-2xl">
                      <div className="flex items-baseline space-x-1">
                        <div className="truncate leading-normal">{cardInfo?.rental_eth}</div>
                        <img className='h-4' src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
                        <div className="text-sm text-gray-500 truncate font-mono">
                          ~ {(cardInfo?.rental_gwei / cardInfo?.lease_term).toFixed(1)}    gwei/sec
										</div>
                      </div>
                      {/* <div className="text-lg text-gray-500 truncate">
                      ~ {((cardInfo?.rental_wei / cardInfo?.lease_term) / Math.pow(10, 9)).toFixed(1)}    gwei/sec
										</div> */}
                    </div>
                  </div>
                  <div className="pb-2">
                    <p className="text-gray-800 text-sm">
                      Lease term </p>
                    <p className="text-gray-800 text-sm">
                      Lease term </p>
                    <p className="text-gray-800 text-sm">
                      Lease term </p>
                    <p className="text-gray-800 text-sm">
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
                </div>
              </div>
              {!signer ? (
                <div className="badge badge-warning gap-2 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  Please connect wallet
                </div>
              ) : (
                <div className="mt-6 flex justify-center">
                  {btnAction}
                </div>
              )
              }
            </div>
          </div>
        </label>
      </label>
    </>
  )
};

export default ModalLeasedIn;


