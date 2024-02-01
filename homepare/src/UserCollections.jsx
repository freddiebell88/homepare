import { useDisclosure } from "@mantine/hooks";
import { DetailsCard } from "./detailsCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Divider, Text, Modal, Group, Box, Title } from "@mantine/core";
import placeholderImage from "./data/pexels-kelly-2950003.jpg";
import { NewCollection } from "./NewCollection";
import { IconHomePlus } from '@tabler/icons-react';

export function UserCollections({ token }) {
  const thumbWidth = "100px";
  const thumbHeight = "100px";

  const [errorMessage, setErrorMessage] = useState("");
  const [myCollections, setMyCollections] = useState([]);

  useEffect(() => {
    axios
      .get("https://homepare-backend.onrender.com/collections", {
        headers: {
          authorization: `x-access-token ${token}`,
        },
      })
      .then((res) => {
        setMyCollections(res.data.search);
      })
      .catch((err) => {
        return setErrorMessage(err.response.data.message);
      });
  }, [token]);

  if (myCollections.length != 0) {
    if (myCollections[0].search_name === "My List") {
      myCollections[0].search_name = "My Homes";
    }
  }

  return (
    <>
      <NewCollection token={token} />
      {errorMessage && <Text c="red">{errorMessage}</Text>}
      {myCollections.map((collection, index) => {
        index += 1;
        return (
          <>
            <div
              key={collection._id}
              className="collections-wrapper-in-user-collections"
            >
              <Text size="lg" fw={600}>
                {collection.search_name}
              </Text>
              <CollectionListings
                token={token}
                index={index}
                thumbHeight={thumbHeight}
                thumbWidth={thumbWidth}
              />
            </div>
          </>
        );
      })}
    </>
  );
}

export function CollectionListings({ token, index, thumbHeight, thumbWidth }) {
  const [collectionListings, setCollectionListings] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [activeListing, setActiveListing] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const usePlaceHolder = (e) => {
    e.target.src = placeholderImage;
  };

  useEffect(() => {
    axios
      .get("https://homepare-backend.onrender.com/collections-details", {
        headers: {
          authorization: `x-access-token ${token}`,
        },
      })
      .then((res) => {
        setCollectionListings(res.data.searchNameArray[index - 1].homeArray);
        console.log(collectionListings)
      })
      .catch((err) => {
        return setErrorMessage(err.response.data.message);
      });
  }, []);

  const handleModalOpen = (listing) => {
    if (listing.images.length === 0) {
      console.log("Inside listing If");
      listing.images.push({
        0: "https://assets-global.website-files.com/619e763bb3de7b56e6107aeb/61f2b0e1f0a732ae15de4d98_open-house-ideas-header-image-scaled.jpeg",
      });
      setActiveListing(listing);
    } else {
      setActiveListing(listing);
    }
    open();
  };
   const handleAddNewListingToCollection = (newListing) => {
    setCollectionListings([...collectionListings, newListing])
    console.log("New listing:", newListing)
  }
  return (
    <>
      {errorMessage ? (
        <Text c="red">{errorMessage}</Text>
      ) : (
        <Box className="userCollection">
          <Modal opened={opened} onClose={close} centered>
            {activeListing && (
              <DetailsCard
              updateCollection={handleAddNewListingToCollection}
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
              />
            )}
          </Modal>
          {collectionListings.length === 0 ? (
            <Box
              justify="center"
              mah={200}
              p="xs"
              className="listing-thumbnail-in-user-collections"
              style={{
                "--radius": "0.5rem",
                borderRadius: "var(--radius)",
              }}
            >
              <Link to="/listing-input">
                <IconHomePlus color="var(--mantine-color-dark-4)" size={40} />
              <Text ta="center" size="sm">Add a listing!</Text>
              </Link>
            </Box>
          ) : (
            collectionListings.map((coListing) => {
              return (
                <Box
                  mah={200}
                  p="xs"
                  className="listing-thumbnail-in-user-collections"
                  style={{
                    "--radius": "0.5rem",
                    borderRadius: "var(--radius)",
                  }}
                  key={coListing._id}
                  onClick={() => handleModalOpen(coListing)}
                >
                  <Group>
                    {coListing.images &&
                      coListing.images.length > 0 &&
                      Object.keys(coListing.images[0]).length > 0 && (
                        <img
                          src={coListing.images[0][0]}
                          onError={usePlaceHolder}
                          width={thumbWidth}
                          height={thumbHeight}
                        />
                      )}
                    {coListing.images && coListing.images.length === 0 && (
                      <img src={placeholderImage} />
                    )}
                    <Text
                      className="thumbnail-text-in-user-collections"
                      truncate="end"
                    >
                      {coListing.address}
                    </Text>
                  </Group>
                </Box>
              );
            })
          )}
        </Box>
      )}
      
      <Link to="/collection-detail" state={collectionListings}>
        <Text ta="right" size="md" td="underline" pb="xs">
          Compare Listings?
        </Text>
      </Link>
      <Divider size="xs" />
    </>
  );
}
