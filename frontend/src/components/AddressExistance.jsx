import { useState } from 'react'
const AddressExistance = ({ state }) => {
     const { contract } = state
     const [query, setQuery] = useState("")
     const [res, setRes] = useState("");
     const formStyles = {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '50vh',
     };
     const labelStyles = {
          fontSize: '18px',
          marginBottom: '10px',
          color: '#333',
     };

     const inputStyles = {
          width: '300px',
          padding: '10px',
          border: '2px solid #007bff',
          borderRadius: '5px',
          fontSize: '16px',
          marginBottom: '20px',
     };

     const buttonStyles = {
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer',
     };
     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const transaction = await contract.checkExistance(query);
               const str = `The given ENS ${query} `
               setRes(transaction ? str + "exists in the record book" : str + "doesn't exists in the record book")
          } catch (error) {
               console.log(error)
               setRes("Error")
          }
     }
     return (
          <>
               <form style={formStyles} onSubmit={handleSubmit}>
                    <label htmlFor="query-enss" style={labelStyles}>
                         Enter The ENS you want to search existance for
                    </label>
                    <input
                         type="text"
                         id="query-enss"
                         onChange={(e) => setQuery(e.target.value)}
                         style={inputStyles}
                    />
                    <button type="submit" disabled={query.length === 0} style={buttonStyles}>
                         Search
                    </button>
               </form>
               {res && <p style={{
                    width: '50%',
                    textAlign: 'center',
                    margin: 'auto',
                    fontSize: 'large',
               }}>{res}</p>}
          </>
     )
}

export default AddressExistance 