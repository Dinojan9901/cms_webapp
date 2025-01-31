import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const AllContact = () => {
    const [loading, setLoading] = useState(false);
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
    
    
    return (
      <>
        <div>
          <h1>Your Contacts</h1>
    <hr className="my-4" />
        {loading ? <Spinner splash="Loading Contacts..." />: (<table className="table table-hover">
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
        <tr key={contact._id}>
            <th scope="row">{contact.name}</th>
            <td>{contact.address}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
        </tr>
    ))}
    {/*<tr>
      <th scope="row">Active</th>
      <td>Column content</td>
      <td>Column content</td>
      <td>Column content</td>
    </tr> */}
    
  </tbody>
</table>) }
    
    
     </div></>);
  };
  
  export default AllContact;