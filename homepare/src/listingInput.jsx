import { useState, useEffect } from "react";
import axios from "axios";
import homeData from "./data/homes.json";
import { useDisclosure } from "@mantine/hooks";
import { DetailsCard } from "./detailsCard";
import { IconHomeSearch, IconSearch } from "@tabler/icons-react";
import { Modal, Button, Title, Text, Input, Group } from "@mantine/core";

export function ListingInput({ token }) {
  return (
    <>
      <Text size="lg" fw={400} ta="center" fs="italic" mt="md">
        Input the street address, city, and state of the listing you are trying
        to find
      </Text>
      <SearchBar token={token} />
    </>
  );
}

export function Preview({
  token,
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
  halfBathrooms,
}) {
  const previewWidth = "100px";
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <DetailsCard
        token={token}
        address={address}
        previewImage={previewImage}
        squareFootage={squareFootage}
        bathrooms={bathrooms}
        halfBathrooms={halfBathrooms}
        bedrooms={bedrooms}
        propertyType={propertyType}
        hoa={hoa}
        garage={garage}
        price={price}
        listingId={listingId}
      />
    </>
  );
}

const SearchBar = ({ token }) => {
  const [input, setInput] = useState("");
  const [listingList, setListingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        axios.get(`https://api.gateway.attomdata.com/propertyapi/v1.0.0/property/basicprofile?address=${input}`, {
            headers: {
                Accept: 'application/json',
                apikey: 'da579c4ec106a16cb2eb8d426ec83d8e',
            }
        })
        .then((response) =>{
            console.log(response.data);
            setListingList(response.data.property);
            console.log(listingList)
            })
            .catch((err) => {
                return setErrorMessage(err.response.data.message)
             })
    }

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <Group justify="center" mt="md" mb="md">
          <Input
            type="text"
            placeholder="Input Listing Address"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rightSection={<IconHomeSearch size={25} />}
            size="md"
          />
          <Button size="md" type="submit">
            Search
          </Button>
        </Group>
      </form>
      {listingList.map((listing) => {
        return (
          <Preview
            token={token}
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
        );
      })}
    </>
  );
};

export default SearchBar;
