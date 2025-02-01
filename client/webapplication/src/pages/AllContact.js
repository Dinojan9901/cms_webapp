import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const AllContact = () => {
    const { toast } = useContext(ToastContext);

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [contacts, setContacts] = useState([]);

    useEffect( () => {
        const fetchContacts = async () => {
            setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/mycontacts`, {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const result = await res.json();
            if (!result.error) {
              
              setContacts(result.contacts); // Assuming result.contacts is the array
              setLoading(false);
            } else {
              console.log(result);
              setLoading(false);
            }
                } catch (err) {
            console.log(err);
          }
        };

        fetchContacts();
    }, []); // Empty dependency array ensures it runs once on mount
    
  const deleteContact = async (id) => {
    if (window.confirm("are you sure you want to delete this contact ?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
  } catch (err) {
        console.log(err);
  }
      }
    };

    return (
      <>
        <div>
          <h1>Your Contacts</h1>
    <hr className="my-4" />
        {loading ? ( <Spinner splash="Loading Contacts..." /> ) : (
          <>
          {contacts.length == 0 ? (
            <h3>No contacts created yet</h3>) : ( <>
          <table className="table table-hover">
  <thead>
    <tr className="table-dark">
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
    </tr>
  </thead>
  <tbody>
    {contacts.map((contact) => (
        <tr 
          key={contact._id} 
          onClick={() => {
              setModalData({});
              setModalData(contact);
              setShowModal(true);
            }}
          >
            <th scope="row">{contact.name}</th>
            <td>{contact.address}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
        </tr>
    ))}
    
  </tbody>
</table>
</>
)}
</>
) }
    
    
     </div>
     
     <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p><strong>Address</strong>: {modalData.address}</p>
          <p><strong>Email</strong>: {modalData.email}</p>
          <p><strong>Phone Number</strong>: {modalData.phone}</p>
        </Modal.Body>

        <Modal.Footer>
            <button
            className="btn btn-danger"
            onClick={() => deleteContact(modalData._id)}
          >
            Delete
          </button>
         <button className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>

     </>);
  };
  
  export default AllContact;