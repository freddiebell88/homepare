import { UserListings } from "./UserListings.jsx";
import { UserCollections } from "./UserCollections.jsx";
import { Menu } from "./Menu.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { IconHomeCheck } from "@tabler/icons-react";
import { Text, Group, Title } from "@mantine/core"


const TABNAMES = {
  MY_LISTINGS: "My Listings",
  MY_COLLECTIONS: "My Collections",
};

export function Dashboard( {token} ) {
  const [myListings, setMyListings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/homes", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    setMyListings(res.data.homes)})
    .catch(error => setError(`Error, ${error.message}`))
    }, [ token ])


  return (
    <>
    { error ? <Text c="red">{error}</Text> :
    <div>
{/* The Group Below is the HomePare Title and Logo */}
<Group>
  <Menu></Menu>
    <IconHomeCheck color="var(--mantine-color-dark-4)" size={48} />
    <Title c="var(--mantine-color-dark-4)" order={1} fw="900">
      Home<Text span c="#00A6BA" inherit>Pare</Text>
      </Title>
</Group>
  <UserCollections 
        token={token}
        myListings={myListings}
        />
        </div>
      }
      </>
    
  );
}
