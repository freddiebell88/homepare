import { useState } from 'react'
import './App.css'
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

function App() {
  

  return (
    <>
    <MantineProvider>
    <Routes> 
      <Route
        path="/"
        element={<Menu><Dashboard /></Menu>}
        />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
        />
      <Route 
      path="/questionnaire"
      element={<Questionnaire />}
      />
      <Route
      path="checklist"
      element={<Menu><Checklist /></Menu>}
      />
      <Route
      path="CollectionDetail"
      element={<CollectionDetail />}
      />
      <Route
      path="comparisonTable"
      element={<ComparisonTable />}
      />
      <Route
      path="detailsCard"
      element={<DetailsCard />}
      />
      <Route
      path="ListingDetails"
      element={<Menu><ListingDetails /></Menu>}
      />
      <Route
      path="UserAccount"
      element={<UserAccount />}
      />
      <Route
      path="UserCollections"
      element={
      <Menu><UserCollections /></Menu>}
      />
      <Route
      path="UserListings"
      element={<UserListings />}
      />
      <Route
      path="listingInput"
      element={<Menu><ListingInput /></Menu>}
      />
    </Routes>
    </MantineProvider>
  
    </>
  )
}

export default App
