import { UserListings } from "./UserListings";
import { UserCollections } from "./UserCollections.jsx";
import { Menu } from "./Menu";
import { useState } from "react";
import SearchBar from "./listingInput.jsx";

import { Questionnaire } from "./questionnaire";

import { ComparisonTable } from "./comparisonTable.jsx";
import { Checklist } from "./checklist";


const TABNAMES = {
  MY_LISTINGS: "My Listings",
  MY_COLLECTIONS: "My Collections",
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState(TABNAMES.MY_LISTINGS);

  const handleUserListingsClick = () => {
    // if my listings tab is clicked
    // then active tab is my listings
    setActiveTab(TABNAMES.MY_LISTINGS)
  };

  const handleUserCollectionsClick = () => {
    // if my collections tab is clicked
    // then active tab is my collections
    setActiveTab(TABNAMES.MY_COLLECTIONS)

  };

  return (
    <>
      <h2>User's Dashboard</h2>
      <div className="tabs">
          <button onClick={handleUserListingsClick}>My Listings</button>
          <button onClick={handleUserCollectionsClick}>My Collections</button>
      </div>
        {activeTab === TABNAMES.MY_LISTINGS && <UserListings />}
        {activeTab === TABNAMES.MY_COLLECTIONS &&<UserCollections />}
      <Menu />

      <Questionnaire />
      <Checklist />
    

      <ComparisonTable />
      {/* just calling this here so I can see it, will ultimately be called from collection details page --Freddie */}
      
      <UserCollections />

    </>
  );
}
