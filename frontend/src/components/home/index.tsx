import React from 'react'
import { useAuth } from '../AuthProvider'

interface User {
    displayName?: string
    email?: string
}

const Home: React.FC = () => {
    const { currentUser } = useAuth() as { currentUser: User } // Assuming currentUser is typed this way

    return (
        <div className='text-2xl font-bold pt-14'>
            Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.
        </div>
    )
}

export default Home
