import React, { useEffect, useState } from "react";
import { ethers } from 'ethers'
import axios from 'axios'
import { useMoralis, useMoralisWeb3Api, useMoralisWeb3ApiCall, useNFTBalances } from "react-moralis";
// import {ABI} from "../src/utils/abi.json";

const GetAddressBalanceOfUSDT = () => {
	const { account, isAuthenticated, authenticate, isAuthenticating, logout, user, isInitialized } = useMoralis();
	const { native } = useMoralisWeb3Api();
	const [nftData, setNftData] = useState([]);
	const [nftImg, setNftImg] = useState([]);
	const [nfts, setNfts] = useState([]);


	// const ABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}]; // Add ABI of 0xdAC17F958D2ee523a2206206994597C13D831ec7
	// const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":false,"internalType":"address","name":"lessor","type":"address"}],"name":"Delisted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"lessor","type":"address"},{"indexed":true,"internalType":"address","name":"lessee","type":"address"},{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral_value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rent_value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_term","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"name":"Leased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":true,"internalType":"address","name":"lessor","type":"address"},{"indexed":true,"internalType":"address","name":"lessee","type":"address"},{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral_value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_term","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_end_date","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"Liquidated_date","type":"uint256"}],"name":"Liquidated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":false,"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"indexed":true,"internalType":"address","name":"lessor","type":"address"},{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral_value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rent_value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_term","type":"uint256"}],"name":"Listed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"listingId","type":"uint256"},{"indexed":false,"internalType":"address","name":"lessor","type":"address"},{"indexed":true,"internalType":"address","name":"lessee","type":"address"},{"indexed":true,"internalType":"address","name":"repayer","type":"address"},{"indexed":false,"internalType":"address","name":"collection","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"collateral_value","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_term","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"name":"Repayed","type":"event"},{"inputs":[{"internalType":"uint256","name":"listingId_","type":"uint256"}],"name":"delist","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getActiveItems","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAllItems","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId_","type":"uint256"}],"name":"getIsExpiredByListingId","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"collection_","type":"address"},{"internalType":"uint256","name":"tokenId_","type":"uint256"}],"name":"getItemByCollctionAndTokenId","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId_","type":"uint256"}],"name":"getItemByListingId","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"lessee_","type":"address"}],"name":"getItemsByLessee","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"lessor_","type":"address"}],"name":"getItemsByLessor","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getLeasedItems","outputs":[{"components":[{"internalType":"enum Lilos_V1.ListingStatus","name":"status","type":"uint8"},{"internalType":"address","name":"lessor","type":"address"},{"internalType":"address","name":"lessee","type":"address"},{"internalType":"address","name":"collection","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"collateral_value","type":"uint256"},{"internalType":"uint256","name":"rent_value","type":"uint256"},{"internalType":"uint256","name":"lease_term","type":"uint256"},{"internalType":"uint256","name":"lease_start_date","type":"uint256"},{"internalType":"uint256","name":"lease_end_date","type":"uint256"}],"internalType":"struct Lilos_V1.ListingItem[]","name":"","type":"tuple[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getListingTotal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"isTokenListed","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId_","type":"uint256"}],"name":"leaseIn","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId_","type":"uint256"}],"name":"liquidate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"collection_","type":"address"},{"internalType":"uint256","name":"tokenId_","type":"uint256"},{"internalType":"uint256","name":"collateral_value_","type":"uint256"},{"internalType":"uint256","name":"rent_value_","type":"uint256"},{"internalType":"uint256","name":"lease_term_","type":"uint256"}],"name":"listToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"listingId_","type":"uint256"}],"name":"repay","outputs":[],"stateMutability":"nonpayable","type":"function"}];
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
		fetchWeb3Items();
		console.log(web3Data);
	}, [isInitialized])
	// useEffect(() => {
	// 	fetchImage();
	// 	fetchWeb3Items();
	// 	console.log(onSuccess);
	// }, [onSuccess])
	useEffect(() => {
		fetchWeb3Items();
		console.log("web3Data", web3Data);
	}, [web3Data])
	async function fetchWeb3Items() {
		setNftData(await fetch({ params: options }))
		if (!web3Data) { return }
		console.log(web3Data);
		const items = await Promise.all(web3Data?.map(async i => {
			// const meta = await axios.get(tokenUri)
			// let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
			// let nftImage = await fetchImage("0xf39E86EAf59077e3977496eA3c0352891DDa4037","0x3BED33Dab84a9415198D3FdB452e94829E16c1b6", "5");
			console.log("uu");
			await fetchImage(i[1].toString(), i[3].toString(), i[4].toString());
			let firstFetch = true
			let check = async function () {
				console.log("no nftBalance");
				setTimeout(function () {
					if (nftBalance === null) {
						console.log(firstFetch);
						if (firstFetch){
							fetchImage(i[1].toString(), i[3].toString(), i[4].toString());
							firstFetch = false;
						}
						check();
					} else {
						console.log("has nftBalance", nftBalance);
						// console.log(nftBalance.result[0].image);
					}
				}, 5500);
			};
			// while (nftBalance === null){
			// await check();
			// }
			console.log("uu", nftBalance);
			console.log("uyu");
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
			console.log("defineNFTed");
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
		console.log("fetchImage")
		getNFTBalances({
			params: {
				chain: "rinkeby",
				address: owner,
				token_addresses: collection,
				token_id: tokenId
			}
		});
		// console.log("fetching Image")
		// let check = function () {
		// 	setTimeout(function () {
		// 	if (nftBalance === null) {
		// 		console.log("no nftBalance");
		// 		// getNFTBalances({
		// 		// 	params: {
		// 		// 		chain: "rinkeby",
		// 		// 		address: owner,
		// 		// 		token_addresses: collection,
		// 		// 		token_id: tokenId
		// 		// 	}
		// 		// });
		// 		check();
		// 	} else {
		// 		console.log("has nftBalance", nftBalance);
		// 		// console.log(nftBalance.result[0].image);
		// 	}
		// }, 50000);
		// };
		// check();

		// }
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