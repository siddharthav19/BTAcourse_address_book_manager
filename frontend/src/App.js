import { useState, useEffect } from "react";
import ABI from "./contracts/ABI.json";
import { ethers } from "ethers";
import RegisterENS from "./components/RegisterENS";
import QueryAddresses from "./components/QueryAddresses";
import AddressExistance from "./components/AddressExistance";
function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const CONTRACT_ADDRESS = "0xc38E1657C4F215E011DE6c006799Aa5Da979bD4B";
      const contractABI = ABI.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const acc = await ethereum.request({
            method: "eth_requestAccounts",
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            contractABI,
            signer
          );
          setAccount(acc);
          setState({
            signer,
            provider,
            contract,
          });
        } else {
          alert("please install MetaMask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  console.log(state);
  return (
    <>
      <p style={{ textAlign: "center", marginTop: "28px" }}>
        <p> Account connected to : </p>
        {account}
      </p>
      <RegisterENS state={state} />
      <QueryAddresses state={state} />
      <AddressExistance state={state} />
      {/* <ENSRegistraryCheck provider={state} /> */}
    </>
  );
}

export default App;
