import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IconHomeStar } from '@tabler/icons-react';
import { AddToCollection } from "./add-to-collection";
import { Card, SimpleGrid, Text, Badge, Button, Group,Image, Textarea } from "@mantine/core";

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
  halfBathrooms,
  notes,
  close,
  updateCollection
}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [addListing, setAddListing] = useState([]);
  const [preferences, setPreferences] = useState({
    bathrooms: 0,
    bedrooms: 0,
    garage: false,
    hoa: false,
    yard: false,
  });
  const [notesInput, setNotesInput] = useState("");

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


  const handleAddListingClick = () => {
    console.log("add listing button");
    setAddListing();
    axios
      .post(
        "https://homepare-backend.onrender.com/homes",
        {
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
        },
        {
          headers: {
            authorization: `x-access-token ${token}`,
          },
        }
      )
      .then(navigate("/")).catch((err) => {
        return setErrorMessage(err.response.data.message)
     });
  };

  const returnToSearch = () => {
    window.location.reload()
  }

  const handleSaveNotes = () => {
    // post notes to API
    axios
      .put(
        `https://homepare-backend.onrender.com/homes/${listingId}`,
        {
          notes: notesInput,
        },
        {
          headers: {
            authorization: `x-access-token ${token}`,
          },
        }
      )
      .then(close())
      .then(navigate("/"))
      .catch((err) => {
        return setErrorMessage(err.response.data.message)
     });
  };



  return (
    <>
    { errorMessage && <Text c="red" >{errorMessage}</Text>}
      <div className="detailsCard">
        <Card shadow="sm" padding="lg" m="lg" radius="md" withBorder >
          <Card.Section>
        {previewImage ? <Image src={previewImage} className="detailsCardImage" alt="thumbnail of home" /> : <Group justify="center"><IconHomeStar size={100} /></Group>}
          </Card.Section>
          <Text size="lg" fw={700} ta="center">
            {address}
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Property Type: {propertyType}
          </Text>
          <Group justify="space-between" mt="md" mb="xs">
            <Badge size="lg" color="var(--mantine-color-dark-8)">PRICE: ${price}</Badge>
            <Badge size="lg" color="var(--mantine-color-dark-8)">
              SQ Footage: {squareFootage}
            </Badge>
          </Group>
          <SimpleGrid
            cols={2}
            spacing="xs"
            verticalSpacing="xs"
            style={{ marginTop: 14 }}
          >
            <div>
              <Text size="md" c="dimmed">
                {getCompareIcon(
                  bedrooms,
                  preferences.bedrooms
                )} Bedrooms: {`${bedrooms} `}
              </Text>
            </div>
            <div>
              <Text size="md" c="dimmed" ta="right">
              {getCompareIcon(bathrooms, preferences.bathrooms)} Bathrooms: {`${bathrooms} `}
              </Text>
            </div>

            <div>
              <Text size="md" c="dimmed">
              {getCompareIcon(hoa, preferences.hoa)} HOA: {preferences.hoa === true ? "Yes" : "No"}
                
              </Text>
            </div>
            <div>
              <Text size="md" c="dimmed" ta="right">
              {getCompareIcon(garage, preferences.garage)} Garage: {preferences.garage === true ? "Yes" : "No"}
              </Text>
            </div>
          </SimpleGrid>
          {inMyListing ? (
            <>
              <Text size="sm">{notes}</Text>
              
              <>
              <Textarea
                placeholder="Add your notes here"
                label="Notes:"
                autosize
                minRows={2}
                style={{ marginTop: 14 }}
                onChange={(e) => setNotesInput(e.target.value)}
              />
              <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                style={{ marginBottom: 14 }}
                onClick={handleSaveNotes}
              >
                Save Notes
              </Button> 
              </> 

              <AddToCollection listingId={listingId} token={token}
              updateCollection={updateCollection} />
            </>
          ) : (
            <>
            <Button
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={handleAddListingClick}
            >
              Add to My Listings
            </Button>
            <Button
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={returnToSearch}
            >
              Cancel
            </Button>
            </>
          )}
        </Card>
      </div>
    </> 
  );
}

const getCompareIcon = (a,b) => {
  if(a === b) return "✅";
  else return "❌";
}



