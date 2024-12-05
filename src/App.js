import {useState,useEffect} from 'react'
import './App.css';
//import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', age: '', email: '' });
  const [isEditing, setIsEditing] = useState(false);
  //const API_URL = 'http://localhost:5000/api/users';
  /*const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);*/
  
  // Handle form changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add or edit user
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setUsers(users.map(user => (user.id === formData.id ? formData : user)));
     /* await axios.put(`${API_URL}/${formData.id}`, {
        name: formData.name,
        age:formData.age,
        email: formData.email,
      });*/

    } else {
      /*await axios.post(API_URL, {
        name: formData.name,
        age: formData.age, 
        email: formData.email,
        id: Date.now()
      });*/
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, name: '',age : '',  email: '' });
    setIsEditing(false);
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    /*try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }*/
  };

  return (
    <div style={{ padding: '20px' }} className='section'>
      <h1 className='head'>User Database</h1>
      <div style={{ marginBottom: '20px' }}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ marginRight: '10px' }}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            style={{ marginRight: '10px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ marginRight: '10px' }}
          />
          <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
        </form>
      </div>
    {users.length > 0 && 
      <table border="1" cellPadding="10" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)} style={{ marginRight: '10px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
}
    </div>
  );

}

export default App;
