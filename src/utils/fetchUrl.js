import axios from 'axios'

const corsURL = 'https://cors-anywhere.herokuapp.com/';

export const fetchUrl = async (url) => {
  try {
    if (!url) {
      console.log("fetch err", url);
      return url

    } else if (url.includes("ipfs://")) {
      const ipfsGate = url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
      const fetchIt = await axios.get(`${corsURL}${ipfsGate}`, {})
      return fetchIt.data

    } else if (url.includes("base64")) {
      const base64 = url.replace(/^data:\w+\/\w+;base64,/, '')
      return JSON.parse(await decode(base64))

    } else {
      const corsURL = 'https://cors-anywhere.herokuapp.com/';
      const fetchIt = await axios.get(`${corsURL}${url}`, {})
      return fetchIt.data

    }
  } catch (error) {
    console.log("fetch err")
  }
}

export const resolveImg = async (img) => {
  try {
    if (!img) {
      console.log("fetch err", img);
      return img

    } else if (img.includes("ipfs://")) {
      const ipfsGate = img.replace("ipfs://", "https://gateway.ipfs.io/ipfs/")
      return ipfsGate

    } else {
      return img
    }
  } catch (error) {
    console.log("err")
  }
}

async function decode(url) {
  return Buffer.from(url, 'base64').toString('utf-8');
}
