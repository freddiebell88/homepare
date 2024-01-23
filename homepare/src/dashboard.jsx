import { UserListings } from "./UserListings";
import { UserCollections } from "./UserCollections.jsx";
import { Menu } from "./Menu";
import { useState, useEffect } from "react";
import { Tabs } from '@mantine/core';
import { Questionnaire } from "./questionnaire";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconHomeCheck } from "@tabler/icons-react";
import { Text, Group, Title } from "@mantine/core"


const TABNAMES = {
  MY_LISTINGS: "My Listings",
  MY_COLLECTIONS: "My Collections",
};

export function Dashboard( {token} ) {
  const [activeTab, setActiveTab] = useState(TABNAMES.MY_LISTINGS);
  const [myListings, setMyListings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/homes", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    console.log(res.data.homes);
    setMyListings(res.data.homes)})
    .catch(error => setError(`Error, ${error.message}`))
    }, [ token ])


const HomePareIcon = () => {
  return <IconHomeCheck />;
};


  return (
    <>
    { error ? <div>{error.message}</div> :
      <div>
      <h2>User's Dashboard</h2>   
      
    <Group>
    <IconHomeCheck color="var(--mantine-color-dark-4)" size={48} /><Title c="var(--mantine-color-dark-4)" order={1} fw="900">Home<Text span c="#00A6BA" inherit>Pare</Text></Title>
    </Group><div className="tabs">
      <Tabs
        onChange={(value) => setActiveTab(value)}
      >
      <Tabs.List>
        <Tabs.Tab value={TABNAMES.MY_LISTINGS}>My Listings</Tabs.Tab>
        <Tabs.Tab value={TABNAMES.MY_COLLECTIONS}>My Collections</Tabs.Tab>
      </Tabs.List>
      </Tabs>
      </div>
        {activeTab === TABNAMES.MY_LISTINGS && <UserListings token={token}
        myListings={myListings}
        />}
        {activeTab === TABNAMES.MY_COLLECTIONS &&<UserCollections 
        token={token}
        myListings={myListings}
        />}
        
        </div>  
      }
    </>
  );
}
