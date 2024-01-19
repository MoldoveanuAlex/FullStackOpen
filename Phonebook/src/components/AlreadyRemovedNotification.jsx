const AlreadyRemovedNotification = ({message}) => {
    if(message === null) {
        return null
    } else {
        return (
            <div className="alreadyRemovedMessage">
                {message}
            </div>
        )
    }
}
export default AlreadyRemovedNotification