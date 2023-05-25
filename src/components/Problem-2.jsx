import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const Problem2 = () => {
  const [modalAOpen, setModalAOpen] = useState(false);
  const [modalBOpen, setModalBOpen] = useState(false);
  const [modalCOpen, setModalCOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [modalCInfo, setModalCInfo] = useState({});

  const handleAllContacts = () => {
    setModalAOpen(true);
    setModalBOpen(false);
  }

  const handleUSContacts = () => {
    setModalAOpen(false);
    setModalBOpen(true);
  }

  const fetchContacts = () => {
    fetch(`https://contact.mediusware.com/api/contacts/`)
    .then((response) => response.json())
    .then((data) => setContacts(data.results));
  }

  const searchContacts = (searchItem=null) => {
    fetch(`https://contact.mediusware.com/api/contacts/?search=${searchItem}`)
    .then((response) => response.json())
    .then((data) => setContacts(data.results));
  }

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleModalAOpen = () => {
    setModalAOpen(true);
  };

  const handleModalBOpen = () => {
    setModalBOpen(true);
  };

  const handleModalCOpen = (event, contact) => {
    setModalCOpen(true); 
    setModalCInfo(contact)
  }

  const handleModalClose = () => {
    setModalAOpen(false);
    setModalBOpen(false);
    setModalCOpen(false);
  };

  const handleCheckboxChange = (event) => {
    if(event.target.checked){
        setContacts(
            contacts.filter((contact) => {
              return (
                (event.target.checked && contact.id % 2 === 0) ||
                !event.target.checked
              );
            })
          );
    } else{
        fetchContacts();
    }
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
        searchContacts(event.target.value.toLowerCase())
    }
  };

  const handleSearchChange = event => {
    setTimeout(() => {
        searchContacts(event.target.value.toLowerCase())
    }, 500)
  };


  const handleContactClick = (contact) => {
    setModalCOpen(true);
    setModalContact(contact);
  };

  const [modalContact, setModalContact] = useState(null);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-lg btn-outline-primary" type="button" onClick={handleModalAOpen}>
            All Contacts
          </button>
          <button className="btn btn-lg btn-outline-warning" type="button" onClick={handleModalBOpen}>
            US Contacts
          </button>
        </div>
      </div>
      <Modal isOpen={modalAOpen} onRequestClose={handleModalClose}>
        <h1>Contacts</h1>
        <ul>
          {contacts.map((contact) => (
            <li onClick={(event) => handleModalCOpen(event, contact)}  key={contact.id}>{contact.phone}</li>
          ))}
        </ul>
        <input
          type="checkbox"
          id="only-even"
          checked={contacts.every((contact) => contact.id % 2 === 0)}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="only-even">Only even</label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          onKeyDown={handleKeyDown}
          style={{ display: 'block' }}
          onChange={handleSearchChange}
        />
       <div style={{flex: 'column'}}>
       <button style={{backgroundColor: "#46139f", color: "#fff"}} onClick={handleAllContacts}>All Contacts</button>
        <button style={{ backgroundColor: "#ff7f50", color: "#fff"}} onClick={handleUSContacts}>US Contacts</button>
        <button onClick={handleModalClose}>Close</button>
       </div>
      </Modal>
      <Modal isOpen={modalBOpen} onRequestClose={handleModalClose}>
        <h1>US Contacts</h1>
        <ul>
          {contacts
            .filter((contact) => contact.country.name === "United States")
            .map((contact) => (
              <li onClick={(contact) => handleModalCOpen(contact)} key={contact.id}>{contact.phone}</li>
            ))}
        </ul>
        <input
          type="checkbox"
          id="only-even"
          checked={contacts.every((contact) => contact.id % 2 === 0)}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="only-even">Only even</label>
        <input
          type="text"
          id="search"
          placeholder="Search"
          onKeyUp={handleSearchChange}
          style={{ display: 'block' }}
        />
        <div style={{ flex: "column"}}>
        <button style={{backgroundColor: "#46139f", color: "#fff"}} onClick={handleAllContacts}>All Contacts</button>
        <button style={{backgroundColor: "#ff7f50", color: "#fff"}} onClick={handleUSContacts}>US Contacts</button>
        <button onClick={handleModalClose}>Close</button>
        </div>
      </Modal>
      <Modal isOpen={modalCOpen} onRequestClose={handleModalClose}>
        <h1>{modalCInfo?.name}</h1>
        <ul>
          <li>ID: {modalCInfo?.id}</li>
          <li>Phone: {modalCInfo?.phone}</li>
          <li>Country: {modalCInfo?.country?.name}</li>
        </ul>
      </Modal>
    </div>
  );
};

export default Problem2;
