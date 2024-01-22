import { DetailsCard } from './detailsCard'
import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import axios from 'axios';
import placeholderImage from "./data/pexels-kelly-2950003.jpg"
import { Link } from "react-router-dom";

export function UserListings({token}) {
    

    const thumbWidth = "100px";
    const thumbHeight = "100px";
    const [myListings, setMyListings] = useState([])
    const [opened, { open, close }] = useDisclosure(false);
    const [activeListing, setActiveListing] = useState(null);

    const usePlaceHolder = (e) => {
        e.target.src = placeholderImage
    }

    useEffect(() => {
    axios.get("https://homepare-backend.onrender.com/homes", {
        headers: {
            authorization: `x-access-token ${token}`
            }
    }).then((res) => {
    console.log(res.data.homes);
    setMyListings(res.data.homes)})
    }, [ token ])

    console.log('here - in user listings')

    
    const handleModalOpen = (listing) => {
        setActiveListing(listing);
        open();
    }

    if (activeListing === null ) {return <div className='no-listings-div-in-user-listings'><p className='no-listings-text-in-user-listings'>No listings saved yet!</p><p className='link-in-no-listings-in-user-listings'><Link to="/listingInput">Click here to add a listing</Link></p></div>
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
                <AddToCollection token={token} />
                </>
                    )
                    
                })}
        
        </>
    )
}

export function AddToCollection( {token} ) {
    const [myCollections, setMyCollections] = useState([])
    const [selectedCollection, setSelectedCollection]= useState('')

    useEffect(() => {
    axios.get('https://homepare-backend.onrender.com/collections',
    {
        headers: {
            authorization: {"x-access-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWE5YTJiYmZmMDIxZGQwYmU0NDY3YWYiLCJpYXQiOjE3MDU4NzU4MzUsImV4cCI6MTcwNTk2MjIzNX0.INVOpKLldNLr_cgNylsRFNgC3euaCu8eyfVHw63OJFQ"}
        }
    }).then((res) => {
        setMyCollections(res.data.search)
        console.log(`collections data ${res.data.search}`)
        // console.log(myCollections)
    })
}, [])
    
    return (
        <>
                <label >
                <select value={selectedCollection} onChange={e => setSelectedCollection(e.target.value)}>
                <option>Add To Collection</option>
                {myCollections.map((collection) => {
                <option value={collection.search_name}>{collection.search_name}</option>
                })}
                </select>
                </label>

       
        </>
    )
 }