import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Text, Input, Button, Group } from "@mantine/core"
import { IconHomeEdit } from "@tabler/icons-react";

export function NewCollection( {token} ) {
    const [collectionInput, setCollectionInput] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
  
  
    const handleSaveCollection = (e) => {
      console.log("save button clicked");
      console.log(collectionInput);
      e.preventDefault();
      axios.post(
        "https://homepare-backend.onrender.com/collections",
        {
          search_name: collectionInput
        },
        {
          headers: {
            authorization: `x-access-token ${token}`
          },
        }
      ).then(navigate("/user-collections")).catch((err) => {
        return setErrorMessage(err.response.data.message)
     })
    };
  
    return (
      <>
      { errorMessage && <Text c="red" >{errorMessage}</Text>}
        <form onSubmit={handleSaveCollection}>
          <Group justify="right" m="sm">
          <Input
            type="text"
            placeholder="Add New Collection"
            onChange={(e) => setCollectionInput(e.target.value)}
            value={collectionInput}
            rightSection={<IconHomeEdit size={25} />}
            size="md"
          />
          <Button type="submit" size="md">Save</Button>
          </Group>
        </form>
      </>
    );
  }