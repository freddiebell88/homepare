import { useState } from "react"
import Preview from "./listingInput"
import { list } from "postcss"
import axios from "axios"

export function DetailsCard({address, previewImage, squareFootage, bathrooms, bedrooms, propertyType, hoa, garage, price, listingId, halfBathrooms }) {

    const [addListing, setAddListing] = useState([])
    
    const handleAddListingClick = () => {
        console.log("add listing button")
        setAddListing()
        // post listing to db
        axios.post('https://homepare-backend.onrender.com/homes', {
            address: {address},
            price: {price},
            property_type: {propertyType},
        })
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
            <p>Half Bathrooms: {halfBathrooms}</p>
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
