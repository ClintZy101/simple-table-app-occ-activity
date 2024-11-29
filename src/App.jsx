import React, { useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: "", age: "" });
  const [editId, setEditId] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or Update entry
  const handleAddOrUpdate = () => {
    if (!formData.name.trim() || !formData.age.trim()) {
      alert("Both fields are required!");
      return;
    }

    if (editId) {
      // Update existing entry
      setData((prevData) =>
        prevData.map((item) =>
          item.id === editId ? { ...item, ...formData } : item
        )
      );
      setEditId(null); // Reset edit mode
    } else {
      // Add new entry
      setData([...data, { ...formData, id: Date.now() }]);
    }

    setFormData({ name: "", age: "" }); // Clear inputs
  };

  // Edit entry
  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    setFormData({ name: itemToEdit.name, age: itemToEdit.age });
    setEditId(id); // Set the ID for edit mode
  };

  // Delete entry
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Table with Edit</h1>

      {/* Input Form */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter Name"
          className="border p-2 mr-2"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          placeholder="Enter Age"
          className="border p-2 mr-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border p-2">{item.name}</td>
              <td className="border p-2">{item.age}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
