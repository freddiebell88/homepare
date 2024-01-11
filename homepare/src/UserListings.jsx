import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'
import { ListingInput, Preview } from './listingInput'
import homeData from './data/homes.json'
import { useState } from 'react';

export function UserListings( ) {
    
    const [clicked, setClicked] = useState('false')
    
    const thumbWidth = "100px";
    const thumbHeight = "100px";

    const handleOpenThumbnail = () => {
        console.log('thumbnail clicked')
        return (
            setClicked('true')
        )
    }


    return (
        <>
        <h1> My Listings </h1>
{/* listing thumbnail could be a component wrapped in a context provider? */}
        {!clicked ? 
        <div onClick={handleOpenThumbnail} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        </div>
        : 
        <div>
        <DetailsCard />
        </div>
        }
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