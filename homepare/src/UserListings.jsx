import { DetailsCard } from './detailsCard'
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import axios from 'axios';
import placeholderImage from "./data/pexels-kelly-2950003.jpg"
import { Link } from "react-router-dom";

export function UserListings({myListings, token}) {
    

    const thumbWidth = "100px";
    const thumbHeight = "100px";
    const [opened, { open, close }] = useDisclosure(false);
    const [activeListing, setActiveListing] = useState(null);

    const usePlaceHolder = (e) => {
        e.target.src = placeholderImage
    }

    
    const handleModalOpen = (listing) => {
        setActiveListing(listing);
        open();
    }

    return (
        <>
        <h1> My Listings </h1>
        <Modal opened={opened} onClose={close} centered>
            {activeListing && <DetailsCard 
            // myListings={myListings}
            address={activeListing.address}
            previewImage={activeListing.images[0]}
            squareFootage={activeListing.living_area}
            halfBathrooms={activeListing.half_bath}
            bathrooms={activeListing.full_bath}
            bedrooms={activeListing.bedrooms}
            propertyType={activeListing.property_type}
            hoa={activeListing.hoa}
            garage={activeListing.garage}
            price={activeListing.price}
            listingId={activeListing._id}
            inMyListing={true}
            token={token}
            close={close}
            />}
        </Modal>


        {myListings.map((mylisting,idx) => {
            return (
                <>
                <div  key={mylisting._id} onClick={()=>handleModalOpen(mylisting)} className='listing-thumbnail'>
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