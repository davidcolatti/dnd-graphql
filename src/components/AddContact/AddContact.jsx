import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../../api/mutations";
import "./addcontact.css";

const AddContact = () => {
  const [fields, setFields] = useState({
    name: "",
    city: "",
    state: "",
  });

  const [addContact] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      cache.modify({
        fields: {
          contacts(existingContacts = []) {
            const newContactRef = cache.writeFragment({
              data: addContact,
              fragment: gql`
                fragment NewContact on Contact {
                  id
                  name
                  city
                  state
                }
              `,
            });
            return [...existingContacts, newContactRef];
          },
        },
      });
    },
  });

  function handleChange(e) {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className="contact-form">
      <label>Name</label>
      <input onChange={(e) => handleChange(e)} type="text" name="name" />
      <label>City</label>
      <input onChange={(e) => handleChange(e)} type="text" name="city" />
      <label>State</label>
      <input onChange={(e) => handleChange(e)} type="text" name="state" />
      <button onClick={() => addContact({ variables: fields })}>
        Add Contact
      </button>
    </div>
  );
};

export default AddContact;
