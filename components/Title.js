import React from 'react'

const style = [
    'normal', 'purple'
]

const Title = ({children, style = 'green'}) => {
    return (
        <div className={`p-2 bg-${style}-400 text-white font-bold ring-1 ring-${style}-400`}>
            {children}
        </div>
    )
}

export default Title
