import React from 'react'

const page = () => {
    return (
        <div className='p-8 min-h-screen bg-gradient-to-br from-dark-400 via-black-500 to-red-500'>
            <div className='grid grid-cols-6 gap-4'>
                <div className='bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>Product 1</div>
                <div className='bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>Product 2</div>
                <div className='bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>Product 3</div>
                <div className='bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>Product 4</div>
                <div className='bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>Product 5</div>
                <div className='bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-4 shadow-lg hover:bg-white/30 transition-all duration-300'>Product 6</div>
            </div>
        </div>
    )
}

export default page
