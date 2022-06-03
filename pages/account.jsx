import Head from "next/head"
import { shortenAddress } from "../src/utils/shortenAddress";
import { useNFTBalances } from "react-moralis";
import React, { useEffect, useState } from "react";
import { Nav, CardBalanceModal, Footer } from "../components";
import { MdOutlineVerified } from "react-icons/md";

const Account = () => {
	const { getNFTBalances, data } = useNFTBalances();
	const [cardInfo, setcardInfo] = useState();
	const [currentAccount, setCurrentAccount] = useState("");

	useEffect(() => {
		if (!currentAccount) return
		getNFTBalances({
			params: {
				chain: "rinkeby",
				address: currentAccount,
			}
		})
	}, [currentAccount])
	// }, [isInitialized])

	const verifyCollection = (tokenAddress) => {
		if (tokenAddress == "0x3bed33dab84a9415198d3fdb452e94829e16c1b6") {
			return true
		} else {
			return false
		}
	}

	return (
		<>
			<Head>
				<title>DEMO</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* px-28 pt-28 md:px-56 md:py-8 lg:px-96 lg:py-16 */}
			{/* bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer */}
			<Nav currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} />


			<div className="w-screen mt-0 pt-40 px-5 overflow-y-auto flex flex-wrap ">
				{data && data.result.map(nft => (
					<div key={`${nft.token_id} ${nft.token_address}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
						<div className="w-full m-auto">
							<div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-lg items-center border-[1px] border-slate-200">
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
										{/* <div className="max-full m-8 mb-16 rounded-lg shadow-lg items-center"> */}
										<img className="object-contain w-full h-48 " src={nft.image} alt={nft.name} />
										<div className="px-6 py-4 ">
											{/* <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800 break-words truncate">{`${nft.name}`} </h4> */}
											<p className="leading-normal text-gray-700 flex-wrap truncate">{`${shortenAddress(nft.owner_of)}`}</p>
										</div>
									</div>
									<div className="px-6 relative mt-1">
										<div className="flex justify-between md:items-baseline"><p className="font-bold text-black cursor-pointer hover:opacity-80 text-base md:text-base mb-1 md:mb-0">
											Buy Now</p>
											<label htmlFor="my-modal-4" onClick={() => setcardInfo(nft)} className="btn btn-sm text-white btn-primary normal-case modal-button mb-1 border-none hover:bg-secondary">
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
				{data && console.log(data.result)}
			</div>
			<CardBalanceModal cardInfo={cardInfo} currentAccount={currentAccount} />
			<Footer />
		</>
	)
}

export default Account
//above works


// import Head from "next/head"
// import { Nav, Footer, CardModal } from "../components";
// import React, { useEffect, useState } from "react";
// import { shortenAddress } from "../src/utils/shortenAddress";
// import { useNFTBalances } from "react-moralis";
// import { ethers } from 'ethers'
// import { fetchUrl, resolveImg } from '../src/utils/fetchUrl'
// import market from '../src/abi/Lilos_V1.json'
// import erc721 from '../src/abi/ILOVENTHU.json'
// import { marketAddress } from '../src/constant'
// import { MdOutlineVerified } from "react-icons/md";

// const Market = () => {
// 	const [nfts, setNfts] = useState([]);
// 	const [cardInfo, setcardInfo] = useState();
// 	const [currentAccount, setCurrentAccount] = useState("");
// 	const { getNFTBalances, data } = useNFTBalances();

// 	useEffect(() => {
// 		if (!currentAccount) return
// 		getNFTBalances({
// 			params: {
// 				chain: "rinkeby",
// 				address: currentAccount,
// 			}
// 		})
// 	}, [currentAccount])
// // 	// }, [isInitialized])

// 	const verifyCollection = (tokenAddress) => {
// 		if (tokenAddress == "0x3bed33dab84a9415198d3fdb452e94829e16c1b6") {
// 			return true
// 		} else {
// 			return false
// 		}
// 	}

// 	useEffect(() => {
// 		fetchWeb3Items();
// 	}, [])

// 	async function fetchWeb3Items() {
// 		// const provider = new ethers.providers.Web3Provider(web3.currentProvider)
// 		const provider = new ethers.providers.InfuraProvider('rinkeby', "fed1ef26af5648de8dea5d37316687db");
// 		const marketContract = new ethers.Contract(marketAddress, market.abi, provider)
// 		const getActiveItems = await marketContract.getActiveItems()

// 		const items = await Promise.all(getActiveItems?.map(async i => {

// 			const tokenContract = new ethers.Contract(i.collection, erc721.abi, provider)
// 			const tokenUri = await tokenContract.tokenURI(i.tokenId)
// 			const name = await tokenContract.name()
// 			const meta = await fetchUrl(tokenUri)
// 			const img = await resolveImg(meta?.image)
// 			const openseaLink = "https://testnets.opensea.io/assets/rinkeby/" + i.collection + "/" + i.tokenId

// 			let item = {
// 				listingId: i.listingId.toNumber(),
// 				status: i.status,
// 				lessor: i.lessor,
// 				lessee: i.lessee,
// 				collection: i.collection,
// 				name: name,
// 				tokenId: i.tokenId.toNumber(),
// 				image: img,
// 				collateral_value: ethers.utils.formatEther(i.collateral_value),
// 				rental_value: ethers.utils.formatEther(i.rental_value),
// 				lease_term: i.lease_term.toNumber(),
// 				lease_start_date: i.lease_start_date.toNumber(),
// 				lease_end_date: i.lease_end_date.toNumber(),
// 				openseaLink: openseaLink
// 			}
// 			return item;
// 		}))
// 		setNfts(items)
// 	}
// 	const [day, setDay] = useState();
// 	function dayChange(e) {
// 		setDay(e.target.value);
// 	}

// 	return (
// 		<>
// 			<Head>
// 				<title>market</title>
// 				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
// 			</Head>
// 			{/* px-28 pt-28 md:px-56 md:py-8 lg:px-96 lg:py-16 */}
// 			{/* bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer */}
// 			<Nav currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} />

// 			<div className="w-screen mt-0 pt-40 px-5 overflow-y-auto flex flex-wrap ">
// 				{nfts && nfts.map(nft => (
// 					<div key={`${nft.tokenId} ${nft.collection}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
// 						<div className="w-full m-auto">
// 							<div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-lg items-center border-[1px] border-slate-200">
// 								<div className="card-wrap relative m-auto outline-none " >
// 									<div className="h-full py-3 flex flex-col">
// 										<div className="text-center px-2">
// 											<div className="flex justify-center ">
// 												<p className="  text-black text-xl font-bold truncate">
// 													{`${nft.name}`}
// 												</p>
// 												{verifyCollection(nft.collection) &&
// 													<div>
// 														<MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
// 													</div>
// 												}
// 											</div>
// 											<p className="text-black text-lg truncate">
// 												#{`${nft.tokenId}`}
// 											</p>
// 										</div>
// 										{/* <div className="max-full m-8 mb-16 rounded-lg shadow-lg items-center"> */}
// 										<img className="object-contain w-full h-48 " src={nft.image} />
// 										<div className="px-6 py-4 flex justify-between items-center">
// 											<div>
// 												<p className="text-gray-800 text-xs">Lessor</p>
// 												<p className="leading-normal text-gray-700 justify-end">{`${shortenAddress(nft.lessor)}`}</p>
// 											</div>
// 											<a href={`${nft.openseaLink}`}>
// 												<img className=" h-8 shadow-sm hover:shadow-lg z-50 rounded-full" src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png" />
// 											</a>
// 										</div>
// 									</div>
// 									<div className="px-6 relative mt-2">
// 										<div className="block">
// 											<p className="text-gray-800 text-xs">
// 												On sale</p>
// 											<div className="text-gray-700 text-2xl">
// 												<div className="flex items-baseline space-x-1">
// 													<div className="truncate leading-normal">
// 														{nft.collateral_value}</div>
// 													<img className='h-4' src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
// 													<div className="text-xs text-gray-500 truncate">
// 														~ $83.15</div>
// 												</div>
// 											</div>
// 										</div>
// 										<div className="flex justify-between p-3 md:items-baseline">
// 											<p className="font-bold text-black cursor-pointer hover:opacity-80 text-base md:text-base mb-1 md:mb-0">
// 												Buy Now</p>
// 											<label htmlFor="my-modal-4" onClick={() => setcardInfo(nft)} className="btn btn-sm text-white btn-primary normal-case modal-button mb-1 border-none hover:bg-secondary">
// 												Lease In
// 											</label>
// 										</div>
// 									</div>
// 								</div>
// 								{/* </div> */}
// 							</div>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 			<CardModal cardInfo={cardInfo} currentAccount={currentAccount} />
// 			<Footer />
// 			{/* <input type="number" min="1" max="5" value={day} onChange={dayChange} placeholder="Type here" class="input input-bordered w-16 max-w-xs py-0 bg-white font-bold rounded-5xl" />
// 		<h1>wqwqx{day}</h1> */}
// 		</>
// 	)

// };

// export default Market