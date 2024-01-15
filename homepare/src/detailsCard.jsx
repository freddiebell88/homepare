import { useState } from "react"
import Preview from "./listingInput"
import { list } from "postcss"

export function DetailsCard({address, previewImage, squareFootage, bathrooms, bedrooms, propertyType, hoa, garage, price, listingId, myListings}) {

    const [selectedListing, setSelectedListing] = useState([])
    const [selectedListingId, setSelectedListingId] = useState("")
    
    // setSelectedListingId("xyz1")

    const myListingsCopy = myListings
    
    const getListingId = (listingId) => {
        // setSelectedListingId("xyz1")
        console.log(listingId)
        // console.log(selectedListingId)
    }

    const handleAddListingClick = () => {
        console.log("add listing button")
        // setSelectedListingId();
        getListingId(listingId)
        setMyListings(
            [...myListings,
            { }]
        )
        // add listingId to myListingsCopy then use setMyListings to update myListings

    }
    const handleSaveNotes = () => {
        // post notes to API
    }

    const imgWidth = "200px";
    
        return (
            <div className="detailsCard">
            <h1>Listing Details</h1>
            
            <img src={previewImage} alt="thumbnail of home" width={imgWidth}/>
            
            <p>Street Address:{address}</p>
            <p>$$$: {price} </p>
            <p>SQ Footage: {squareFootage}</p>
            <p>Bedrooms: {bedrooms} </p>
            <p>Bathrooms: {bathrooms}</p>
            <p>Property Type: {propertyType}</p>
            <p>HOA: {hoa}</p>
            <p>Garage: {garage}</p>
            <label>
                Comments/Notes:
                <textarea name="comments" rows={8} cols={40} />
                <button onClick={handleSaveNotes}>Save</button>
            </label>
            <button onClick={handleAddListingClick}>
                Add to My Listings</button>
            </div>
    
        )
    }
