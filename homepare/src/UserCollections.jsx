import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { DetailsCard } from "./detailsCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Divider, Text } from '@mantine/core';
import placeholderImage from "./data/pexels-kelly-2950003.jpg"
import { NewCollection } from "./NewCollection";


export function UserCollections( {token} ) {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const [errorMessage, setErrorMessage] = useState("");
  const [myCollections, setMyCollections] = useState([]);


  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/collections", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    setMyCollections(res.data.search)
    }).catch((err) => {
      return setErrorMessage(err.response.data.message)
   })
    }, [ token ])

  return (
    <>
      { errorMessage && <Text c="red" >{errorMessage}</Text>}
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

          <Divider size="xs" />
          </div>
          </>
        )
      })}

      <NewCollection token={token} />
    </>
  );
}


export function CollectionListings({ token, index, thumbHeight, thumbWidth }) {
  
  const [collectionListings, setCollectionListings] = useState([])
  const [opened, { open, close }] = useDisclosure(false);
  const [activeListing, setActiveListing] = useState(null);
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

    const handleModalOpen = (listing) => {
      if (listing.images.length === 0) {
        console.log("Inside listing If")
        listing.images.push({
          "0": "https://assets-global.website-files.com/619e763bb3de7b56e6107aeb/61f2b0e1f0a732ae15de4d98_open-house-ideas-header-image-scaled.jpeg"
        })
        setActiveListing(listing)
        } else {
        setActiveListing(listing);
      }
      open();
  }

    return (
      <>
      { errorMessage ? <Text c="red" >{errorMessage}</Text> :
      <div className="userCollection" >
      <Modal opened={opened} onClose={close} centered>
            {activeListing && <DetailsCard 
            address={activeListing.address}
            previewImage={activeListing.images[0][0]}
            squareFootage={activeListing.living_area}
            halfBathrooms={activeListing.half_bath}
            bathrooms={activeListing.full_bath}
            bedrooms={activeListing.bedrooms}
            propertyType={activeListing.property_type}
            hoa={activeListing.hoa}
            garage={activeListing.garage}
            price={activeListing.price}
            listingId={activeListing._id}
            notes={activeListing.notes}
            inMyListing={true}
            token={token}
            close={close}
            />}
        </Modal>
        
        {collectionListings.map((coListing) => {
        return (
          <div className="listing-thumbnail-in-user-collections" key={coListing._id} onClick={()=>handleModalOpen(coListing)}>
            { coListing.images && coListing.images.length >0 && Object.keys(coListing.images[0]).length >0 && <img src={coListing.images[0].Thumbnail}
                onError={usePlaceHolder}
                width={thumbWidth} height={thumbHeight}/> }
                { coListing.images && coListing.images.length === 0 && <img src={placeholderImage}/> }
            <p className="thumbnail-text-in-user-collections">{coListing.address}</p>

          </div>
        )}
        )}
        <Link to="/CollectionDetail" state={collectionListings}><p className="compare-listings-in-user-collections">Compare Listings?</p></Link>
      </div>
      }
      </>
    )
}
