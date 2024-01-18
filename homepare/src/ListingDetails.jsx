import homeData from "./data/homes.json";
import { DetailsCard } from "./detailsCard.jsx";
import { useState } from 'react'
import { Menu } from "./Menu";
import { ChartDetails } from "./chartDetails";

export function ListingDetails() {
  console.log(homeData);

  const index = []

  // const [index, setIndex] = useState(0)

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
        bedrooms={homeData.value[0].BedroomsTotal}
        bathrooms={homeData.value[0].BathroomsTotalInteger}
        propertyType={homeData.value[0].PropertySubType}
      />
      <ChartDetails>
        
      </ChartDetails>
      <Menu />
      
    </>
  );
}
