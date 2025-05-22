import React, { useState } from "react";
import UserForm from "./Userform";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Eugene Stepanov", phone: "+1 (555) 123-4567", email: "eugene.stepanov@example.com", role: "Admin", address: "123 Main St", status: "No" },
    { id: 2, name: "Jane Smith", phone: "+1 (555) 987-6543", email: "jane.smith@example.com", role: "User", address: "456 Oak Ave", status: "Yes" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsViewOnly(false);
    setShowForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsViewOnly(false);
    setShowForm(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setIsViewOnly(true);
    setShowForm(true);
  };

  const handleSaveUser = (formData) => {
    if (selectedUser) {
      // Edit existing user
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...formData } : user)));
    } else {
      // Add new user
      setUsers([...users, { id: users.length + 1, ...formData }]);
    }
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="user-management">
      <div className="user-management-header">
        <h2>User Management</h2>
        <button className="new-btn" onClick={handleAddUser}>New</button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Role</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.address}</td>
              <td>{user.status}</td>
              <td>
                <button className="action-btn view-btn" onClick={() => handleViewUser(user)}>View</button>
                <button className="action-btn edit-btn" onClick={() => handleEditUser(user)}>Edit</button>
                <button className="action-btn delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <UserForm
          user={selectedUser}
          onSave={handleSaveUser}
          onCancel={handleCancel}
          isViewOnly={isViewOnly}
        />
      )}
    </div>
  );
};

export default UserManagement;