export interface GraphQLQuery {
  query: string;
  variables: { getProductId: string } | {};
  operationName: string;
}