import dbhomes from "./data/homesfromDB.json";
import { Table } from '@mantine/core'
import axios from "axios";
import { useEffect, useState } from "react";


// useState for array of selected listings and map through those to build table?

export function ComparisonTable ( {homeData, token} ) {
  const [preferences, setPreferences] = useState({
    bathrooms : 0,
    bedrooms : 0,
    garage : false ,
    hoa : false,
    yard : false
});

useEffect(() => {
axios.get('https://homepare-backend.onrender.com/user-preference',{
    headers: {
      authorization: `x-access-token ${token}`
    }
  }).then((res) => {
    setPreferences(res.data)
    console.log(res.data)
  })}, [token])
  
    const rows = homeData.map((listing) => (
        <Table.Tr key={listing.id}>
            <Table.Td>{listing.address}</Table.Td>
            <Table.Td>{listing.price}</Table.Td>
            <Table.Td>{listing.living_area}</Table.Td>
            <Table.Td>{listing.bedrooms}</Table.Td>
            <Table.Td>{listing.bathrooms}</Table.Td>
            <Table.Td>{listing.hoa}</Table.Td>
            <Table.Td>{listing.yard}</Table.Td>
            <Table.Td>{listing.garage}</Table.Td>
        </Table.Tr>
    ))

    return (
      <>
        <Table.ScrollContainer maxWidth={500}>
            <Table striped highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                <Table.Th> </Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>SQ Footage</Table.Th>
                <Table.Th>Bedrooms</Table.Th>
                <Table.Th>Bathrooms</Table.Th>
                <Table.Th>HOA</Table.Th>
                <Table.Th>Yard</Table.Th>
                <Table.Th>Garage</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Thead>
            <Table.Tr>
            <Table.Th>My Checklist</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>SQ Footage</Table.Th>
                <Table.Th>{preferences.bedrooms}</Table.Th>
                <Table.Th>{preferences.bathrooms}</Table.Th>
                <Table.Th>{preferences.hoa === true ? 'Yes' : 'No'}</Table.Th>
                <Table.Th>{preferences.yard === true ? 'Yes' : 'No'}</Table.Th>
                <Table.Th>{preferences.garage === true ? 'Yes' : 'No'}</Table.Th>
            </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </Table.ScrollContainer>
        </>
    )
}