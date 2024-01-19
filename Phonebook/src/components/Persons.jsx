import numbers from "../services/numbers";
function Persons({ persons, filter, stateChanger }) {
  const handleDelete = (person) => {
    const message = `Delete ${person.name} ?`;
    if (confirm(message)) {
      const remainingPersons = persons.filter(
        (element) => element.id !== person.id
      );
      numbers
        .deletePersonWithId(person.id)
        .then(stateChanger(remainingPersons));
    }
  };
  return (
    <>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(filter.toLowerCase()))
          return (
            <div key={person.name}>
              {`${person.name} ${person.number}`}
              <button onClick={() => handleDelete(person)}>Delete</button>
            </div>
          );
      })}
    </>
  );
}
export default Persons;
