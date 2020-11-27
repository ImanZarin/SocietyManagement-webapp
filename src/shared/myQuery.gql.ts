import { gql } from "@apollo/client";

export class myGQL {
  static GET_USERS_VACANTS = gql`
    query users($role: String!) {
      users(role: $role) {
        firstName
        lastName
        email
        phone
        position
        _id
        house {
          _id
          flatNo
        }
      }
      vacants(role: $role) {
        _id
        flatNo
      }
    }
  `;

  static GET_STAFF = gql`
    query users($role: String!) {
      users(role: $role) {
        firstName
        lastName
        email
        phone
        position
        _id
      }
    }
  `;

  static CREATE_USER = gql`
    mutation CreateUser($userInput: UserInput!) {
      createUser(userInput: $userInput)
    }
  `;

  static UPDATE_USER = gql`
    mutation UpdateUser($userInput: UserUpdateInput!) {
      updateUser(userInput: $userInput)
    }
  `;

  static DELETE_USER = gql`
    mutation DeleteUser($userId: String!) {
      deleteUser(userId: $userId)
    }
  `;

  static DELETE_USER2 = gql`
    mutation {
      deleteUser(userId: "5fbfc40db825270500ab2edb")
    }
  `;
}
