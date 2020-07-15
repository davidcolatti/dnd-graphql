import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
  query {
    contacts {
      id
      name
      city
      state
    }
  }
`;
