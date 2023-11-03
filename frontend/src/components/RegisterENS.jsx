import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
const RegisterENS = ({ state }) => {
     const localProvider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/75d663b6e35b4a0389b6ae126d3a53e4')

     const { contract } = state
     const [ENS, setENS] = useState("")
     const [preferred, setPreferred] = useState(0);
     const [boolVal, setBoolVal] = useState(false);
     const [ENSnotFound, setENSnotFound] = useState("");
     const storeENS = async (e) => {
          e.preventDefault()
          console.log(ENS, preferred)
          const addressResolved = await localProvider.resolveName(ENS);
          console.log(addressResolved, "  x");
          if (addressResolved === null) {
               console.log('The Given ENS Doesnot exists in the real world');
               setENSnotFound(`${ENS} not exists/registered in the real world`);
               return;
          }
          const transaction = await contract.addEntry(ENS, preferred);
          await transaction.wait()
          console.log('Entry added')
     }
     // return (
     //      <form onSubmit={storeENS}>
     //           <div>
     //                <label htmlFor='ENS_str'>ENS</label>
     //                <input type='text' id='ENS_str' onChange={(e) => setENS(e.target.value)}></input>
     //           </div>
     //           <div>
     //                <input id='yes' type='checkbox' onClick={() => setPreferred(1 - preferred)}></input>
     //                <label htmlFor='yes' >preferred EOA address</label>

     //           </div>
     //           <button type='submit' disabled={ENS.length === 0}>Register</button>
     //      </form>
     // )

     useEffect(() => {
          if (contract) {
               const eventFilter = contract.filters.entryAdded(null);
               const eventListener = (message) => {
                    setBoolVal(true);
                    setTimeout(() => {
                         setBoolVal(false);
                    }, 5000)
                    console.log(`Message - ${message}`);
               };
               contract.on(eventFilter, eventListener);
               return () => {
                    contract.off(eventFilter, eventListener);
               };
          }
     }, [contract]);

     return (<>
          <h5 style={{
               textAlign: 'center',
               marginTop: '36px'
          }}>Register ENS</h5>

          {boolVal && <p style={{
               textAlign: 'center',
               color: '#4CAF50',
               fontSize: '12px',
               fontFamily: 'Arial, sans-serif',
               padding: '9px',
               backgroundColor: '#f0f0f0',
               borderRadius: '10px',
               boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
               width: '280px',
               margin: '0 auto',
          }}>Entry Added Successfully</p>}



          <div
               style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '46vh',
               }}
          >
               <form
                    style={{
                         width: '50%',
                         padding: '18px',
                         border: '1px solid #ccc',
                         borderRadius: '5px',
                         boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                    }}
                    onSubmit={storeENS}
               >
                    <div style={{ marginBottom: '20px' }}>
                         <label htmlFor="ENS_str">ENS</label>
                         <input
                              type="text"
                              id="ENS_str"
                              style={{
                                   width: '100%',
                                   padding: '10px',
                                   border: '1px solid #ccc',
                                   borderRadius: '5px',
                              }}
                              onChange={(e) => setENS(e.target.value)}
                         />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                         <input
                              id="yes"
                              type="checkbox"
                              style={{ marginRight: '10px' }}
                              onClick={() => setPreferred(1 - preferred)}
                         />
                         <label htmlFor="yes">Preferred EOA address</label>
                    </div>
                    <button
                         type="submit"
                         style={{
                              background: ENS.length === 0 ? '#ccc' : '#007bff',
                              color: '#fff',
                              padding: '10px 20px',
                              border: 'none',
                              borderRadius: '5px',
                              cursor: ENS.length === 0 ? 'not-allowed' : 'pointer',
                         }}
                         disabled={ENS.length === 0}
                    >
                         Register
                    </button>
               </form>


          </div>
          {ENSnotFound.length > 0 && <p style={{
               textAlign: 'center',
               color: '#e74c3c',
               fontSize: '12px',
               fontFamily: 'Arial, sans-serif',
               padding: '9px',
               backgroundColor: '#f9f9f9',
               borderRadius: '10px',
               boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
               width: '280px',
               margin: '0 auto',
          }}>{ENSnotFound}</p>}
     </>)


}

export default RegisterENS