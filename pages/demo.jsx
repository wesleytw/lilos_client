import Head from "next/head"
import { shortenAddress } from "../src/utils/shortenAddress";
import { useMoralis, useNFTBalances } from "react-moralis";
import React, { useEffect, useState } from "react";
import { Nav } from "../components";
import { MdOutlineVerified } from "react-icons/md";

const Account = () => {

	const { account, isAuthenticated, authenticate, isAuthenticating, logout, user, isInitialized } = useMoralis();
	const { getNFTBalances, data } = useNFTBalances();

	//
	let demoAccount = "0xf39E86EAf59077e3977496eA3c0352891DDa4037"
	// 
	useEffect(() => {
		console.log('isAuthenticated?', isAuthenticated)
		// if (!isAuthenticated) return
		getNFTBalances({
			params: {
				chain: "rinkeby",
				address: demoAccount,
				token_addresses: "0x3BED33Dab84a9415198D3FdB452e94829E16c1b6",
				token_id: "5"
			}
		})
	}, [isInitialized])

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
			<Nav />

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
									<div className="px-6 relative mt-1"><div className="block"><p className="text-gray-800 text-xs">On sale</p><div className="text-gray-700 text-2xl"><div className="flex items-baseline space-x-1"><div className="truncate">6.9 Ⓝ</div><div className="text-xs text-gray-500 truncate">~ $83.15</div></div></div></div><div className="flex justify-between md:items-baseline"><p className="font-bold text-black cursor-pointer hover:opacity-80 text-base md:text-base mb-1 md:mb-0">Buy Now</p><a className="text-gray-500 underline text-sm md:text-sm" href="/token/x.paras.near::145332">See Details</a></div></div>
								</div>
								{/* </div> */}
							</div>
						</div>
					</div>
				))}
				{data && console.log(data.result)}
			</div>
		</>
	)


}

export default Account


