import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'
import { ListingInput } from './listingInput'
import homeData from './data/homes.json'
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export function UserListings( {myListings} ) {
    
    
    const thumbWidth = "100px";
    const thumbHeight = "100px";


    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
        <h1> My Listings </h1>
{/* listing thumbnail could be a component wrapped in a context provider? */}
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard 
            myListings={myListings} />
        </Modal>
        
        <div  onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[0].Media[0].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[0].UnparsedAddress}</p>
        </div>
        
        
        
        
        <div onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[1].Media[2].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[1].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[2].Media[5].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>

        <div onClick={open} className='listing-thumbnail'>
        <img src={homeData.value[2].Media[7].Thumbnail} width={thumbWidth} height={thumbHeight}/>
        <p>{homeData.value[2].UnparsedAddress}</p>
        </div>
        
        </>
    )
}

// export function UserListings({homeData}) {
//     return (
//         <div>
//             {homeData.map((listing, index) => (
//                 <ListingThumbnail 
//                     key={index} 
//                     thumbnail={listing.value[0].Media[0].Thumbnail}
//                     streetAddress={listing.value[0].UnparsedAddress}
//                     />
//             ))}
//         </div>
//     )
// }


// export function ListingThumbnail({thumbnail, streetAddress}) {
//     return (
//         <div>
//             <img src={thumbnail} />
//             <p>{streetAddress}</p>
//         </div>
//     )
// }