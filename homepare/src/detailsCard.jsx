import { useState } from "react"

export function DetailsCard({streetAddress, sqFootage, listPrice, city, zipCode, thumbnail}) {
    const [addListing, setAddListing] = useState([])
    
    const handleAddListingClick = () => {
        console.log("add listing button")
        setAddListing()
        //when this button is clicked
        //the detail card is copied -- secondary
        //the thumbnail image and street address are then displayed on the 'my listings' page
    }

    
    
        return (
            <div className="detailCard">
            <h1>Listing Details</h1>
            
            <img src={thumbnail} alt="thumbnail of home"/>
            
            <p>Street Address:{streetAddress}</p>
            <p>City: {city}</p>
            <p>Zip Code: {zipCode}</p>
            <p>$$$: ${listPrice}</p>
            <p>SQ Footage: {sqFootage}</p>
            <div>CHECKLIST</div>
            <button onClick={handleAddListingClick}>Add to My Listings</button>
            </div>
    
        )
    }
