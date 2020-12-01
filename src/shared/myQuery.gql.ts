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

  static LOGIN = gql`
    mutation Login($nationalNO: String!, $password: String!) {
      login(nationalNO: $nationalNO, password: $password) {
        accessToken
        user {
          firstName
          lastName
        }
      }
    }
  `;
}
