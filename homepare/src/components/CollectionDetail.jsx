import { ComparisonTable } from "./comparisonTable";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Box, Text, Group, Checkbox, CloseButton, Flex } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

export function CollectionDetail({ token }) {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const location = useLocation();
  const collectionListings = location.state;

  console.log("cl", collectionListings);

  const [listingCheckBoxes, setlistingCheckBoxes] = useState(
    new Array(collectionListings.length).fill(false)
  );

  const [
    thumbnailModalOpened,
    { open: thumbnailModalOpen, close: thumbnailModalClose },
  ] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const handleThumbnailCheckOnChange = (listingIndex) => {
    const updatedListingCheckBoxes = listingCheckBoxes.map((listing, index) =>
      index === listingIndex ? !listing : listing
    );

    setlistingCheckBoxes(updatedListingCheckBoxes);
    //we need to send information from each checked box that identifies the listings
  };

  for (const listing of collectionListings) {
    if (listing.images.length === 0) {
      listing.images.push({
        0: "https://assets-global.website-files.com/619e763bb3de7b56e6107aeb/61f2b0e1f0a732ae15de4d98_open-house-ideas-header-image-scaled.jpeg",
      });
    }
  }

  return (
    <>

      <Group justify="right"><Link to="/">
      <CloseButton size="lg"  />
      </Link></Group>
      {listingCheckBoxes.find((checkedbox) => checkedbox === true) && (
        <Group justify="Center"><Button size="sm" m={5} variant="light" onClick={open}>Compare?</Button></Group>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title=""
        size="auto"
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <ComparisonTable
          token={token}
          homeData={collectionListings.filter((listing, index) => {
            if (listingCheckBoxes[index] === true) {
              return true;
            }
            return false;
          })}
        />
      </Modal>

      <Flex
      gap="xs"
      justify="center"
      align="flex-center"
      direction="row"
      wrap="wrap"
    >
        {collectionListings.map((listing, index) => {
          console.log("listing", listing);
          return (
            <Box
              p="xs"
              onClick={thumbnailModalOpen}
              key="id"
              className="listing-thumbnail-in-user-collections"
              style={{ "--radius": "0.5rem", borderRadius: "var(--radius)" }}
            >
              <Group>
              <img
                src={listing.images[0][0]}
                width={thumbWidth}
                height={thumbHeight}
              />
              <Text tt="capitalize" size="sm" truncate="end">{listing.address}</Text>
        
                <Checkbox
                  type="checkbox"
                  checked={listingCheckBoxes[index]}
                  onChange={() => handleThumbnailCheckOnChange(index)}
                label="Compare"
                />
          
              </Group>
            </Box>
          );
        })}
       </Flex>
    </>
  );
}
