import { useState } from 'react'
import './App.css'
import useLocalStorageState from 'use-local-storage-state'
import { Dashboard } from './dashboard'
import { Register } from './register'
import { Login } from './login'
import { Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Questionnaire } from './questionnaire'
import { Checklist } from './checklist'
import { CollectionDetail } from './CollectionDetail'
import { ComparisonTable } from './comparisonTable'
import { DetailsCard } from './detailsCard'
import { ListingDetails } from './ListingDetails'
import { UserAccount } from './UserAccount'
import { UserListings } from './UserListings'
import { UserCollections } from './UserCollections'
import { ListingInput } from './listingInput';
import { Menu } from './Menu'
import { Logout } from './logout'


function App() {
  const [token, setToken] = useLocalStorageState('token');
  const [username, setUsername] = useLocalStorageState('username');


  const setAuth = (username, token) => {
    setUsername(username);
    setToken(token);
    console.log(token);
  };

  return (
    <>
    <MantineProvider>
    <Routes> 
      <Route 
        path="/"
        element={<Menu><Dashboard token={token} /></Menu>}
        />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login setAuth={setAuth} />}
        />
      <Route 
      path="/questionnaire"
      element={<Questionnaire username={username} token={token} />}
      />
      <Route
      path="checklist"
      element={<Menu><Checklist username={username} token={token}/></Menu>}
      />
      <Route
      path="CollectionDetail"
      element={<CollectionDetail username={username} token={token}/>}
      />
      <Route
      path="comparisonTable"
      element={<ComparisonTable username={username} token={token}/>}
      />
      <Route
      path="detailsCard"
      element={<DetailsCard username={username} token={token}/>}
      />
      <Route
      path="ListingDetails"
      element={<Menu><ListingDetails username={username} token={token}/></Menu>}
      />
      <Route
      path="UserAccount"
      element={<UserAccount username={username} token={token}/>}
      />
      <Route
      path="UserCollections"
      element={
      <Menu><UserCollections username={username} token={token}/></Menu>}
      />
      <Route
      path="UserListings"
      element={<UserListings username={username} token={token}/>}
      />
      <Route
      path="listingInput"
      element={<Menu><ListingInput username={username} token={token}/></Menu>}
      />
      <Route
      path="logout"
      element={<Logout username={username} token={token}/>}
      />
    </Routes>
    </MantineProvider>
  
    </>
  )
}

export default App
