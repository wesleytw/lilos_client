import React, { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import erc721 from '../src/abi/ILOVENTHU.json'
import { marketAddress } from '../src/constant'

const CardModal = ({ cardInfo }) => {
  // console.log(signer)
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
    }
  };
  useEffect(() => {
    // if (web3Modal.cachedProvider) {
    connectWallet();
    // }
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
    loadNFTs()
  }
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle " />
      <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
        <label className="modal-box relative h-5/6 w-11/12 max-w-5xl p-0 bg-white border-2 border-black rounded-3xl overflow-hidden " htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-primary btn-circle border-none text-white overflow-hidden hover:bg-secondary absolute right-4 top-4 ">
            ✕</label>
          <div className="flex h-full justify-center items-center overflow-hidden bg-[#e9dfdf8e] ">
            <div className=' w-2/5 bg-accent overflow-hidden object-cover '>
              <img className='object-cover' src={cardInfo?.image}></img>
            </div>
            <div className="h-[400px] w-3/5 p-16 overflow-scroll">
              <h1 className="text-3xl font-BADABB">{cardInfo?.name}</h1>
              <p className="py-4">You've been selected htmlFor a chance to get one year of subscription to use Wikipedia htmlFor free!</p>
              <p>{cardInfo?.collateral_value}</p>
              <p>{cardInfo?.tokenId}</p>
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
        </label>
      </label>
    </>
  )
};

export default CardModal;