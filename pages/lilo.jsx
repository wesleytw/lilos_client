import React, {useState} from 'react'
import { Nav, Footer } from "../components";

const lilo = () => {
  const [currentAccount, setCurrentAccount] = useState("");

  return (
    <>
			<Nav currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} />
      <div className='px-64 py-20'>
        <img src="https://i.imgur.com/P2wG6LO.png"></img>
      </div>
      <Footer />
    </>
  )
}

export default lilo
