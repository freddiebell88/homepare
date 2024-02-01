import { useEffect, useState } from "react";
import axios from "axios";
import { Text } from "@mantine/core";
import { NewCollection } from "./NewCollection";
import { CollectionListings } from "./collection-listings.jsx";

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
