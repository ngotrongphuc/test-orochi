'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { getSession } from 'next-auth/react'

function makeClient() {
  const httpLink = new HttpLink({
    // uri: process.env.OROCHI_WEBSITE_BACKEND_API,
    uri: process.env.NEXT_PUBLIC_OROCHI_WEBSITE_BACKEND_API,
  })

  const authLink = setContext(async (_, { headers }) => {
    return getSession().then((session) => {
      return {
        headers: {
          ...headers,
          authorization: session ? `Bearer ${session.accessToken}` : '',
        },
      }
    })
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link: ApolloLink.from([authLink, httpLink]),
  })
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
