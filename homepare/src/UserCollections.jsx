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
import { Dashboard } from "./dashboard";
import placeholderImage from "./data/pexels-kelly-2950003.jpg"


export function UserCollections( {myListings, token, index} ) {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const [errorMessage, setErrorMessage] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [myCollections, setMyCollections] = useState([]);
 
  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/collections", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    console.log(res.data.search);
    setMyCollections(res.data.search)
    }).catch((err) => {
      return setErrorMessage(err.response.data.message)
   })
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
              thumbHeight={thumbHeight}
              thumbWidth={thumbWidth}
            />

          </div>
          </>
        )
      })}

      <NewCollection token={token} />
    </>
  );
}


export function CollectionListings({ token, index, thumbHeight, thumbWidth}) {
  
  const [collectionListings, setCollectionListings] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  const usePlaceHolder = (e) => {
    e.target.src = placeholderImage
}
      


  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/collections-details", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    setCollectionListings(res.data.searchNameArray[index - 1].homeArray)}).catch((err) => {
      return setErrorMessage(err.response.data.message)
   })
    }, [])


    return (
      <div className="userCollection" >
        {collectionListings.map((coListing) => {
        return (
          <div className="listing-thumbnail-in-user-collections" key={coListing._id}>
            { coListing.images && coListing.images.length >0 && Object.keys(coListing.images[0]).length >0 && <img src={coListing.images[0].Thumbnail}
                onError={usePlaceHolder}
                width={thumbWidth} height={thumbHeight}/> }
                { coListing.images && coListing.images.length === 0 && <img src={placeholderImage}/> }
            <p className="thumbnail-text-in-user-collections">{coListing.address}</p>

          </div>
        )}
        )}
      </div>
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
    ).then(navigate("/UserCollections")).catch((err) => {
      return setErrorMessage(err.response.data.message)
   })
  };

  return (
    <>
        <Link to="/CollectionDetail"><p className="compare-listings-in-user-collections">Compare Listings?</p></Link>
        <Divider size="xs" />
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
