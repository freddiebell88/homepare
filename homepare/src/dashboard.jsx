import { UserListings } from "./UserListings";
import { UserCollections } from "./UserCollections.jsx";
import { Menu } from "./Menu";
import { useState } from "react";
import { Tabs } from '@mantine/core';
import { Questionnaire } from "./questionnaire";
import { Link } from "react-router-dom";

const TABNAMES = {
  MY_LISTINGS: "My Listings",
  MY_COLLECTIONS: "My Collections",
};

export function Dashboard( {myListings, token} ) {
  const [activeTab, setActiveTab] = useState(TABNAMES.MY_LISTINGS);


  return (
    <>
      <h2>User's Dashboard</h2>   
      <div className="tabs">
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
        {activeTab === TABNAMES.MY_COLLECTIONS &&<UserCollections />}

      

    </>
  );
}
