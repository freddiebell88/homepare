import { DetailsCard } from "./detailsCard";
import { ComparisonTable } from "./comparisonTable";
import homeData from "./data/homesfromDB.json";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { Link } from "react-router-dom";

export function CollectionDetail() {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const [listingCheckBoxes, setlistingCheckBoxes] = useState(
    new Array(homeData.homes.length).fill(false)
  );
  //the value inside new Array is hardcoded for demo, it should be updated to what the length of listings in the collection
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
      <Link to="/"><button>Back to My Collections</button></Link>
      <h1> Collection Title </h1>
      {listingCheckBoxes.find((checkedbox) => checkedbox === true) && <button onClick={open}>Compare</button>}
      <Modal
        opened={opened}
        onClose={close}
        title=""
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <ComparisonTable 
        homeData={homeData.homes.filter((listing, index) => 
          {if (listingCheckBoxes[index] === true) {
            return true;
          } return false;
        })}
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
        {homeData.homes.map((listing, index) => {
          console.log('listing', listing)
          return (
            <div
              onClick={thumbnailModalOpen}
              key="id"
              className="listing-thumbnail-in-collections-detail"
            >
              <img
                src={listing.images[0].Thumbnail}
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
