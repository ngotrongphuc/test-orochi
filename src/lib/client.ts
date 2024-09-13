import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { getServerSession } from 'next-auth'
import { authOptions } from './authOption'

const httpLink = createHttpLink({
  uri: process.env.BACKEND_API,
})

const authLink = setContext(async (_, { headers }) => {
  const session = await getServerSession(authOptions)
  if (session) {
    return {
      headers: {
        ...headers,
        authorization: session ? `Bearer ${session.accessToken}` : '',
      },
    }
  }
})
//TODO: Error handling when token expires
// const errorLink = onError(
//   ({ graphQLErrors, networkError, operation, forward }) => {
//     if (graphQLErrors) {
//       for (let err of graphQLErrors) {
//         switch (err.extensions.code) {
//           case 'UNAUTHENTICATED':
//             return fromPromise(
//               getNewToken().catch((error) => {
//                 // Handle token refresh errors e.g clear stored tokens, redirect to login
//                 return
//               }),
//             )
//               .filter((value) => Boolean(value))
//               .flatMap((accessToken) => {
//                 const oldHeaders = operation.getContext().headers
//                 // modify the operation context with a new token
//                 operation.setContext({
//                   headers: {
//                     ...oldHeaders,
//                     authorization: `Bearer ${accessToken}`,
//                   },
//                 })

// retry the request, returning the new observable
// return forward(operation)
// })
//       }
//     }
//   }
// })

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  })
})
