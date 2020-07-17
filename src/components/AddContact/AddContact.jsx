import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { ADD_CONTACT } from "../../api/mutations";
import "./addcontact.scss";

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
    <div className="contact-box">
      <div className="input-box">
        <input
          type="text"
          name="name"
          required=""
          onChange={(e) => handleChange(e)}
        />
        <label>Name</label>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="city"
          required=""
          onChange={(e) => handleChange(e)}
        />
        <label>City</label>
      </div>
      <div className="input-box">
        <input
          type="text"
          name="state"
          required=""
          onChange={(e) => handleChange(e)}
        />
        <label>State</label>
      </div>
      <a onClick={() => addContact({ variables: fields })}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Add Contact
      </a>
    </div>
  );
};

export default AddContact;
