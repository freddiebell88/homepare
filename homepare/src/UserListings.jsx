import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'
import { ListingInput } from './listingInput'

export function UserListings() {
    // const handleSelectListing = () = {
    //     return (
    //         <DetailsCard />
    //     )
    

    return (
        <>
        <h1> My Listings </h1>
        <div> 
            <p>🏠</p>
            <p >Address 1</p>
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
            
        {/* <ListingDetails /> */}
        <ListingInput />
        </>
    )
}