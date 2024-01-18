import { ListingDetails } from './ListingDetails'
import { DetailsCard } from './detailsCard'
import { ListingInput } from './listingInput'
import homeData from './data/homes.json'
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import axios from 'axios';
import placeholderImage from "./data/pexels-kelly-2950003.jpg"

export function UserListings() {
    
    const thumbWidth = "100px";
    const thumbHeight = "100px";
    const [myListings, setMyListings] = useState([])
    const [opened, { open, close }] = useDisclosure(false);

    const usePlaceHolder = (e) => {
        e.target.src = placeholderImage
    }

    useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/homes", {
        headers: {
            authorization: "x-access-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5ld3VzZXI5IiwiaWF0IjoxNzA1NTk1NDY5LCJleHAiOjE3MDU2ODE4Njl9.S1kPErLtGajmty_NF5sOUEle56onmCjpZ9svk-K1eOc"
            }
    }).then((res) => {
    console.log(res.data.homes);
    setMyListings(res.data.homes)})
    }, [])

    return (
        <>
        <h1> My Listings </h1>
        {myListings.map((mylisting) => {
            return (
        <>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard 
            // myListings={myListings}
            address={mylisting.address}
            previewImage={mylisting.images[0]}
            squareFootage={mylisting.living_area}
            halfBathrooms={mylisting.half_bath}
            bathrooms={mylisting.full_bath}
            bedrooms={mylisting.bedrooms}
            propertyType={mylisting.property_type}
            hoa={mylisting.hoa}
            garage={mylisting.garage}
            price={mylisting.price}
            listingId={mylisting._id}
            />
        </Modal>
        
        <div  key={mylisting._id} onClick={open} className='listing-thumbnail'>
        { mylisting.images && mylisting.images.length >0 && Object.keys(mylisting.images[0]).length >0 && <img src={mylisting.images[0].Thumbnail}
        onError={usePlaceHolder}
        width={thumbWidth} height={thumbHeight}/> }
        { mylisting.images && mylisting.images.length === 0 && <img src={placeholderImage}/> }
        <p>{mylisting.address}</p>
        </div>
        </>
            )
        })}
        
        
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