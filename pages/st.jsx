import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useNFTBalances } from "react-moralis";

const GetAddressBalanceOfUSDT = () => {
	const { account, isAuthenticated, authenticate, isAuthenticating, logout, user } = useMoralis();
	const { native } = useMoralisWeb3Api();
	const [nftData, setNftData] = useState([]);
	const [nftImg, setNftImg] = useState([]);
	const [nfts, setNfts] = useState([]);

  const ABI = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "listingId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "lessor", "type": "address" }], "name": "Delisted", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "lessor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "lessee", "type": "address" }, { "indexed": false, "internalType": "address", "name": "collection", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "name": "Leased", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "lessor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "lessee", "type": "address" }, { "indexed": false, "internalType": "address", "name": "collection", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "Liquidated_date", "type": "uint256" }], "name": "Liquidated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" }, { "indexed": false, "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "indexed": true, "internalType": "address", "name": "lessor", "type": "address" }, { "indexed": false, "internalType": "address", "name": "collection", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_term", "type": "uint256" }], "name": "Listed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "lessor", "type": "address" }, { "indexed": true, "internalType": "address", "name": "lessee", "type": "address" }, { "indexed": true, "internalType": "address", "name": "repayer", "type": "address" }, { "indexed": false, "internalType": "address", "name": "collection", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "name": "Repayed", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "listingId_", "type": "uint256" }], "name": "delist", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getActiveItems", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getAllItems", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "listingId_", "type": "uint256" }], "name": "getIsExpiredByListingId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "collection_", "type": "address" }, { "internalType": "uint256", "name": "tokenId_", "type": "uint256" }], "name": "getItemByCollctionAndTokenId", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "listingId_", "type": "uint256" }], "name": "getItemByListingId", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem", "name": "", "type": "tuple" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "lessee_", "type": "address" }], "name": "getItemsByLessee", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "lessor_", "type": "address" }], "name": "getItemsByLessor", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getLeasedItems", "outputs": [{ "components": [{ "internalType": "enum Lilos_V1.ListingStatus", "name": "status", "type": "uint8" }, { "internalType": "address", "name": "lessor", "type": "address" }, { "internalType": "address", "name": "lessee", "type": "address" }, { "internalType": "address", "name": "collection", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term", "type": "uint256" }, { "internalType": "uint256", "name": "lease_start_date", "type": "uint256" }, { "internalType": "uint256", "name": "lease_end_date", "type": "uint256" }], "internalType": "struct Lilos_V1.ListingItem[]", "name": "", "type": "tuple[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getListingId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "listingId_", "type": "uint256" }], "name": "leaseIn", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "listingId_", "type": "uint256" }], "name": "liquidate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "collection_", "type": "address" }, { "internalType": "uint256", "name": "tokenId_", "type": "uint256" }, { "internalType": "uint256", "name": "collateral_value_", "type": "uint256" }, { "internalType": "uint256", "name": "rental_value_", "type": "uint256" }, { "internalType": "uint256", "name": "lease_term_", "type": "uint256" }], "name": "listToken", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "listingId_", "type": "uint256" }], "name": "repay", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
	const options = {
		chain: "rinkeby",
		address: "0x3410f88bB677b237F563432EE6e3444f04287C26",
		function_name: "getActiveItems",
		abi: ABI,
		params: {},
	};
	const { getNFTBalances, data: nftBalance } = useNFTBalances();
	const { fetch, data: web3Data, error, isLoading, onSuccess } = useMoralisWeb3ApiCall(
		native.runContractFunction,
		{ ...options }
	);
	useEffect(() => {
		fetch({ params: options })
		console.log(web3Data);
	}, [isLoading])
	useEffect(() => {
		fetchImage();
		fetchWeb3Items();
		console.log(onSuccess);
	}, [web3Data])
	async function fetchWeb3Items() {
		if (!web3Data) { return }
		console.log(web3Data);
		const items = await Promise.all(web3Data?.map(async i => {
			// const meta = await axios.get(tokenUri)
			// let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
			// let nftImage = await fetchImage("0xf39E86EAf59077e3977496eA3c0352891DDa4037","0x3BED33Dab84a9415198D3FdB452e94829E16c1b6", "5");
			console.log("uu");
			await fetchImage(i[1].toString(), i[3].toString(), i[4].toString());
			console.log("uu", nftBalance);
			let item = {
				status: i[0],
				lessor: i[1],
				lessee: i[2],
				collection: i[3],
				tokenId: i[4],
				image: nftBalance?.result[0].image,
				collateral_value: i[5],
				rental_value: i[6],
				lease_term: i[7],
				lease_start_date: i[8],
				lease_end_date: i[9]
			}
			console.log("NFT set");
			return item;

			// {
			// 	nftBalance &&
			// 	console.log(nftBalance.result[0].image);
			// }
		}))
		setNfts(items)
	}

	async function fetchImage(owner, collection, tokenId) {
		//getNFTBalances is not async so await is not working.
		getNFTBalances({
			params: {
				chain: "rinkeby",
				address: owner,
				token_addresses: collection,
				token_id: tokenId
			}
		});
		let check = function () {
			setTimeout(function () {
				if (nftBalance === null) {
					console.log("no nftBalance");
					// getNFTBalances({
					// 	params: {
					// 		chain: "rinkeby",
					// 		address: owner,
					// 		token_addresses: collection,
					// 		token_id: tokenId
					// 	}
					// });
					check();
				} else {
					console.log("has nftBalance");
					console.log(nftBalance.result[0].image);
				}
			}, 500);
		};
		// check();

		// }
		// console.log(nftBalance.result[0].image);
		// {nftBalance && 
		// console.log(nftBalance.result[0].image);
		// // return nftBalance.result[0].image;
		// }
		// return nftBalance.result[0].image;
	};

	return (
		// Use your custom error component to show errors
		<div style={{ height: "100vh", overflow: "auto" }}>
			<div>
				{/* {error && <ErrorMessage error={error} />} */}
				<button className="btn"
					onClick={() => { fetchWeb3Items() }}
				// onClick={() => { fetchImage("0xf39E86EAf59077e3977496eA3c0352891DDa4037","0x3BED33Dab84a9415198D3FdB452e94829E16c1b6", "5") }}
				>
					Fetch data
        </button>
				<button className="btn"
					onClick={() => { fetchImage("0xf39E86EAf59077e3977496eA3c0352891DDa4037", "0x3BED33Dab84a9415198D3FdB452e94829E16c1b6", "5") }}
				>
					Fetch img
        </button>
				{web3Data && <pre>{JSON.stringify(web3Data)}</pre>}
			</div>
			<div className="flex justify-center">
				<div className="px-4" style={{ maxWidth: '1600px' }}>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
						{nfts && nfts.map((nft, i) => (
							<div key={i} className="border shadow rounded-xl overflow-hidden">
								{/* {fetchImage(nft.lessor, nft.collection, nft.tokenId) && <img src={fetchImage(nft.lessor, nft.collection, nft.tokenId)} /> */}
								{/* } */}
								<div className="p-4">
									<p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.image}</p>
									<div style={{ height: '70px', overflow: 'hidden' }}>
										<p className="text-gray-400">{nft.tokenId}</p>
									</div>
								</div>
								<div className="p-4 bg-black">
									<p className="text-2xl font-bold text-white">ETH {nft.lessor} ETH</p>
									<button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNft(nft)}>Buy</button>
								</div>
							</div>
						))
						}
						{nfts && console.log(nfts)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default GetAddressBalanceOfUSDT