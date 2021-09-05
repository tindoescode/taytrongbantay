const ContentWrapper = ({children, style = 'green'}) => {
    return (
        <div className={`bg-${style}-50 p-3 shadow mb-2`}>
            {children}
        </div>
    )
}

export default ContentWrapper