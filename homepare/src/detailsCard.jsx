import { useState } from "react"
import Preview from "./listingInput"

export function DetailsCard({address, previewImage, squareFootage, bathrooms, bedrooms, propertyType, hoa, garage}) {

    const [addListing, setAddListing] = useState([])
    
    const handleAddListingClick = () => {
        console.log("add listing button")
        setAddListing()
        //when this button is clicked
        //the detail card is copied -- secondary
        //the thumbnail image and street address are then displayed on the 'my listings' page
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
            <p>$$$:</p>
            <p>SQ Footage: {squareFootage}</p>
            <p>Bedrooms: {bedrooms} </p>
            <p>Bathrooms: {bathrooms}</p>
            <p>Property Type: {propertyType}</p>
            <p>HOA: {hoa}</p>
            <p>Garage: {garage}</p>
            {/* <p>City: {city}</p>
            <p>Zip Code: {zipCode}</p>
            <p>$$$: ${listPrice}</p>
            <p>SQ Footage: {sqFootage}</p>
            <div>CHECKLIST</div>
            <p> Bedrooms: {bedrooms} ✅ </p>
            <p> Bathrooms: {bathrooms} ❌</p>
            <p> Property Type: {propertyType} </p> */}
            <label>
                Comments/Notes:
                <textarea name="comments" rows={8} cols={40} />
                <button onClick={handleSaveNotes}>Save</button>
            </label>
            <button onClick={handleAddListingClick}>Add to My Listings</button>
            </div>
    
        )
    }
