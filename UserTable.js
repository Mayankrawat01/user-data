import React, { useState, useEffect, useRef } from "react";
import DeleteModal from './DeleteModal'
import "./UserTable.css";

const UserTable = () => {
  const [users, setusers] = useState([]);
const[Modal,setModal] = useState(false);
const [selectId, setseledtId]= useState(null);
const selectIdRef = useRef(null);
 
  const fetchData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      console.error("Error");
      return [];
    }
    const data = await response.json();
    return data;
  };
  useEffect(()=>{
    const fetchUserData = async () => {
      const userData = await fetchData();
      setusers(userData);
    };

    fetchUserData();
  },[])

  const handleLogout = ()=>{
    localStorage.clear();
    window.location.reload();
  }
  const openModal = (userId) =>{
    selectIdRef.current = userId;
    setModal(true);
  }
  const closeModal = ()=>{
    setseledtId(null);
    setModal(false);
  }
  
  const deleteUser =()=>{
    const updateValue  = users.filter ((user)=> user.id !== selectIdRef.current);
    setusers(updateValue);
    closeModal();
  }
 

const utils = ['ID', 'Name', 'Email', 'City', 'Company Name']
  return (
    <div className="user-table-container">
      <h2>User Table</h2>
      <table className="user-table">
        <thead>
          <tr>
            {utils.map((item) => <th key={item}>{item}</th>)}
   
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
<td>{user.id}</td>
<td>{user.name}</td>
<td>{user.email}</td>
<td>{user.address.city}</td>
<td>{user.company.name}</td>
<td>
  <button onClick={() => openModal(user.id)}>Delete</button>
              </td>
</tr>    
          ))}
</tbody>
</table>
<button onClick={handleLogout}>Close</button>
<DeleteModal isOpen={Modal} onClose={closeModal} onDelete={deleteUser} />

</div>
  );
};

export default UserTable;
