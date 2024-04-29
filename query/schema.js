import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(where: { id: $id }) {
      id
      productName
      productDescription
      price
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      productName
      productDescription
      price
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($record: ProductCreateInput!) {
    createProduct(data: $record) {
      id,
      productName
      productDescription
      price
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $record: ProductUpdateInput!) {
    updateProduct(
      where: { id: $id }
      data: $record
    ) {
      id,
      productName
      productDescription
      price
    }
  }
`;

export const PUBLISH_PRODUCT = gql`
  mutation PublishProduct($id: ID!) {
    publishProduct(
      where: { id: $id }
    ) {
      id
      productName
      productDescription
      price
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`;
