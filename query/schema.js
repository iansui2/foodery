import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($filter: FilterFindOneProductInput) {
    viewer {
      product(filter: $filter) {
        name
        unitPrice
        unitsInStock
        unitsOnOrder
      }
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts {
    viewer {
      productList {
        _id
        name
        unitPrice
        unitsInStock
        unitsOnOrder
      }
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation CreateProduct($record: CreateOneProductInput!) {
    createProduct(record: $record) {
      recordId,
      record {
        name,
        unitPrice,
        unitsInStock,
        unitsOnOrder
      }
    }
  }
  `

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: MongoID!, $record: UpdateByIdProductInput!) {
    updateProduct(_id: $id, record: $record) {
      recordId,
      record {
        name,
        quantityPerUnit,
        unitPrice,
        unitsInStock,
        unitsOnOrder
      }
    }
  }
  `

export const REMOVE_PRODUCT = gql`
  mutation RemoveProduct($filter: FilterRemoveOneProductInput) {
    removeProduct(filter: $filter) {
      recordId
    }
}`  
