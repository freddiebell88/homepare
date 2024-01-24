import { Table, ColorSwatch, Group, Tooltip, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";


export function ComparisonTable({ homeData, token }) {
  const [errorMessage, setErrorMessage] = useState("")
  const [preferences, setPreferences] = useState({
    bathrooms: 0,
    bedrooms: 0,
    garage: false,
    hoa: false,
  });

  useEffect(() => {
    axios
      .get("https://homepare-backend.onrender.com/user-preference", {
        headers: {
          authorization: `x-access-token ${token}`,
        },
      })
      .then((res) => {
        setPreferences(res.data);
        console.log(res.data);
      }).catch((err) => {
        return setErrorMessage(err.response.data.message)
     });
  }, [token]);

  // if {listing.bedrooms === preference.bedrooms ? className="table-test-class" : className="table-test-class-pink"}
  //if listing.bedrooms has the same value as preference.bedrooms the classname is table-test-class else table-test-class-pink

  const rows = homeData.map((listing) => (
    <Table.Tr key={listing.id}>
      <Table.Td>{listing.address}</Table.Td>
      <Table.Td>{listing.price}</Table.Td>
      <Table.Td>{listing.living_area}</Table.Td>
      <Table.Td
        className={
          listing.bedrooms === preferences.bedrooms
            ? "match-in-comparison-table"
            : "not-a-match-in-comparision-table"
        }
      >
        {listing.bedrooms}
      </Table.Td>
      <Table.Td
        className={
          listing.bathrooms === preferences.bathrooms
            ? "match-in-comparison-table"
            : "not-a-match-in-comparision-table"
        }
      >
        {listing.bathrooms}
      </Table.Td>
      <Table.Td
        className={
          listing.hoa === preferences.hoa
            ? "match-in-comparison-table"
            : "not-a-match-in-comparision-table"
        }
      >
        {listing.hoa === true ? "Yes" : "No"}
      </Table.Td>
      <Table.Td
        className={
          listing.garage === preferences.garage
            ? "match-in-comparison-table"
            : "not-a-match-in-comparision-table"
        }
      >
        {listing.garage === true ? "Yes" : "No"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
    { errorMessage && <Text c="red" >{errorMessage}</Text>}
      <Table.ScrollContainer maxWidth={500}>
        <Table striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>
                <Group>
                  <Tooltip label="Matches your Checklist">
                    <ColorSwatch color="var(--mantine-color-green-light-color)">
                      ✔️
                    </ColorSwatch>
                  </Tooltip>

                  <Tooltip label="Does not match your Checklist">
                    <ColorSwatch color="var(--mantine-color-red-8)">
                      X
                    </ColorSwatch>
                  </Tooltip>
                </Group>
              </Table.Th>
              <Table.Th>Price</Table.Th>
              <Table.Th>SQ Footage</Table.Th>
              <Table.Th>Bedrooms</Table.Th>
              <Table.Th>Bathrooms</Table.Th>
              <Table.Th>HOA</Table.Th>
              <Table.Th>Garage</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="checklist-row-in-comparison-table">
                My Checklist
              </Table.Th>
              <Table.Th className="checklist-row-in-comparison-table">
                Price
              </Table.Th>
              <Table.Th className="checklist-row-in-comparison-table">
                SQ Footage
              </Table.Th>
              <Table.Th className="checklist-row-in-comparison-table">
                {preferences.bedrooms}
              </Table.Th>
              <Table.Th className="checklist-row-in-comparison-table">
                {preferences.bathrooms}
              </Table.Th>
              <Table.Th className="checklist-row-in-comparison-table">
                {preferences.hoa === true ? "Yes" : "No"}
              </Table.Th>
              <Table.Th className="checklist-row-in-comparison-table">
                {preferences.garage === true ? "Yes" : "No"}
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </>
  );
}
