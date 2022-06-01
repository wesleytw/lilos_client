import React from "react";
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import market from '../src/abi/Lilos_V1.json'
import erc721 from '../src/abi/ILOVENTHU.json'
import { marketAddress } from '../src/constant'
import { providerOptions } from "../src/prviderOptions";
// import { networkParams } from "./networks";
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});

const CardModal = ({ cardInfo }) => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  // console.log(signer)
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };
  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };
  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);


  async function leaseIn() {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketAddress, market.abi, signer)
    const totalValue = parseFloat(cardInfo.collateral_value) + parseFloat(cardInfo.rental_value)
    const msgValue = ethers.utils.parseUnits(totalValue.toString(), 'ether')
    // console.log(signer._isSigner)
    console.log("totalValue,totalValue",totalValue)
    console.log("msgValue",msgValue)
    const transaction = await marketContract.leaseIn(cardInfo.listingId, {
      value: msgValue
    })
    await transaction.wait()
  }

  return (
    <>
    {!account ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
      <input type="checkbox" id="my-modal-4" className="modal-toggle " />
      <label htmlFor="my-modal-4" className="modal cursor-pointer white-glassmorphism">
        <label className="modal-box relative h-5/6 w-11/12 max-w-5xl p-0 bg-white border-2 border-black rounded-3xl overflow-hidden " htmlFor="">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-primary btn-circle border-none text-white overflow-hidden hover:bg-secondary absolute right-4 top-4 ">
            ✕</label>
          <div className="flex h-full justify-center items-center overflow-hidden bg-[#e9dfdf8e] ">
            <div className=' w-2/5 bg-accent overflow-hidden object-cover '>
              <img className='object-cover' src={cardInfo?.image}></img>
            </div>
            <div className="h-[400px] w-3/5 p-16 overflow-scroll">
              <h1 className="text-3xl font-BADABB">{cardInfo?.name}</h1>
              <p className="py-4">You've been selected htmlFor a chance to get one year of subscription to use Wikipedia htmlFor free!</p>
              <p>{cardInfo?.collateral_value}</p>
              <p>{cardInfo?.tokenId}</p>
              <button className="btn text-white btn-primary btn-sm normal-case border-none justify-center hover:bg-secondary" onClick={()=>leaseIn()}>
                Lease In</button>
            </div>
          </div>
        </label>
      </label>
    </>
  )
};

export default CardModal;