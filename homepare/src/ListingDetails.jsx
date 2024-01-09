import homeData from '/Users/mariajuri/Momentum/Phase-4/Final-Project-Homepare/homepare/homepare/homes.json'
import { DetailsCard } from './detailsCard.jsx'


export function ListingDetails() {
    console.log(homeData)

    return (
        <>
        <h1>Listing Details</h1>
        <DetailsCard 
        streetAddress={homeData.value[0].UnparsedAddress}
        sqFootage={homeData.value[0].LivingArea}
        listPrice={homeData.value[0].ListPrice}
        city={homeData.value[0].City}
        zipCode={homeData.value[0].PostalCode}
        thumbnail={homeData.value[0].Media[0].Thumbnail}
        />
        </>

    )
}

