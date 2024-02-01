import './App.css'
import useLocalStorageState from 'use-local-storage-state'
import { Dashboard } from './components/dashboard.jsx'
import { Register } from './components/register'
import { Login } from './components/login'
import { Navigate, Route, Routes } from 'react-router-dom'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Questionnaire } from './components/questionnaire'
import { Checklist } from './components/checklist'
import { CollectionDetail } from './components/CollectionDetail'
import { ComparisonTable } from './components/comparisonTable'
import { DetailsCard } from './components/detailsCard'
import { UserAccount } from './components/UserAccount'
import { UserListings } from './components/UserListings'
import { UserCollections } from './components/UserCollections'
import { ListingInput } from './components/listingInput';
import { Menu } from './components/Menu'
import { Logout } from './components/logout'
import { EditChecklist } from './components/editChecklist'
import { NotFound } from './components/NotFound'


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
        element={!token ? <Navigate to="/login" /> : <Dashboard token={token} />}
        />
      <Route
        path="/register"
        element={<Register setAuth={setAuth} />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <Login setAuth={setAuth} />}
        />
      <Route 
      path="/questionnaire"
      element={!token ? <Navigate to="/login" /> :<Questionnaire username={username} token={token} />}
      />
      <Route
      path="checklist"
      element={!token ? <Navigate to="/login" /> :<Menu><Checklist username={username} token={token}/></Menu>}
      />
      <Route
      path="/edit-checklist"
      element={!token ? <Navigate to="/login" /> :<EditChecklist username={username} token={token}/>}
      />
      <Route
      path="collection-detail"
      element={<CollectionDetail username={username} token={token} />}
      />
      <Route
      path="comparison-table"
      element={<ComparisonTable username={username} token={token}/>}
      />
      <Route
      path="details-card"
      element={<DetailsCard username={username} token={token}/>}
      />
      <Route
      path="user-account"
      element=
      {!token ? <Navigate to="/login" /> : <Menu><UserAccount username={username} token={token}/></Menu>}
      />
      <Route
      path="user-collections"
      element={
      <Menu><UserCollections username={username} token={token} /></Menu>}
      />
      <Route
      path="user-listings"
      element={<UserListings username={username} token={token}/>}
      />
      <Route
      path="listing-input"
      element={<Menu><ListingInput token={token} username={username} /></Menu>}
      />
      <Route
      path="logout"
      element={!token ? <Navigate to="/login" /> : <Logout username={username} token={token} setAuth={setAuth} />}
      />
      <Route path='*' element={<NotFound />}/>
    </Routes>
    </MantineProvider>
  
    </>
  )
}

export default App
