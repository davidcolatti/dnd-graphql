import React from "react";
import { useQuery } from "@apollo/client";
import { ModalRoute, ModalContainer } from "react-router-modal";
import { GET_CONTACTS } from "./api/queries";
import "react-router-modal/css/react-router-modal.css";

import AddContact from "./components/AddContact/";
import ContactList from "./components/ContactList/";
import MyStatefulEditor from "./components/MyStatefulEditor/MyStatefulEditor";

const App = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <div className="app">
      <AddContact />
      <ContactList contacts={data.contacts} />

      <ModalContainer />

      <ModalRoute path="/:id" parentPath="/">
        <MyStatefulEditor />
      </ModalRoute>
    </div>
  );
};

export default App;
