import { useState, useEffect } from "react";
import axios from "axios";
import homeData from "./data/homes.json";
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { DetailsCard } from "./detailsCard";

export function ListingInput() {

    return (
        <>
        <h2>Input the street address, city, and state of the listing you are trying to find:</h2>
        <SearchBar />
        </>
    )
}

export function Preview( { address, previewImage, squareFootage, bathrooms, bedrooms, propertyType, hoa, garage, price} ) {

    const previewWidth = "100px";
    const [opened, { open, close }] = useDisclosure(false);


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

    
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address=${input}`, {
            headers: {
                Accept: 'application/json',
                apikey: '8a27f74ad8a3190542411b44de720777',
            }
        })
        .then((response) =>{
            console.log(response.data);
            setListingList(response.data.property);
            console.log(listingList)
            })
    }

    return (
        <>
        <form onSubmit={handleSearchSubmit}>
            <input
                type="text"
                placeholder="Input Listing"
                onChange={(e)=>setInput(e.target.value)}
                value={input}
            />
            <button type="submit" >Find Listing</button>
        </form>
            <h2>Results:</h2>
        {listingList.map((listing) => {
            return (
                <Preview 
                    key={listing.identifier.Id}
                    address={listing.address.oneLine}
                    // previewImage={listing.images[0].Thumbnail}
                    listingID={listing.identifier.Id}
                    squareFootage={listing.building.size.livingSize}
                    bathrooms={listing.building.rooms.bathsFull}
                    halfBathrooms={listing.building.rooms.bathsPartial}
                    bedrooms={listing.building.rooms.beds}
                    propertyType={listing.summary.propertyType}
                    hoa={listing.hoa}
                    // garage={listing.garage}
                    price={listing.assessment.market.mktTtlValue}
                />
                
            )
        })}

        
        </>


    )
}

export default SearchBar