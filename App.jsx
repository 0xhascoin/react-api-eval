import { useState, useEffect } from 'react'
// import './App.css'
import axios from 'axios';

function App() {

  const [contactsData, setContactsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateDetails = async () => {
    try {
      // Destructure each value of the contactsData state
      const { id, salutation, foreName, surname, telephone } = contactsData;

      // Send the put request
      const { data } = await axios.put(`https://localhost:7075/api/Contacts/${id}`, { salutation, foreName, surname, telephone });

      // Print the returned result
      console.log("Data: ", data);

      // Re-run the getFirstRecord to automatically update the state across the app
      await getFirstRecord()
    } catch (error) {
      console.error(error);
    }
  }

  const deleteContact = async () => {
    try {
      // Send the delete request and pass it the id of the one record in our state
      const { data } = await axios.delete(`https://localhost:7075/api/Contacts/${contactsData.id}`);
      
      // Show an alert that says data.forename was deleted
      alert(`${data.foreName} was deleted.`);
    } catch (error) {
      console.error(error);
    }
  }

  const getFirstRecord = async () => {
    try {
      // Start loading
      setLoading(true);

      const { data } = await axios.get("https://localhost:7075/api/Contacts");
      console.log("Response: ", data);

      // Save the first contact into the state
      setContactsData(data[0]);

      // Finish loading
      setLoading(false);
    } catch (error) {
      console.error(error); // Print the error
    }
  }

  useEffect(() => {
    // Get the first contact in the database
    const getFirst = async () => {
      try {
        // Start loading
        setLoading(true);

        const { data } = await axios.get("https://localhost:7075/api/Contacts");
        console.log("Response: ", data);

        // Save the first contact into the state
        setContactsData(data[0]);

        // Finish loading
        setLoading(false);
      } catch (error) {
        console.error(error); // Print the error
      }
    }

    getFirst();
  }, []);

  // Return loading text while loading
  if (loading) return <h1>Loading.....</h1>

  return (
    <div className="App">
      {/* Check that the array isn't empty, if it is return a single h1 */}
      {contactsData ? (
        <div>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: '10px' }}>Salutation</p>
            <input
              type="text"
              placeholder='Salutation'
              value={contactsData.salutation}
              onChange={(e) => setContactsData({ ...contactsData, salutation: e.target.value })} />
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: '10px' }}>Forename</p>
            <input
              type="text"
              placeholder='Forename'
              value={contactsData.foreName}
              onChange={(e) => setContactsData({ ...contactsData, foreName: e.target.value })} />
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: '10px' }}>Surname</p>
            <input
              type="text"
              placeholder='Surname'
              value={contactsData.surname}
              onChange={(e) => setContactsData({ ...contactsData, surname: e.target.value })} />
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ marginRight: '10px' }}>Telephone #</p>
            <input
              type="text"
              placeholder='Telephone #'
              value={contactsData.telephone}
              onChange={(e) => setContactsData({ ...contactsData, telephone: e.target.value })} />
          </div>

          <button type='button' onClick={updateDetails}>Update Contact</button>
          <button type='button' onClick={deleteContact}>Delete Contact</button>
        </div>
      ) : <h1>No data found.</h1>}
    </div>
  )
}

export default App
