const AddedNotification = ({message}) => {
    if (message === null) {
        return null
    } else {
        return (
            <div className="addedMessage">
                {message}
            </div>
        )
    }
}
export default AddedNotification