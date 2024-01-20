import { useState, useEffect } from "react";
import axios from "axios";


export function DetailsCard({
    token, 
    inMyListing, 
    address, 
    previewImage, 
    squareFootage, 
    bathrooms, 
    bedrooms, 
    propertyType, 
    hoa, 
    garage, 
    price, 
    listingId, 
    halfBathrooms }) {

    const [addListing, setAddListing] = useState([])
    const [preferences, setPreferences] = useState({
        bathrooms : 0,
        bedrooms : 0,
        garage : false ,
        hoa : false,
        yard : false})

    useEffect(() => {
        axios.get('https://homepare-backend.onrender.com/user-preference',{
            headers: {
              authorization: `x-access-token ${token}`
            }
          }).then((res) => {
            setPreferences(res.data)
            console.log(res.data)
     })}, [token])
    

    
    const handleAddListingClick = () => {
        console.log("add listing button")
        setAddListing()
        // post listing to db
        axios.post('https://homepare-backend.onrender.com/homes', {
            address: address,
            price: price,
            property_type: propertyType,
            bedrooms: bedrooms,
            half_bath: halfBathrooms,
            full_bath: bathrooms,
            living_area: squareFootage, 
            garage: garage,
            hoa: hoa,
            images: previewImage,
            _id: "65a964860d510426f17e193e"
        }, {
            headers: {
                authorization: `x-access-token ${token}`
            }
        })
    }

    const handleSaveNotes = () => {
        // post notes to API
    }

    const imgWidth = "200px";

    console.log('here in details card')
    
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
            {inMyListing && <label>
                Comments/Notes:
                <textarea name="comments" rows={8} cols={40} />
                <button onClick={handleSaveNotes}>Save</button>
            </label>}
            <button onClick={handleAddListingClick}>
                Add to My Listings</button>
            </div>
    
        )
    }
