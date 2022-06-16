import React, { useEffect, useState } from "react";
import Head from "next/head"
// import { useNFTBalances } from "react-moralis";
import { Nav, CardNative, CardLeaseIn, Footer } from "../components";

const Account = () => {
	// const { getNFTBalances, data } = useNFTBalances();
	const [currentAccount, setCurrentAccount] = useState("");
	const [tabState, setTabState] = useState("native"); //native, leasedIn, leasedOut


	return (
		<>
			<Head>
				<title>Account</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			{/* px-28 pt-28 md:px-56 md:py-8 lg:px-96 lg:py-16 */}
			{/* bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer */}
			<Nav currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} />

			<div className="w-full fixed flex justify-center items-center p-2 mb-96 z-40 bg-black">
				<button className={"btn mx-4 font-BADABB text-xl tracking-widest "
					+ (tabState == "native" ? ' ' : ' btn-primary hover:btn-accent')}
					onClick={() => setTabState("native")}>
					native balance</button>
				<button className={"btn mx-4 font-BADABB text-xl tracking-widest "
					+ (tabState == "leasedIn" ? ' ' : ' btn-primary hover:btn-accent')}
					onClick={() => setTabState("leasedIn")}>
					lease-in asset</button>
				<button className={"btn mx-4 font-BADABB text-xl tracking-widest "
					+ (tabState == "leasedOut" ? ' ' : ' btn-primary hover:btn-accent')}
					onClick={() => setTabState("leasedOut")}>
					lease-out asset</button>
			</div>
			{tabState == "native" && <CardNative currentAccount={currentAccount} />}
			{tabState == "leasedIn" && <CardLeaseIn currentAccount={currentAccount} />}
			<Footer />
		</>
	)
}

export default Account