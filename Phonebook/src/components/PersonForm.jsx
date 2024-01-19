function PersonForm({
  handleSubmit,
  newName,
  handleNameChange,
  newPhone,
  handlePhoneChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhoneChange}></input>{" "}
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
export default PersonForm;
