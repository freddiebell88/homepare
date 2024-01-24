import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  SimpleGrid,
  Text,
  Badge,
  Button,
  Group,
  Image,
  Textarea,
} from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

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
  close,
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
    // post listing to db
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
      .then(close()).catch((err) => {
        return setErrorMessage(err.response.data.message)
     });
  };



  return (
    <>
      <div className="detailsCard">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Image src={previewImage} alt="thumbnail of home" />
          </Card.Section>
          <Text size="lg" fw={700} ta="center">
            {address}
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            Property Type: {propertyType}
          </Text>
          <Group justify="space-between" mt="md" mb="xs">
            <Badge color="var(--mantine-color-dark-8)">PRICE: ${price}</Badge>
            <Badge color="var(--mantine-color-dark-8)">
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
                Bedrooms:{" "}
                {`${bedrooms} ${getCompareIcon(
                  bedrooms,
                  preferences.bedrooms
                )}`}{" "}
              </Text>
            </div>
            <div>
              <Text size="md" c="dimmed" ta="right">
                Bathrooms:{" "} {`${bathrooms} ${getCompareIcon(bathrooms, preferences.bathrooms)}`}
              </Text>
            </div>

            <div>
              <Text size="md" c="dimmed">
                HOA: {getCompareIcon(hoa, preferences.hoa)}
              </Text>
            </div>
            <div>
              <Text size="md" c="dimmed" ta="right">
                Garage: {getCompareIcon(garage, preferences.garage)}
              </Text>
            </div>
          </SimpleGrid>
          {inMyListing ? (
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
                Save
              </Button>

              <AddToCollection listingId={listingId} token={token} />
            </>
          ) : (
            <Button
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={handleAddListingClick}
            >
              Add to My Listings
            </Button>
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

export function AddToCollection({ close, token, listingId }) {
  const [myCollections, setMyCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    search_name: "",
  });


    useEffect(() => {
      axios
        .get("https://homepare-backend.onrender.com/collections", {
          headers: {
            authorization: `x-access-token ${token}`,
          },
        })
        .then((res) => {
          setMyCollections(res.data.search);
          console.log(`collections data ${res.data.search}`);
          console.log(myCollections);
        }).catch((err) => {
          return setErrorMessage(err.response.data.message)
       });
    }, []);

    const handleCollectionChange = (e) => {
      setForm({
        ...form,
        _id: e.target.value,
        houseID: listingId,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const selectedCollection = myCollections.find(
        (collection) => collection._id === form._id
      );
      console.log(selectedCollection);
      selectedCollection.houseID.push(listingId);
      axios
        .put(
          `https://homepare-backend.onrender.com/collections/${form._id}`,
          { ...selectedCollection },
          {
            headers: {
              authorization: `x-access-token ${token}`,
            },
          }
        )
        .then(console.log(myCollections))
        .then(close()).catch((err) => {
          return setErrorMessage(err.response.data.message)
       });
    };

    return (
      <>
        <form method="post" onSubmit={handleSubmit}>
          <label>
            <select
              value={selectedCollection}
              onChange={handleCollectionChange}
            >
              <option>Add To Collection</option>
              {myCollections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.search_name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add</button>
        </form>
      </>
    );
  }

