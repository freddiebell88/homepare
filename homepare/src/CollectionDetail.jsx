import { ComparisonTable } from "./comparisonTable";
import homeData from "./data/homesfromDB.json";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";



export function CollectionDetail( {token}) {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const location = useLocation()
  const collectionListings = location.state

  console.log(collectionListings)

  const [listingCheckBoxes, setlistingCheckBoxes] = useState(
    new Array(collectionListings.length).fill(false)
  );
  
  const [
    thumbnailModalOpened,
    { open: thumbnailModalOpen, close: thumbnailModalClose },
  ] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  //this useDisclosure is for Mantine


  const handleThumbnailCheckOnChange = (listingIndex) => {
    const updatedListingCheckBoxes = listingCheckBoxes.map((listing, index) =>
      index === listingIndex ? !listing : listing
    );

    setlistingCheckBoxes(updatedListingCheckBoxes);
    //we need to send information from each checked box that identifies the listings
  };


  return (
    <>
      <Link to="/"><Button>Back to My Collections</Button></Link>
      <h1> Collection Title </h1>
      {listingCheckBoxes.find((checkedbox) => checkedbox === true) && <Button onClick={open}>Compare</Button>}
      <Modal
        opened={opened}
        onClose={close}
        title=""
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <ComparisonTable token={token}
        homeData={collectionListings.filter((listing, index) => 
          {if (listingCheckBoxes[index] === true) {
            return true;
          } return false;
        })
      }
  />
      </Modal>
      <br></br>

        {/* <Modal
          opened={thumbnailModalOpened}
          onClose={thumbnailModalClose}
          centered
        >
          <DetailsCard />
        </Modal> */}

      <div className="thumnail-grid-in-collections-detail">
        {collectionListings.map((listing, index) => {
          console.log('listing', listing)
          return (
            <div
              onClick={thumbnailModalOpen}
              key="id"
              className="listing-thumbnail-in-collections-detail"
            >
              <img
                src={listing.images[0]}
                width={thumbWidth}
                height={thumbHeight}
              />
              <p>{listing.address}</p>
                <>
                  <input
                    type="checkbox"
                    checked={listingCheckBoxes[index]}
                    onChange={() => handleThumbnailCheckOnChange(index)}
                  />
                  <label>Compare</label>
                </>
            </div>
          );
        })}
      </div>
    </>
  );
}
