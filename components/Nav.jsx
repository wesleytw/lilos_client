import React, { useEffect, useState } from "react";
// import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import Link from 'next/link'

import { shortenAddress } from "../src/utils/shortenAddress";

const Nav = ({ currentAccount, setCurrentAccount }) => {
	/////web3 state
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;
		if (!ethereum) {
			console.log("Make sure you have metamask!");
			return;
		} else {
			console.log("We have the ethereum object", ethereum);
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log("Found an authorized account:", account);
			setCurrentAccount(account);
		} else {
			console.log("No connected account found");
		}

		let chainId = await ethereum.request({ method: 'eth_chainId' });
		console.log("Connected to chain " + chainId);
		const rinkebyChainId = "0x4";
		if (chainId !== rinkebyChainId) {
			alert("You are not connected to the Rinkeby Test Network!");
		}
	}
	const connectWallet = async () => {
		try {
			const { ethereum } = window;
			if (!ethereum) {
				alert("Get MetaMask!");
				return;
			}
			const accounts = await ethereum.request({ method: "eth_requestAccounts" });
			console.log("Connected", accounts[0]);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log("error", error.message);
		}
	}

	useEffect(() => {
		checkIfWalletIsConnected();
	}, [])
	///////web3 state

	return (
		<div className="navbar sticky top-0 left-0 right-0 z-50 h-[4rem] bg-[#fff] border-b-[1px] border-[#eaebed] px-6 py-4">
			<div className="navbar-start">
				<Link href="/" >
					<a className="btn btn-ghost normal-case text-[44px] font-PlasticBeach ">
						LILOS</a>
				</Link>
				{/* hambergur */}
				<div className="dropdown">
					<label tabIndex="0" className="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroklinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
					</label>
					<ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
						<Link href="/market" >
							<li><a>Market</a></li></Link>
						<Link href="/account" >
							<li><a>Account</a></li></Link>
						<Link href="/demo" >
							<li><a>Demo</a></li></Link>
						<li tabIndex="0">
							<a className="justify-between">
								Parent
            		<svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
							</a>
							<ul className="p-2 bg-white shadow">
								<li><a>Submenu 1</a></li>
								<li><a>Submenu 2</a></li>
							</ul>
						</li>
					</ul>
				</div>
				{/* hambergur */}
			</div>
			<div className="navbar-center hidden lg:flex font-BADABB text-xl tracking-widest" >
				<ul className="menu menu-horizontal p-0">
					<Link href="/market" >
						<li><a>Market</a></li></Link>
					<Link href="/account" >
						<li><a>Account</a></li></Link>
					<Link href="/demo" >
						<li><a>Demo</a></li></Link>
					<li tabIndex="0">
						<a>
							Parent
          <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
						</a>
						<ul className="p-2 bg-white shadow-sm">
							<li><a>Submenu 1</a></li>
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
				</ul>
			</div>

			{/* web3 state */}
			{currentAccount === "" ? (
				<div className="navbar-end">
					<button onClick={connectWallet} className="btn text-white btn-primary border-none rounded-xl px-3 py-1 mr-2 text-lg justify-center hover:bg-secondary font-BADABB tracking-[5px]">
						connect</button>
				</div>
			) : (
				<div className="navbar-end">
					<p>{shortenAddress(currentAccount)}</p>
				</div>
			)}
			{/* web3 state */}
		</div>
	)
}

export default Nav
