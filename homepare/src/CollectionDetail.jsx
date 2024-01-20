import { ListingDetails } from "./ListingDetails";
import { DetailsCard } from "./detailsCard";
import { ListingInput } from "./listingInput";
import { ComparisonTable } from "./comparisonTable";
import homeData from "./data/homesfromDB.json";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

export function CollectionDetail() {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const [compareChecked, setCompareChecked] = useState(false);
  const [listingCheckBoxes, setlistingCheckBoxes] = useState(
    new Array(4).fill(false)
  );
  //the value inside new Array is hardcoded for demo, it should be updated to what the length of listings in the collection
  const [
    thumbnailModalOpened,
    { open: thumbnailModalOpen, close: thumbnailModalClose },
  ] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  //this useDisclosure is for Mantine

  const handleCheckChange = () => {
    setCompareChecked(!compareChecked);
  };

  const handleThumbnailCheckOnChange = (listingIndex) => {
    const updatedListingCheckBoxes = listingCheckBoxes.map((listing, index) =>
      index === listingIndex ? !listing : listing
    );

    setlistingCheckBoxes(updatedListingCheckBoxes);
    //we need to send information from each checked box that identifies the listings
  };

  //if listingCheckBoxes value === true
  //then send the whole data set
  //to the compare table

  const previewSelectedThumbnails = () => {
    //after checking which listings they want to compare
    //the bottom of the screen pops up a modal
    //with a compare button
  };

  const handleCompareClick = () => {
    console.log("compare click");

    //when the user hits that
    //a full screen modal pops out
    //with the comparison table
  };

  return (
    <>
      <p>
        This is the collection detail page, cards containing house image
        thumbnail and address will be mapped out here
      </p>
      <h1> Collection Title </h1>
      <button onClick={open}>Compare</button>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <ComparisonTable />
      </Modal>
      <br></br>
      <input
        type="checkbox"
        checked={compareChecked}
        onChange={handleCheckChange}
      />
      <label>Compare?</label>
      {!compareChecked && (
        <Modal
          opened={thumbnailModalOpened}
          onClose={thumbnailModalClose}
          centered
        >
          <DetailsCard />
        </Modal>
      )}

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
              {compareChecked === true && (
                <>
                  <input
                    type="checkbox"
                    checked={listingCheckBoxes[index]}
                    onChange={() => handleThumbnailCheckOnChange(index)}
                  />
                  <label>Compare</label>
                </>
              )}
            </div>
          );
        })}

        {/* <div onClick={thumbnailModalOpen} className="listing-thumbnail">
          <img
            src={homeData.homes[1].images[1].Thumbnail}
            width={thumbWidth}
            height={thumbHeight}
          />
          <p>{homeData.homes[1].address}</p>
          {compareChecked === true && (
            <>
              <input
                type="checkbox"
                checked={listingCheckBoxes[1]}
                onChange={() => handleThumbnailCheckOnChange(1)}
              />
              <label>Compare</label>
            </>
          )}
        </div>

        <div onClick={thumbnailModalOpen} className="listing-thumbnail">
          <img
            src={homeData.homes[2].images[2].Thumbnail}
            width={thumbWidth}
            height={thumbHeight}
          />
          <p>{homeData.homes[2].address}</p>
          {compareChecked === true && (
            <>
              <input
                type="checkbox"
                checked={listingCheckBoxes[2]}
                onChange={() => handleThumbnailCheckOnChange(2)}
              />
              <label>Compare</label>
            </>
          )}
        </div>

        <div onClick={thumbnailModalOpen} className="listing-thumbnail">
          <img
            src={homeData.homes[0].images[0].Thumbnail}
            width={thumbWidth}
            height={thumbHeight}
          />
          <p>{homeData.homes[0].address}</p>
          {compareChecked === true && (
            <>
              <input
                type="checkbox"
                checked={listingCheckBoxes[3]}
                onChange={() => handleThumbnailCheckOnChange(3)}
              />
              <label>Compare</label>
            </>
          )}
        </div> */}
      </div>
    </>
  );
}
