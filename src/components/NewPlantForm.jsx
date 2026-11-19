import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  // Controlled form: React state holds what the user types
  const [formData, setFormData] = useState({ name: "", image: "", price: "" });

  // Update the matching field as the user types
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // POST the new plant to the server, then add it to state
  function handleSubmit(e) {
    e.preventDefault(); // stop the page from reloading

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price), // store price as a number
      }),
    })
      .then((r) => r.json())
      .then((newPlant) => {
        onAddPlant(newPlant);
        setFormData({ name: "", image: "", price: "" }); // clear the form
      });
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;