import React, { useEffect, useState } from "react";
import { ModalLeasedIn } from ".";
import { shortenAddress } from "../src/utils/shortenAddress";
import { fetchUrl, resolveImg } from '../src/utils/fetchUrl'
import { MdOutlineVerified } from "react-icons/md";
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import erc721 from '../src/abi/ILOVENTHU.json'
import { marketAddress } from '../src/constant'


const CardLeasedIn = ({ data, currentAccount }) => {
	const [nfts, setNfts] = useState([]);
	const [cardInfo, setcardInfo] = useState();
	const nftsData = []

	useEffect(() => {
		if (!currentAccount) return
		fetchWeb3Items();
	}, [currentAccount])

	async function fetchWeb3Items() {
		const provider = new ethers.providers.InfuraProvider('rinkeby', "fed1ef26af5648de8dea5d37316687db");
		const marketContract = new ethers.Contract(marketAddress, market.abi, provider)
		const getItemsByLessee = await marketContract.getItemsByLessee(currentAccount)
		await Promise.all(getItemsByLessee?.map(async i => {
			if (i.status == 2) {
				const tokenContract = new ethers.Contract(i.collection, erc721.abi, provider)
				const tokenUri = await tokenContract.tokenURI(i.tokenId)
				const name = await tokenContract.name()
				const meta = await fetchUrl(tokenUri)
				const img = await resolveImg(meta?.image)
				const openseaLink = "https://testnets.opensea.io/assets/rinkeby/" + i.collection + "/" + i.tokenId
				const day = parseInt(i.lease_term / 24 / 3600)
				const hour = parseInt(i.lease_term / 3600) % 24
				const min = parseInt(i.lease_term / 60) % 60
				let item = {
					listingId: i.listingId.toNumber(),
					lessor: i.lessor,
					lessee: i.lessee,
					collection: i.collection,
					name: name,
					tokenId: i.tokenId.toNumber(),
					image: img,
					collateral_value: i.collateral_value,
					collateral_eth: ethers.utils.formatEther(i.collateral_value),
					collateral_gwei: ethers.utils.formatUnits(i.collateral_value, "gwei"),
					rental_value: i.rental_value,
					rental_eth: ethers.utils.formatEther(i.rental_value),
					rental_gwei: ethers.utils.formatUnits(i.rental_value, "gwei"),
					lease_term: i.lease_term.toNumber(),
					day: day,
					hour: hour,
					min: min,
					lease_start_date: i.lease_start_date.toNumber(),
					lease_end_date: i.lease_end_date.toNumber(),
					openseaLink: openseaLink
				}
				nftsData.push(item)
			}
		}))
		setNfts(nftsData)
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
      <div className="w-screen py-16 overflow-y-auto flex flex-wrap ">
				{nfts && nfts.map(nft => (
					<div key={`${nft.tokenId} ${nft.collection}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
						<div className="w-full m-auto">
							<div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-2xl items-center border-[1px] border-[#00000025] hover:cursor-default cursor-default">
								<div className="card-wrap relative m-auto outline-none hover:cursor-default " >
									<div className="h-full py-3 flex flex-col">
										<div className="text-center px-2">
											<div className="flex justify-center ">
												<p className="  text-black text-xl font-bold truncate">
													{`${nft.name}`}
												</p>
												{verifyCollection(nft.collection) &&
													<div>
														<MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
													</div>
												}
											</div>
											<p className="text-black text-lg truncate">
												#{`${nft.tokenId}`}
											</p>
										</div>
										{/* <div className="max-full m-8 mb-16 rounded-lg shadow-lg items-center"> */}
										<img className="object-contain w-full h-48 " src={nft.image} />
										<div className="px-6 py-4 flex justify-between items-center">
											<div>
												<p className="text-gray-800 text-xs">Lessor</p>
												<p className="leading-normal text-gray-700 justify-end">{`${shortenAddress(nft.lessor)}`}</p>
											</div>
											<a href={`${nft.openseaLink}`} target="_blank" rel="noopener noreferrer">
												<img className=" h-8 shadow-sm hover:shadow-lg z-50 rounded-full" src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png" />
											</a>
										</div>
									</div>
									<div className="px-6 relative mt-2">
										<div className="block pb-2">
											<p className="text-gray-800 text-xs">
												Collateral </p>
											<div className="text-gray-700 text-2xl">
												<div className="flex items-baseline space-x-1">
													<div className="truncate leading-normal">{nft.collateral_eth}</div>
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
													<div className="truncate leading-normal">{nft.rental_eth}</div>
													<img className='h-3' src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"></img>
												</div>
												<div className="text-xs text-gray-500 truncate">
													~ {(nft.rental_gwei / nft.lease_term).toFixed(1)}    gwei/sec
													</div>
											</div>
										</div>
										<div className="block pb-2">
											<p className="text-gray-800 text-xs">
												Lease term </p>
											<div className="text-gray-700 text-2xl">
												<div className="flex items-baseline space-x-1">
													<div className="font-mono truncate leading-normal text-lg">{nft.day}</div>
													<div className="font-mono text-sm">days</div>
													<div className="font-mono truncate leading-normal text-lg">{nft.hour}</div>
													<div className="font-mono text-sm">hours</div>
													<div className="font-mono truncate leading-normal text-lg">{nft.min}</div>
													<div className="font-mono text-sm">mins</div>
												</div>
											</div>
										</div>
										<div className="flex justify-end p-3 md:items-baseline">
											<label htmlFor="my-modal-4" onClick={() => setcardInfo(nft)} className="btn btn-sm text-white btn-primary normal-case modal-button mb-1 border-none hover:bg-secondary">
												Repay
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
			{console.log(cardInfo)}
			<ModalLeasedIn cardInfo={cardInfo} currentAccount={currentAccount} />
		</>
	)
}

export default CardLeasedIn
