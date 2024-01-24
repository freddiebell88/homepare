import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NewCollection( {token} ) {
    const [collectionInput, setCollectionInput] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
  
  
    const handleSaveCollection = (e) => {
      console.log("save button clicked");
      console.log(collectionInput);
      e.preventDefault();
      axios.post(
        "https://homepare-backend.onrender.com/collections",
        {
          search_name: collectionInput
        },
        {
          headers: {
            authorization: `x-access-token ${token}`
          },
        }
      ).then(navigate("/UserCollections")).catch((err) => {
        return setErrorMessage(err.response.data.message)
     })
    };
  
    return (
      <>
        <form onSubmit={handleSaveCollection}>
          <input
            type="text"
            placeholder="Name your new collection"
            onChange={(e) => setCollectionInput(e.target.value)}
            value={collectionInput}
          />
          <button type="submit">Save</button>
        </form>
      </>
    );
  }