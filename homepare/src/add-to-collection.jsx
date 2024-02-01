import { useState, useEffect } from "react";
import axios from "axios";
import { Text, Button } from "@mantine/core";

export function  AddToCollection({ close, token, listingId, updateCollection }) {
    const [myCollections, setMyCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
      search_name: "",
    });
  
  
      useEffect(() => {
        axios
          .get("https://homepare-backend.onrender.com/collections", {
            headers: {
              authorization: `x-access-token ${token}`,
            },
          })
          .then((res) => {
            setMyCollections(res.data.search);
            console.log(`collections data ${res.data.search}`);
            console.log(myCollections);
          }).catch((err) => {
            return setErrorMessage(err.response.data.message)
         });
      }, []);
  
      if (myCollections.length != 0 ){
  
        if (myCollections[0].search_name === "My List") {
          myCollections[0].search_name = "My Homes"
        }}
  
      const handleCollectionChange = (e) => {
        setForm({
          ...form,
          _id: e.target.value,
          houseID: listingId,
        });
      };
  
      const handleSubmit = (e) => {
        e.preventDefault();
        const selectedCollection = myCollections.find(
          (collection) => collection._id === form._id
        );
        console.log(selectedCollection);
        selectedCollection.houseID.push(listingId);
        axios
          .put(
            `https://homepare-backend.onrender.com/collections/${form._id}`,
            { ...selectedCollection },
            {
              headers: {
                authorization: `x-access-token ${token}`,
              },
            }
          )
          .then(() => (axios.get(`https://homepare-backend.onrender.com/home/${listingId}`,
          {
            headers: {
              authorization: `x-access-token ${token}`,
            },
          })))
          .then((res) => updateCollection(res.data))
  
          // .then(close())
          .catch((err) => {
            return setErrorMessage(err.response.data.message)
         });
         
      };
  
      return (
        <>
        { errorMessage && <Text c="red" >{errorMessage}</Text>}
          <form method="post" onSubmit={handleSubmit}>
            <label>
              <select
                value={selectedCollection}
                onChange={handleCollectionChange}
              >
                <option>Add To Collection</option>
                {myCollections.map((collection) => (
                  <option key={collection._id} value={collection._id}>
                    {collection.search_name}
                  </option>
                ))}
              </select>
            </label>
            <Button type="submit" size="xs" color="gray">Add</Button>
          </form>
        </>
      );
    }