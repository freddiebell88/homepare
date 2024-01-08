import { UserListings } from './UserListings'
import { UserCollections } from './UserCollections.jsx'
import { Menu } from './Menu'

export function Dashboard() {
    return (
        <>
        <h2>User's Dashboard</h2>
        
        <UserListings />
        
        <UserCollections />

        <Menu />
        </>
    )
}