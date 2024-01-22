import { CollectionDetail } from "./CollectionDetail";
import { ComparisonTable } from "./comparisonTable";
import homeData from "./data/homes.json";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DetailsCard } from "./detailsCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from '@mantine/core';

export function UserCollections( {token} ) {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const [opened, { open, close }] = useDisclosure(false);
  const [myCollections, setMyCollections] = useState([]);
 
  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/collections", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    console.log(res.data.search);
    setMyCollections(res.data.search)})
    }, [ token ])

  return (
    <>
      {/* <Modal opened={opened} onClose={close} centered>
        <DetailsCard />
      </Modal> */}

      {myCollections.map((collection, index) => {
        index += 1
        return (
          <>
          <div key={collection._id} className="collections-wrapper-in-user-collections">
            {collection.search_name}
            <CollectionListings 
              token={token}
              index={index}
            />
          </div>
          </>
        )
      })}

      <NewCollection token={token} />
    </>
  );
}

export function CollectionListings({token, index}) {

  const [collectionListings, setCollectionListings] = useState([])

  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/collections", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    console.log(res.data.search[index - 1].houseID);
    console.log(`index: ${index}`)
    setCollectionListings(res.data.search[index - 1].houseID)})
    console.log(`The listings inside this collection are: ${collectionListings}`)
    }, [])

    return (
      <>
      {collectionListings.map((listings) => {
        return(
          <div key={listings.houseID}>
            {listings}
          </div>
        )
      })}
      </>
    )
}

export function NewCollection( {token} ) {
  const [collectionInput, setCollectionInput] = useState("");
  const navigate = useNavigate();

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
    ).then(navigate("/UserCollections"))
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
