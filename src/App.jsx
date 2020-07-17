import React from "react";
import { useQuery } from "@apollo/client";
import { ModalRoute, ModalContainer } from "react-router-modal";
import styled from 'styled-components'
import { GET_CONTACTS } from "./api/queries";
import "react-router-modal/css/react-router-modal.css";

import AddContact from "./components/AddContact/";
import ContactList from "./components/ContactList/";
import MyStatefulEditor from "./components/MyStatefulEditor/MyStatefulEditor";

const AppBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`



const App = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <AppBody>
      <AddContact />
      <ContactList contacts={data.contacts} />

      <ModalContainer />

      <ModalRoute path="/:id" parentPath="/">
        <MyStatefulEditor />
      </ModalRoute>
    </AppBody>
  );
};

export default App;
