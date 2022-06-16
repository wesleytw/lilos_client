import React, { useEffect, useState } from "react";
import { ModalNative } from "../components";
import { shortenAddress } from "../src/utils/shortenAddress";
import { fetchUrl, resolveImg } from '../src/utils/fetchUrl'
import { MdOutlineVerified } from "react-icons/md";
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import erc721 from '../src/abi/ILOVENTHU.json'
import { marketAddress } from '../src/constant'


const CardLeaseIn = ({ data, currentAccount }) => {
  const [nfts, setNfts] = useState([]);
  const [cardInfo, setcardInfo] = useState();
  useEffect(() => {
    if (!currentAccount) return
    fetchWeb3Items();
  }, [currentAccount])

  async function fetchWeb3Items() {
    const provider = new ethers.providers.InfuraProvider('rinkeby', "fed1ef26af5648de8dea5d37316687db");
    const marketContract = new ethers.Contract(marketAddress, market.abi, provider)
    const getItemsByLessor = await marketContract.getItemsByLessor(currentAccount)
    const items = await Promise.all(getItemsByLessor?.map(async i => {
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
				status: i.status,
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
			return item;
		}))
		setNfts(items)
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
			<div className="w-screen mt-0 pt-4 px-5 overflow-y-auto flex flex-wrap ">
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
											{/* <label htmlFor="my-modal-4" onClick={() => setcardInfo(nft)} className="btn btn-sm text-white btn-primary normal-case modal-button mb-1 border-none hover:bg-secondary">
												Lease In
											</label> */}
										</div>
									</div>
								</div>
								{/* </div> */}
							</div>
						</div>
					</div>
				))}
			</div>
			{/* <ModalMarket cardInfo={cardInfo} currentAccount={currentAccount} /> */}
		</>
	)

//   return (
//     <>
//       <div className="w-screen mt-12 pt-12 px-5 overflow-y-auto flex flex-wrap ">
//         {data && data.result.map(nft => (
//           <div key={`${nft.token_id} ${nft.token_address}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
//             <div className="w-full m-auto">
//               <div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-2xl items-center border-[1px] border-slate-200">
//                 <div className="card-wrap relative m-auto outline-none " >
//                   <div className="h-full py-3 flex flex-col">
//                     <div className="text-center px-2">
//                       <div className="flex justify-center ">
//                         <p className="  text-black text-xl font-bold truncate">
//                           {`${nft.name}`}
//                         </p>
//                         {verifyCollection(nft.token_address) &&
//                           <div>
//                             <MdOutlineVerified title="Verified Collection👌" fontSize={15} color="#000" />
//                           </div>
//                         }
//                       </div>
//                       <p className="text-black text-l truncate">
//                         #{`${nft.token_id}`}
//                       </p>
//                     </div>
//                     {/* <div className="max-full m-8 mb-16 rounded-lg shadow-lg items-center"> */}
//                     <img className="object-contain w-full h-48 " src={nft.image} alt={nft.name} />
//                     <div className="px-6 py-4 ">
//                       {/* <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800 break-words truncate">{`${nft.name}`} </h4> */}
//                       <p className="leading-normal text-gray-700 flex-wrap truncate">{`${shortenAddress(nft.owner_of)}`}</p>
//                     </div>
//                   </div>
//                   <div className="px-6 relative mt-1">
//                     <div className="flex justify-end md:items-baseline">
//                       <label htmlFor="my-modal-4" onClick={() => setcardInfo(nft)} className="btn btn-sm text-white btn-primary normal-case modal-button mb-1 border-none hover:btn-secondary">
//                         View
//  											</label>
//                     </div>
//                   </div>
//                 </div>
//                 {/* </div> */}
//               </div>
//             </div>
//           </div>
//         ))}
//         {data && console.log(data.result)}
//       </div>
//       <ModalNative cardInfo={cardInfo} currentAccount={currentAccount} />
//     </>
//   )
}

export default CardLeaseIn