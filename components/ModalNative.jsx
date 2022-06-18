import React, { useEffect, useState } from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import erc721 from '../src/abi/ILOVENTHU.json'
import { marketAddress } from '../src/constant'
import { shortenAddress } from "../src/utils/shortenAddress";
import { MdOutlineVerified } from "react-icons/md";


const ModalNative = ({ cardInfo, currentAccount }) => {
  const [signer, setSinger] = useState();
  const [account, setAccount] = useState();
  const [error, setError] = useState("");
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [collateral, setCollateral] = useState(0);
  const [rent, setRent] = useState(0);
  const [btnState, setBtnState] = useState("");

  function dayChange(e) { setDay(e.target.value); }
  function hourChange(e) { setHour(e.target.value); }
  function minsChange(e) { setMin(e.target.value); }
  function collateralChange(e) { setCollateral(e.target.value); }
  function rentChange(e) { setRent(e.target.value); }

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const accounts = await provider.listAccounts();
      setAccount(accounts[0])
      const network = await provider.getNetwork();
      if (signer) setSinger(signer);
      console.log("signer", signer, account)
    } catch (error) {
      setError(error);
      console.log("error", error)
    }
  };

  useEffect(() => {
    connectWallet()
    if (cardInfo?.status == 0){
      setBtnState("list")
    } else if (cardInfo?.status == 1){
      setBtnState("delist")
    }
  }, [cardInfo])

  async function list() {
    const marketContract = new ethers.Contract(marketAddress, market.abi, signer)
    const erc721Contract = new ethers.Contract(cardInfo.token_address.toString(), erc721.abi, signer)
    const isApprovedForAll = await erc721Contract.isApprovedForAll(account, marketAddress)
    const leaseTerm = day * 24 * 3600 + hour * 3600 + min * 60
    const collateralHex = ethers.utils.parseUnits(collateral.toString(), 'ether')
    const rentHex = ethers.utils.parseUnits(rent.toString(), 'ether')
    const leaseTermHex = ethers.BigNumber.from(leaseTerm)
    if (!isApprovedForAll) {
      try {
        setBtnState("approving")
        const approveBool = true
        const setApprovalForAll = await erc721Contract.setApprovalForAll(marketAddress, approveBool)
        await setApprovalForAll.wait()
        console.log("approved")
        setBtnState("listing")
        const transaction = await marketContract.listToken(cardInfo.token_address, cardInfo.token_id, collateralHex, rentHex, leaseTermHex)
        await transaction.wait()
        console.log("listed")
        setBtnState("listed")
      } catch (error) {
        setBtnState("list")
        alert(error)
      }
    } else {
      try {
        setBtnState("listing")
        const transaction = await marketContract.listToken(cardInfo.token_address, cardInfo.token_id, collateralHex, rentHex, leaseTermHex)
        await transaction.wait()
        console.log("listed")
        setBtnState("listed")
      } catch (error) {
        setBtnState("list")
        alert(error)
      }
    }
  }

  async function delist() {
    const marketContract = new ethers.Contract(marketAddress, market.abi, signer)
    try {
      setBtnState("delisting")
      const transaction = await marketContract.delist(cardInfo.listingId)
      await transaction.wait()
      console.log("delisted")
      setBtnState("delisted")
    } catch (error) {
      setBtnState("delist")
      alert(error)
    }
  }

  let btnAction
  if (btnState == "list") {
    btnAction = <button className="btn text-white btn-primary border-none justify-center hover:btn-secondary " onClick={() => list()}>List</button>
  } else if (btnState == "delist") {
    btnAction = <button className="btn text-white btn-primary border-none justify-center hover:btn-secondary " onClick={() => delist()}>delist</button>
  } else if (btnState == "approving") {
    btnAction = <button className="btn loading text-white btn-primary border-none justify-center hover:btn-secondary" >approving</button>
  } else if (btnState == "listing") {
    btnAction = <button className="btn loading text-white btn-primary border-none justify-center hover:btn-secondary" >listing</button>
  } else if (btnState == "listed") {
    btnAction = <div class="badge badge-lg badge-success text-sm p-3">Successfully listed 🎉</div>
  } else if (btnState == "delisting") {
    btnAction = <button className="btn loading text-white btn-primary border-none justify-center hover:btn-secondary" >delisting</button>
  } else if (btnState == "delisted") {
    btnAction = <div class="badge badge-lg badge-success text-sm p-3">Successfully delisted 🎉</div>
  }

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle " />
      <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
        <label className="modal-box relative h-5/6 w-11/12 max-w-5xl p-0 bg-white border-2 border-black rounded-3xl overflow-hidden shadow-2xl shadow-[#000000ce]" htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-primary btn-circle border-none text-white overflow-hidden hover:bg-secondary absolute right-4 top-4 ">
            ✕</label>
          <div className="flex h-full justify-center items-center overflow-hidden px-16 bg-[#e9dfdf8e]  shadow-lg">
            <div className=' w-2/5 overflow-hidden object-cover '>
              <img className='object-cover' src={cardInfo?.image}></img>
            </div>
            <div className="h-[450px] w-3/5 px-16 pt-3 overflow-scroll">
              <div className="flex justify-center p-5">
                <h1 className="text-3xl font-BADABB ">{cardInfo?.name} #{cardInfo?.token_id}</h1>
                {cardInfo?.verifyCollection &&
                  <div className="pl-2">
                    <MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
                  </div>
                }
              </div>
              {/* <p>lessor: {shortenAddress(cardInfo?.owner_of)}</p> */}
              <a href={`${"https://testnets.opensea.io/assets/rinkeby/" + cardInfo?.token_address + "/" + cardInfo?.token_id}`} target="_blank" rel="noopener noreferrer">
                <img className=" h-8 shadow-sm hover:shadow-lg z-50 rounded-full" src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png" />
              </a>
              {/* <p>collection #{cardInfo?.token_id}</p> */}
              {cardInfo?.status == 0 ? (
                <>
                  <div className="flex justify-evenly items-center p-2 pt-0 my-3 border-2 rounded-xl">
                    <h1 className=" text-[#00000094]">lease term</h1>
                    <div className="flex-col justify-center items-center text-center">
                      <h1 className="text-sm text-[#00000083]">day</h1>
                      <input type="number" min="0" max="9" value={day} onChange={dayChange} placeholder="D" className="input input-bordered w-11 h-9 max-w-xs px-1 bg-white font-bold rounded-5xl" />
                    </div>
                    <div className="flex-col justify-center items-center text-center">
                      <h1 className="text-sm text-[#00000083]">hour</h1>
                      <input type="number" min="0" max="23" value={hour} onChange={hourChange} placeholder="H" className="input input-bordered w-11 h-9 max-w-xs px-1 bg-white font-bold rounded-5xl" />
                    </div>
                    <div className="flex-col justify-center items-center text-center">
                      <h1 className="text-sm text-[#00000083]">min</h1>
                      <input type="number" min="2" max="60" value={min} onChange={minsChange} placeholder="M" className="input input-bordered w-11 h-9 max-w-xs px-1 bg-white font-bold rounded-5xl" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-center px-6 pb-2">
                    <h1 className="text-sm text-[#00000083]">collateral (eth)</h1>
                    <input type="number" min="1" max="60" value={collateral} onChange={collateralChange} placeholder="collateral" className="input input-bordered max-w-xs px-1 w-32 bg-white font-bold rounded-5xl" />
                  </div>
                  <div className="flex justify-between items-center text-center px-6 pb-2">
                    <h1 className="text-sm text-[#00000083]">rent (eth)</h1>
                    <input type="number" min="1" max="60" value={rent} onChange={rentChange} placeholder="rent" className="input input-bordered max-w-xs px-1 w-32 bg-white font-bold rounded-5xl" />
                  </div>
                </>
              ) : (
                <>
                  <p>{cardInfo?.lease_term}</p>
                </>
              )
              }
              {!signer ? (
                <div className="badge badge-warning gap-2 mt-6 flex justify-center">
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

export default ModalNative;


