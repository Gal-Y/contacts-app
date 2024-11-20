import React, { useEffect, useState } from "react";
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch contacts from JSONPlaceholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error fetching contacts:", error));
  }, []);

  // Filter contacts based on search input
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Contacts</h1>
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </header>
      <div className="contacts-container">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="contact-card">
              <h2>{contact.name}</h2>
              <p>
                <strong>Email:</strong> {contact.email}
              </p>
              <p>
                <strong>Phone:</strong> {contact.phone}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={`http://${contact.website}`} target="_blank" rel="noreferrer">
                  {contact.website}
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No contacts found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
