import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
    return (
        <div>
            <h1>This page is not found</h1>
            <Link to='/'>Go To Home</Link>
        </div>
    )
}

export default PageNotFound
