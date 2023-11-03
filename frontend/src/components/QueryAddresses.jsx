import { useState } from 'react'

const elementListStyle = {
     listStyle: 'none',
     padding: 0,
     margin: 0,
     fontSize: '18px',
};

const elementItemStyle = {
     padding: '10px',
     backgroundColor: '#f0f0f0',
     margin: '10px 0',
     borderRadius: '5px',
     boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
     transition: 'background-color 0.3s',

};

elementItemStyle[':hover'] = {
     backgroundColor: '#007bff',
     color: '#fff',
     cursor: 'pointer',
};
const QueryAddresses = ({ state }) => {
     const { contract } = state
     const [query, setQuery] = useState("")
     const [addresses, setAddresses] = useState([]);
     const [mostFitAdd, setMostFitAdd] = useState("");
     const [errMessage, setErrMessage] = useState("");
     const translateENS = async (e) => {
          try {
               e.preventDefault()
               //check whether ENS exists or not
               // const transaction = await contract.getMostfitAddress(query);
               const transaction = await contract.getAllAddresses(query);
               const mostFitAddress = await contract.getMostfitAddress(query);
               setAddresses(transaction)
               setMostFitAdd(mostFitAddress)
          }
          catch (err) {
               console.log(err.code,)
               setErrMessage(err.code)
          }

     }
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
     const highlightStyle = {
          backgroundColor: 'rgba(228, 83, 70, 0.958)',
          textColor: 'white'
     }

     if (errMessage.length > 0) {
          return <p>{errMessage}</p>
     }

     return (
          <>

               <form onSubmit={translateENS} style={formStyles}>
                    <label htmlFor="query-ens" style={labelStyles}>
                         Enter The ENS you want to translate
                    </label>
                    <input
                         type="text"
                         id="query-ens"
                         onChange={(e) => setQuery(e.target.value)}
                         style={inputStyles}
                    />
                    <button type="submit" disabled={query.length === 0} style={buttonStyles}>
                         Translate
                    </button>
               </form>

               {
                    addresses.length !== 0 && (<div style={{

                         maxWidth: '59%',
                         margin: '0 auto'
                    }}>
                         <h2 style={{
                              textAlign: 'center'
                         }}>Addresses Registered Under : {query}</h2>
                         <ul style={elementListStyle}>
                              {addresses.map((element, index) => (
                                   <li key={index} style={element === mostFitAdd ? { ...elementItemStyle, ...highlightStyle } : elementItemStyle}  >
                                        {element === mostFitAdd ? element + "\t\t\t preferred Address" : element}
                                   </li>
                              ))}
                         </ul>
                    </div>)

               }
          </>
     );


}

export default QueryAddresses