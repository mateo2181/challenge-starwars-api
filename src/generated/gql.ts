/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query Home {\n    allPeople {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n": types.HomeDocument,
    "\n  query Person($id: ID) {\n    person(id: $id) {\n      id,\n      name,\n      birthYear,\n      species {\n        averageHeight\n      },\n      filmConnection {\n        films {\n          producers\n        }\n        totalCount\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n": types.PersonDocument,
    "\n  query PersonWithFilm($id: ID, $first: Int, $last: Int, $after: String, $before: String) {\n    person(id: $id) {\n      filmConnection(first: $first, last: $last, after: $after, before: $before) {\n        films {\n          id\n          title\n          releaseDate\n          planetConnection {\n            planets {\n              surfaceWater\n            }\n          }\n        }\n        totalCount\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n": types.PersonWithFilmDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Home {\n    allPeople {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Home {\n    allPeople {\n      edges {\n        node {\n          id\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Person($id: ID) {\n    person(id: $id) {\n      id,\n      name,\n      birthYear,\n      species {\n        averageHeight\n      },\n      filmConnection {\n        films {\n          producers\n        }\n        totalCount\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Person($id: ID) {\n    person(id: $id) {\n      id,\n      name,\n      birthYear,\n      species {\n        averageHeight\n      },\n      filmConnection {\n        films {\n          producers\n        }\n        totalCount\n        pageInfo {\n          hasNextPage\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PersonWithFilm($id: ID, $first: Int, $last: Int, $after: String, $before: String) {\n    person(id: $id) {\n      filmConnection(first: $first, last: $last, after: $after, before: $before) {\n        films {\n          id\n          title\n          releaseDate\n          planetConnection {\n            planets {\n              surfaceWater\n            }\n          }\n        }\n        totalCount\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PersonWithFilm($id: ID, $first: Int, $last: Int, $after: String, $before: String) {\n    person(id: $id) {\n      filmConnection(first: $first, last: $last, after: $after, before: $before) {\n        films {\n          id\n          title\n          releaseDate\n          planetConnection {\n            planets {\n              surfaceWater\n            }\n          }\n        }\n        totalCount\n        pageInfo {\n          hasNextPage\n          hasPreviousPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;