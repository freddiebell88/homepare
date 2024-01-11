import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'
import { ListingInput, Preview } from './listingInput'
import homeData from './data/homes.json'

export function UserListings( ) {
    // const handleSelectListing = () = {
    //     return (
    //         <DetailsCard />
    //     )
    const thumbWidth = "100px";
    const thumbHeight = "100px";

    return (
        <>
        <h1> My Listings </h1>
        <div> 
            {/* <p>🏠</p>
            <p >Address 1</p> */}
            {/* <Preview /> */}
        </div>

        <div className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        </div>
        
        <div className='listing-thumbnail'>
        <img src={homeData.value[1].Media[2].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[1].UnparsedAddress}</p>
        </div>

        <div className='listing-thumbnail'>
        <img src={homeData.value[2].Media[5].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>

        <div className='listing-thumbnail'>
        <img src={homeData.value[2].Media[7].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>
        
        </>
    )
}