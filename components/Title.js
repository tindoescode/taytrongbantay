const Title = ({children, style = 'green'}) => {
    return (
        <div className={`p-2 bg-${style}-400 text-white font-bold border-1 border-green-400`}>
            {children}
        </div>
    )
}

export default Title
