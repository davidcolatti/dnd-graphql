import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "./api/queries";
import AddContact from "./components/AddContact/";
import ContactList from "./components/ContactList/";

const App = () => {
  const { loading, error, data } = useQuery(GET_CONTACTS);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <div className="app">
      <AddContact />
      <ContactList contacts={data.contacts} />
    </div>
  );
};

export default App;
