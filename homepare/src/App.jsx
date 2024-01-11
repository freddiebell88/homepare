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
import { ListingInput } from './listingInput'

function App() {
  

  return (
    <>
    <MantineProvider>
    <Routes> 
      <Route
        path="/"
        element={<Dashboard />}
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
      element={<Checklist />}
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
      element={<ListingDetails />}
      />
      <Route
      path="UserAccount"
      element={<UserAccount />}
      />
      <Route
      path="UserCollections"
      element={<UserCollections />}
      />
      <Route
      path="UserListings"
      element={<UserListings />}
      />
      <Route
      path="listingInput"
      element={<ListingInput />}
      />
    </Routes>
    </MantineProvider>
  
    </>
  )
}

export default App
