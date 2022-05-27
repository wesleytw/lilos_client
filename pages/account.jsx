import Head from "next/head"
import { shortenAddress } from "../src/utils/shortenAddress";
import { useMoralis, useNFTBalances, useWeb3ExecuteFunction } from "react-moralis";
import React, { useEffect, useState } from "react";
import { Nav } from "../components";
import { MdOutlineVerified } from "react-icons/md";

const Account = () => {
	const { Moralis } = useMoralis();
	const { contractProcessor } = useWeb3ExecuteFunction();
	const { account, isAuthenticated, authenticate, isAuthenticating, logout, user } = useMoralis();
	const { getNFTBalances, data } = useNFTBalances();

	useEffect(() => {
		console.log('isAuthenticated?', isAuthenticated)
		if (!isAuthenticated) return
		getNFTBalances({
			params: {
				chain: "rinkeby",
				address: user.get('ethAddress')
			}
		})
	}, [isAuthenticated])

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
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Nav />
			<div className="w-screen mt-0 pt-40 px-5 overflow-y-auto flex flex-wrap ">
				{data && data.result.map(nft => (
					<div key={`${nft.token_id} ${nft.token_address}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
						<div className="w-full m-auto">
							<div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-lg items-center border-[1px] border-slate-200">
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
									<img className="object-contain w-full h-48" src={nft.image} alt={nft.name} />
									<div className="px-6 py-4 ">
										<p className="leading-normal text-gray-700 flex-wrap truncate">{`${shortenAddress(nft.owner_of)}`}</p>
									</div>
								</div>
								<div className="px-6 relative mt-1">
									<div className="block">
										<p className="text-gray-800 text-xs">
											On sale</p>
										<div className="text-gray-700 text-2xl">
											<div className="flex items-baseline space-x-1">
												<div className="truncate">
													6.9 Ⓝ</div>
												<div className="text-xs text-gray-500 truncate">
													~ $83.15</div>
											</div>
										</div>
									</div>
									<div className="flex justify-between md:items-baseline">
										<p className="font-bold text-white cursor-pointer hover:opacity-80 text-base md:text-base mb-1 md:mb-0">
											Buy Now</p>
										<a className="text-gray-500 underline text-sm md:text-sm" href="/token/x.paras.near::145332">
											See Details</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					// </div>
				))}
				{data && console.log(data.result)}
			</div>
		</>
	)
}

export default Account


///////////////////////////
///////////////////////////

// import { shortenAddress } from "../src/utils/shortenAddress";
// import { useMoralis, useNFTBalances } from "react-moralis";
// import React, { useEffect, useState } from "react";
// import { Navbar, Nav } from "../components";

// const Account = () => {
//   const style = {
//     cardWapper: 'transition: transform 0.6s ease 0.1s; transform-style: preserve-3d; width: 224.36px; height: 312px;'
//   }
//   const { account, isAuthenticated, authenticate, isAuthenticating, logout, user } = useMoralis();
//   const { getNFTBalances, data } = useNFTBalances();

//   useEffect(() => {
//     console.log('isAuthenticated?', isAuthenticated)
//     if (!isAuthenticated) return
//     getNFTBalances({
//       params: {
//         chain: "rinkeby",
//         address: user.get('ethAddress')
//       }
//     })
//   }, [isAuthenticated])
//   return (
//     <>
//       {/* px-28 pt-28 md:px-56 md:py-8 lg:px-96 lg:py-16 */}
//       {/* bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer */}
//       <Nav />
//       <div className="w-screen mt-0 pt-40 px-5 overflow-y-auto flex flex-wrap select-none ">
//         {data && data.result.map(nft => (
//           <div key={`${nft.token_id} ${nft.token_address}`} className="w-full md:w-1/3 lg:w-1/4 p-4 flex-shrink-0 relative">
//             <div className="w-full m-auto">
//               <div className="max-full bg-white m-1 mb-16 rounded-3xl hover:shadow-lg items-center border-2 border-slate-400">
//                 <div className="card-wrap relative select-none m-auto outline-none" >
//                   <div className="h-full py-3 flex flex-col">
//                     <div className="text-center px-2">
//                       <p className="text-black text-xl font-bold truncate">
//                         {`${nft.name}`}
//                       </p>
//                       <p className="text-black text-l truncate">
//                         #{`${nft.token_id}`}
//                       </p>
//                     </div>
//                     {/* <div className="max-full m-8 mb-16 rounded-lg shadow-lg items-center"> */}
//                     {nft.image && <img className=" object-contain w-full h-48 rounded" src={nft.image} alt={nft.name} />}
//                     <div className="px-6 py-4 ">
//                       {/* <h4 className="mb-3 text-xl font-semibold tracking-tight text-gray-800 break-words truncate">{`${nft.name}`} </h4> */}
//                       <p className="leading-normal text-gray-700 flex-wrap truncate">{`${shortenAddress(nft.owner_of)}`}</p>
//                     </div>
//                   </div>
//                   <div className="px-6 relative mt-1">
//                     <div className="block">
//                       <p className="text-gray-800 text-xs">
//                         On sale
//                         </p>
//                       <div className="text-gray-700 text-2xl">
//                         <div className="flex items-baseline space-x-1">
//                           <div className="truncate">
//                             6.9 Ⓝ
//                           </div>
//                           <div className="text-xs text-gray-500 truncate">
//                             ~ $83.15
//                         </div></div></div></div>
//                     <div className="flex justify-between md:items-baseline">
//                       <p className="font-bold text-white cursor-pointer hover:opacity-80 text-base md:text-base mb-1 md:mb-0">
//                         Buy Now</p>
//                       <a className="text-gray-500 underline text-sm md:text-sm" href="/token/x.paras.near::145332">See Details</a></div></div>
//                 </div>
//                 {/* </div> */}
//               </div>
//             </div>
//           </div>
//         ))}
//         {data && console.log(data.result)}
//       </div>

//     </>
//   )


// }

// export default Account



////////////////////////////////////////////
//old method fail for object mapping (image)
////////////////////////////////////////////

// import { shortenAddress } from "../src/utils/shortenAddress";
// import { useMoralis, useNFTBalances } from "react-moralis";
// import React, { useEffect, useState } from "react";
// import { useMoralisWeb3Api } from "react-moralis";
// import { Navbar } from "../components"



// const Account = () => {
//   const [NFTs, setNFTs] = useState([]);
//   const [nftJ, setNftJ] = useState([]);
//   const Web3Api = useMoralisWeb3Api();
//   const { account, isAuthenticated, authenticate, isAuthenticating, logout, user } = useMoralis();
// //GOOOOOD
//   const fetchNFTs = async (setNFTs) => {
//     console.log("fetchNFTs...");
//     const userNFTs = await Web3Api.Web3API.account.getNFTs({
//       chain: "rinkeby",
//       address: user.get("ethAddress"),
//     });
//     console.log(userNFTs.result);
//     setNFTs(userNFTs)
//   };
// //GOOOOOD
//   useEffect(() => {
//     console.log('isAuthenticated?', isAuthenticated)
//     if (!isAuthenticated) return
//     fetchNFTs(setNFTs) //把setData當參數傳出去給async
//   }, [isAuthenticated])
// ///test
// // NFTs.result.forEach( e => {
// //   let url = e.token_uri;
// //   console.log('url', url);
// //   fetch(url)
// //   .then(response => response.json())
// //   .then((data) => (
// ///test
//   return (
//     <>
//       <Navbar />
//       <div className="bg-slate-500 pt-16 pb-10">
//         <p>dd</p>
//       </div>
// {/* GOOOOOD */}
//        {/* {NFTs.result && NFTs.result.map(nft => (
//           <div>
//             <p>{nft.token_address}</p>
//             <p>{nft.name}</p>
//             <p>{nft.image}</p>
//             <img width="100" height="100" src={`${ nft.image }`} /> */}

//             {/* {nft.image && 
//             <img width="100" height="100" src={`${String( nft.image )}`} />
//             } */}
//                       {/* <img width="100" height="100" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHByZXNlcnZlQXNwZWN0UmF0aW89J3hNaW5ZTWluIG1lZXQnIHZpZXdCb3g9JzAgMCAzNTAgMzUwJz48c3R5bGU+LmJhc2UgeyBmaWxsOiB3aGl0ZTsgZm9udC1mYW1pbHk6IHNlcmlmOyBmb250LXNpemU6IDI0cHg7IH08L3N0eWxlPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9J2dyZWVuJy8+PHRleHQgeD0nNTAlJyB5PSc1MCUnIGNsYXNzPSdiYXNlJyBkb21pbmFudC1iYXNlbGluZT0nbWlkZGxlJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJz5zd2FyZHllbGxvd0NoaW5hPC90ZXh0Pjwvc3ZnPg==" /> */}

//             {/* {nft.image && <img src="${nft.image}" />} */}
//           {/* </div> */}
//          {/* ))}   */}
// {/* GOOOOOD */}    

// {/* ///test/// */}

//           {NFTs.result && 
//           NFTs.result.forEach( e => {
//             let url = e.token_uri;
//             // console.log('url', url);
//             fetch(url)
//             .then(response => response.json())
//             .then((dataObj) => {
//               if (!Array.isArray(dataObj)) {console.log( 'results are not array')}
//               Object.keys(dataObj).map((obj, i) => {
//                 return(
//                 // <div className="mt-16 bg-[#000]">
//                 //   {/* <p>{nft.token_address}</p>
//                   <p>{dataObj[obj].name}</p>
//                 //   <p>{nft.image}</p>
//                 //   <img width="100" height="100" src={ nft.image } /> */}
//                 //   {/* <p>{data.token_address}</p> */}
//                 //   <p>{data.name}</p>
//                 //   <p>{data.description}</p>
//                 //   <p>{data.image}</p>
//                 //   <img width="400" height="400" src={ data.image } />

//                 // </div>
//               // ))
//               // console.log('data', data)
//               // if (!Array.isArray(data)) {console.log( 'results are not array')}
//               // setNftJ(data)
//               )})
//             })
//           })}

//           {/* {nftJ && nftJ.map((nft) => {

//           <div>
//           <p>{nft.token_address}</p>
//           <p>{nft.name}</p>
//           <p>{nft.image}</p>
//           <img width="100" height="100" src={`${ nft.image }`} /> 


//           </div>
//           })
//           } */}
// {/* // //test/// */}




//       {/* ) */}
//       </>
//       ) 


// }

// export default Account

// // const Account =  () =>{
// //   const { account, isAuthenticated, authenticate, isAuthenticating, logout, user } = useMoralis();
// //   const {  getNFTBalances, data } = useNFTBalances();
// //   const { data: NFTBalances } = useNFTBalances();
// //   const Web3Api = useMoralisWeb3Api();
// //   // useEffect(()=>{
// //   //   getNFTBalances({
// //   //     params: {
// //   //       chain: "rinkeby",
// //   //       address: user.get("ethAddress")
// //   //     }
// //   //   })
// //   // },[])

// //   // get all NFTs in the collection
// //   // useEffect(() => {
// //   //   (async () => {
// //   //     const nfts = await Web3Api.Web3API.account.getNFTs({
// //   //       chain: "rinkeby",
// //   //       address: user.get("ethAddress"),
// //   //     });
// //   //     setNfts(nfts)
// //   //   })()
// //   // }, [])


// // //   const fetchNFTs = async () => {
// // //     const NFTs = await Web3Api.Web3API.account.getNFTs({
// // //       chain: "rinkeby",
// // //       address: user.get("ethAddress"),
// // //     });
// // //     console.log(NFTs.result);
// // //     return NFTs;
// // //   };
// //   // const NFTs = fetchNFTs();

// //   // console.log("NFTBalances", NFTBalances);
// //   return (
// //     <div>
// //       {isAuthenticated && (
// //         <div>
// //           <div className=" mx-auto bg-[#ad3a3a] mt-0 md:mt-0 h-screen px-4 py-40">
// //             <h1>Account</h1>
// //             <p className="bg-white px-4">
// //               {shortenAddress(user.get("ethAddress"))}
// //             </p>
// //             <button onClick={fetchNFTs} className="bg-[#2952e3] text-sm py-2 px-4 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] shadow text-white">
// //               show
// //             </button>

// //             {/* <div className="flex flex-wrap ">
// //               {nfts.map((nftItem, id) => (
// //                 <NFTCard
// //                   key={id}
// //                   nftItem={nftItem}
// //                   title={collection?.title}
// //                   listings={listings}
// //                 />
// //               ))}
// //             </div> */}
// //             <p>
// //               {/* { NFTBalances } */}
// //             </p>
// //           </div>
// //           <div className=" mx-auto bg-[#ad3a3a] mt-0 md:mt-0 h-screen py-20">
// //             <h1>Account</h1>
// //           </div>
// //         </div>
// //       )} 
// //     </div>
// //   );
// // }
// // export default Account;

