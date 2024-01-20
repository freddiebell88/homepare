import dbhomes from "./data/homesfromDB.json";
import { Table } from '@mantine/core'

// useState for array of selected listings and map through those to build table?

export function ComparisonTable ( {homeData} ) {
    const rows = homeData.map((listing) => (
        <Table.Tr key={listing.id}>
            <Table.Td>{listing.address}</Table.Td>
            <Table.Td>{listing.price}</Table.Td>
            <Table.Td>{listing.bedrooms}</Table.Td>
            <Table.Td>{listing.bathrooms}</Table.Td>
            <Table.Td>{listing.living_area}</Table.Td>
            <Table.Td>{listing.hoa}</Table.Td>
            <Table.Td>{listing.yard}</Table.Td>
            <Table.Td>{listing.garage}</Table.Td>
        </Table.Tr>
    ))

    return (
        <Table.ScrollContainer maxWidth={500}>
            <Table>
            <Table.Thead>
                <Table.Tr>
                <Table.Th>CHECKLIST</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Bedrooms</Table.Th>
                <Table.Th>Bathrooms</Table.Th>
                <Table.Th>SQ Footage</Table.Th>
                <Table.Th>HOA</Table.Th>
                <Table.Th>Yard</Table.Th>
                <Table.Th>Garage</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        </Table.ScrollContainer>
        // <Table data={tableData}/> 
        // <>
        // <table>
        //     <caption>Compare Listings</caption>
        //     <tbody>
        //     <tr>
        //         <th scope="col">Checklist</th>
        //         <th scope="col">{homeData.value[0].UnparsedAddress}</th>
        //         <th scope="col">{homeData.value[1].UnparsedAddress}</th>
        //         <th scope="col">{homeData.value[2].UnparsedAddress}</th>
        //     </tr>
        //     <tr>
        //         <th scope="col">List Price</th>
        //         <td>${homeData.value[0].ListPrice}</td>
        //         <td>${homeData.value[1].ListPrice}</td>
        //         <td>${homeData.value[2].ListPrice}</td>
                
        //     </tr>
        //     <tr>
        //         <th scope="row">Bedrooms</th>
        //         <td>{homeData.value[0].BedroomsTotal}</td>
        //         <td>{homeData.value[1].BedroomsTotal}</td>
        //         <td>{homeData.value[2].BedroomsTotal}</td>
        //     </tr>
        //     <tr>
        //         <th scope="row">Bathrooms</th>
        //         <td>{homeData.value[0].BathroomsTotalInteger}</td>
        //         <td>{homeData.value[1].BathroomsTotalInteger}</td>
        //         <td>{homeData.value[2].BathroomsTotalInteger}</td>
        //     </tr>
        //     <tr>
        //         <th scope="row">Yard</th>
        //     </tr>
        //     <tr>
        //         <th scope="row">HOA</th>
        //     </tr>
        //     <tr>
        //         <th scope="row">Garage</th>
        //     </tr>
        //     <tr>
        //         <th scope="row">SQ Ft</th>
        //         <td>sqFootage={homeData.value[0].LivingArea}</td>
        //         <td>sqFootage={homeData.value[1].LivingArea}</td>
        //         <td>sqFootage={homeData.value[2].LivingArea}</td>
        //     </tr>
        //     </tbody>
        // </table>
        // </>
    )
}