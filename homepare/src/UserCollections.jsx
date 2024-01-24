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


export function UserCollections( {myListings, token, setCollectionDetailDisplay} ) {
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
              setCollectionDetailDisplay={setCollectionDetailDisplay}
            />

          {/* <Link to="/CollectionDetail"><p className="compare-listings-in-user-collections">Compare Listings?</p></Link> */}
          <Divider size="xs" />
          </div>
          </>
        )
      })}

      <NewCollection token={token} />
    </>
  );
}


export function CollectionListings({ token, index, thumbHeight, thumbWidth, setCollectionDetailDisplay}) {
  
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
      setActiveListing(listing);
      open();
  }
  // setCollectionDetailDisplay([1,2,3])

  const handleCollectionDetails = (collectionListings) => {
    setCollectionDetailDisplay(collectionListings)
  }

    return (

      <div className="userCollection" >
      <Modal opened={opened} onClose={close} centered>
            {activeListing && <DetailsCard 
            // myListings={myListings}
            address={activeListing.address}
            previewImage={activeListing.images[0]}
            squareFootage={activeListing.living_area}
            halfBathrooms={activeListing.half_bath}
            bathrooms={activeListing.full_bath}
            bedrooms={activeListing.bedrooms}
            propertyType={activeListing.property_type}
            hoa={activeListing.hoa}
            garage={activeListing.garage}
            price={activeListing.price}
            listingId={activeListing._id}
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
    )
}

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
