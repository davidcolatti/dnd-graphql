import { gql } from "@apollo/client";

export const ADD_CONTACT = gql`
  mutation addContact($name: String!, $city: String!, $state: String!) {
    addContact(name: $name, city: $city, state: $state) {
      id
      name
      city
      state
    }
  }
`;

export const EDIT_CONTACT = gql`
  mutation editContact(
    $id: String!
    $name: String
    $city: String
    $state: String
  ) {
    editContact(id: $id, name: $name, city: $city, state: $state) {
      id
      name
      city
      state
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation updateContact(
    $id: String!
    $destinationIdx: Int!
    $sourceIdx: Int!
  ) {
    updateContact(
      id: $id
      destinationIdx: $destinationIdx
      sourceIdx: $sourceIdx
    ) {
      id
      name
      city
      state
    }
  }
`;
