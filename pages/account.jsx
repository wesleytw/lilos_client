import React, { useEffect, useState } from "react";
import Head from "next/head"
// import { useNFTBalances } from "react-moralis";
import { Nav, CardNative, CardLeasedIn, CardLeasedOut, Footer } from "../components";

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

			<div className=' py-2 flex items-center justify-center w-full fixed top-15 z-40'>
				<div className=" flex justify-center items-center sticky top-0 py-2  bg-black rounded-lg">
					<button className={"btn mx-2 font-BADABB text-xl tracking-widest "
						+ (tabState == "native" ? ' ' : ' btn-primary hover:btn-accent')}
						onClick={() => setTabState("native")}>
						native balance</button>
					<button className={"btn mx-4 font-BADABB text-xl tracking-widest "
						+ (tabState == "leasedIn" ? ' ' : ' btn-primary hover:btn-accent')}
						onClick={() => setTabState("leasedIn")}>
						lease-in asset</button>
					<button className={"btn mx-2 font-BADABB text-xl tracking-widest "
						+ (tabState == "leasedOut" ? ' ' : ' btn-primary hover:btn-accent')}
						onClick={() => setTabState("leasedOut")}>
						lease-out asset</button>
				</div>
			</div>
			{tabState == "native" && <CardNative currentAccount={currentAccount} />}
			{tabState == "leasedIn" && <CardLeasedIn currentAccount={currentAccount} />}
			{tabState == "leasedOut" && <CardLeasedOut currentAccount={currentAccount} />}

			<Footer />
		</>
	)
}

export default Account