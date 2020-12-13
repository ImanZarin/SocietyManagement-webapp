import { gql } from "@apollo/client";

export class myGQL {
  static GET_USERS_VACANTS = gql`
    query users($role: String!) {
      users(role: $role) {
        firstName
        lastName
        email
        phone
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

  static GET_ELECTIONS = gql`
    query {
      elections {
        _id
        title
        start
        end
        options {
          name
        }
      }
    }
  `;

  static CREATE_ELECTION = gql`
    mutation CreateElection($election: ElectionInput!) {
      createElection(election: $election)
    }
  `;

  static DELETE_ELECTION = gql`
    mutation DeleteElection($id: String!) {
      deleteElection(id: $id)
    }
  `;

  static GET_PROFILE = gql`
    query {
      vote {
        elections {
          _id
          title
          options {
            name
            percent
          }
          end
          start
        }
        votes {
          electionId
          vote
        }
      }
      user {
        firstName
        lastName
        phone
        email
        nationalNO
        house {
          flatNo
        }
      }
    }
  `;

  static VOTE_UPDATE = gql`
  mutation Vote($voteInput: VoteInput!){
    updateVote(voteInput: $voteInput) {
      elections {
        _id
        title
        options {
          name
          percent
        }
        end
        start
      }
      votes {
        electionId
        vote
      }
    }
  }
  `;
}
