import React from 'react'

const style = [
    'normal', 'purple'
]

const Title = ({children, style = 'normal'}) => {
    const bg = style === 'normal' ? 'bg-green-400' : 'bg-purple-400'
    const ring = style === 'normal' ? 'ring-green-400' : 'ring-purple-400'

    return (
        <div className={`p-2 ${bg} text-white font-bold ring-1 ${ring}`}>
            {children}
        </div>
    )
}

export default Title
