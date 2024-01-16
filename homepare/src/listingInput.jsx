import { useState, useEffect } from "react";
import axios from "axios";
import homeData from "./data/homes.json";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { DetailsCard } from "./detailsCard";

export function ListingInput() {

    return (
        <>
        <h2>Input Your Listing Address</h2>
        <SearchBar />
        {/* <Preview 
            thumbnail={homeData.value[0].Media[0].Thumbnail}
            streetAddress={homeData.value[0].UnparsedAddress}
        /> */}
        {/* <SearchBarFilter /> */}
        {/* <div>{preview}</div> */}
        </>
    )
}

export function Preview( { address, previewImage, squareFootage, bathrooms, bedrooms, propertyType, hoa, garage, price} ) {

    const previewWidth = "100px";
    const [opened, { open, close }] = useDisclosure(false);

    // const handlePreviewClick = (e) => {
    //     console.log(address, listingID)
    // }

    return (
        <>
        <Modal opened={opened} onClose={close} centered>
            <DetailsCard 
            address={address}
            previewImage={previewImage}
            squareFootage={squareFootage}
            bathrooms={bathrooms}
            bedrooms={bedrooms}
            propertyType={propertyType}
            hoa={hoa}
            garage={garage}
            price={price}
            />
        </Modal>
        <div
        // onClick={() => {
        //     open;
        //     handlePreviewClick();
        // }}
        onClick={open}
        className="previewCard">
        <img src={previewImage}/>
        <h3>{address}</h3>
            <button>Add to My Listings</button>
        </div>
        </>
    )
}

const SearchBar = () => {
    const [input, setInput] = useState('');
    const [listingList, setListingList] = useState([]);
    const [loading, setLoading] = useState(true)
    // const [opened, { open, close }] = useDisclosure(false);

    // useEffect(() => {
    //     axios.get('https://homepare-backend.onrender.com/homes').then((response)=>{setListingList(response.data.homes)})
    // },[])

    useEffect(() => {
        axios.get('https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address=1311%20Carolina%20Loop%20Hillsborough%20NC', {
            headers: {
                Accept: 'application/json',
                apikey: '2b1e86b638620bf2404521e6e9e1b19e',
            }
        }).then((response) =>{console.log(response.data)})
    })

    return (
        <form>
            <input
                type="search"
                placeholder="Input Listing"
                onChange={(e)=>setInput(e.target.value)}
                value={input}
            />
            <button>Look Up</button>
            <h2>Results:</h2>
            {listingList.filter((listing) => {
                if(input===""){
                    return listing
                 } else if (listing.address.toLowerCase().includes(input.toLowerCase())){
                    return listing
                    }
                    })
                .map((listing) => {
                    return (
                    <>
                    {/* <Modal opened={opened} onClose={close} centered>
                    <DetailsCard 
                    address={listing.address}
                    thumbImage={listing.images[0].Thumbnail}
                    />
                    </Modal> */}
                    <Preview 
                        key={listing._id}
                        address={listing.address}
                        previewImage={listing.images[0].Thumbnail}
                        listingID={listing._id}
                        squareFootage={listing.living_area}
                        bathrooms={listing.bathrooms}
                        bedrooms={listing.bedrooms}
                        propertyType={listing.property_type}
                        hoa={listing.hoa}
                        garage={listing.garage}
                        price={listing.price}
                        />
                    {/* <div key={listing._id} onClick={open}>
                        <img src={listing.images[0].Thumbnail}/>
                        <h3>{listing.address}</h3>
                    </div> */}
                    </>
                    )
            })}

        </form>
    )
}

export default SearchBar