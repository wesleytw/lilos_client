import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";


function MyApp({ Component, pageProps }) {
  return (
    < MoralisProvider serverUrl="https://piwhmoitousi.usemoralis.com:2053/server" appId="CAj0GwMIlqrbHbzDUw8SurLsCAn3BGOXI2DKTThX">
      <Component {...pageProps} />
    </MoralisProvider>
  )
}

export default MyApp