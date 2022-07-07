import '../styles/globals.css'
import { MoralisProvider } from "react-moralis";
import { Layout } from '../components'

function MyApp({ Component, pageProps }) {
  return (
    < MoralisProvider serverUrl="https://bdyir3ngauv6.usemoralis.com:2053/server" appId="ut3Icy6uM55LLdHwrW0q2dCrtLqyJYkjCHbGxoJu">
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </MoralisProvider>
  )
}

export default MyApp