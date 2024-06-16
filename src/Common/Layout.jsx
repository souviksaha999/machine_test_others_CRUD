import React from 'react'
import Nav from './Nav'

export default function ({children}) {
  return (
    <>
        <Nav />

        <main>
            {children}
        </main>
    </>
  )
}
