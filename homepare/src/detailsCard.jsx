

export function DetailsCard({streetAddress, sqFootage, listPrice, city, zipCode, thumbnail}) {
    
    
        return (
            <>
            <h1>Listing Details</h1>
            <div>🏡</div>
            <div>
            <img src={thumbnail} alt="thumbnail of home"/>
            </div>
            <p>Street Address:{streetAddress}</p>
            <p>City: {city}</p>
            <p>Zip Code: {zipCode}</p>
            <p>$$$: ${listPrice}</p>
            <p>SQ Footage: {sqFootage}</p>
            <div>CHECKLIST</div>
            <div>+ to My Listings</div>
            </>
    
        )
    }
