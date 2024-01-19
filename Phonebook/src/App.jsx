import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import numbers from "./services/numbers";
import AddedNotification from "./components/AddedNotification";
import AlreadyRemovedNotification from "./components/AlreadyRemovedNotification";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [addedMessage, setAddedMessage] = useState(null);
  const [alreadyRemovedMessage, setAlreadyRemovedMessage] = useState(null);

  const hook = () => {
    numbers.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  };
  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newPhone,
    };

    const isInArray = persons.some(
      (person) =>
        JSON.stringify(person.name) === JSON.stringify(personObject.name)
    );

    if (isInArray) {
      // alert(`${newName} is already added to the phonebook`);
      //update number
      const updateMessage = `${personObject.name} is already added to phonebook, replace the old number with a new one ?`;
      if (confirm(updateMessage)) {
        const idToUpdate = persons.find(
          (person) => person.name == personObject.name
        ).id;
        const updatedPersons = persons;
        updatedPersons[idToUpdate - 1].number = personObject.number;
        numbers
          .updatePerson(idToUpdate, personObject)
          .then(setPersons(updatedPersons))
          .catch(() => {
            setAlreadyRemovedMessage(
              `Information of ${personObject.name} has already been removed from server.`
            );
            // const remainingPersons = persons.filter(
            //   (element) => element.name !== personObject.name
            // );
            // setPersons(remainingPersons);
            setTimeout(() => {
              setAlreadyRemovedMessage(null);
            }, 5000);
          });
      }
    } else {
      numbers
        .create(personObject)
        .then((personObject) => {
          setPersons(persons.concat(personObject));
        })
        .then(() => {
          setAddedMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setAddedMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewPhone("");
  };

  return (
    <>
      <div>
        <h2>Phonebook</h2>
        <AddedNotification message={addedMessage}></AddedNotification>
        <AlreadyRemovedNotification
          message={alreadyRemovedMessage}
        ></AlreadyRemovedNotification>
        <Filter
          filter={filter}
          handleFilterChange={handleFilterChange}
        ></Filter>
        <h2>Add a new person</h2>
        <PersonForm
          handleSubmit={handleSubmit}
          newName={newName}
          handleNameChange={handleNameChange}
          newPhone={newPhone}
          handlePhoneChange={handlePhoneChange}
        ></PersonForm>
        <h2>Numbers</h2>
        <Persons
          persons={persons}
          filter={filter}
          stateChanger={setPersons}
        ></Persons>
      </div>
    </>
  );
}

export default App;
