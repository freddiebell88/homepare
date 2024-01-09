import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'

export function UserListings() {
    // const handleSelectListing = () = {
    //     return (
    //         <DetailsCard />
    //     )
    }

    return (
        <>
        <h1> My Listings </h1>
        <div> 
            <p>🏠</p>
            <button onClick={handleSelectListing}>Address 1</button onClick={handleSelectListing}>
        </div>
        <div>
        <p>🏠</p>
            Address 2 </div>
        <div>
        <p>🏠</p>
            Address 3 </div>
        <div>
        <p>🏠</p>
            Address 4 </div>
            
        <ListingDetails />
        </>
    )
}