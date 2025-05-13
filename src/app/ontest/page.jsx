"use client"
import React from 'react'

const ontest = () => {
    const [isDarkTheme, setIsDarkTheme] = React.useState("True");
    return (
        <div>
            <p>{isDarkTheme} The dark theme is on</p>
            <button className='bg-red-500' onClick={() => setIsDarkTheme("false")}>change it</button>
        </div>
    )
}

export default ontest
