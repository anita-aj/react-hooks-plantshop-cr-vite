import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // All plants from the backend
  const [plants, setPlants] = useState([]);
  // What the user has typed in the search box
  const [searchTerm, setSearchTerm] = useState("");

  // GET: load all plants once, when the page first renders
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  // Add the plant returned by the server to the end of the list
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Show only plants whose name contains the search term (case-insensitive).
  // An empty search term matches every plant, so clearing the box shows all.
  const plantsToDisplay = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={plantsToDisplay} />
    </main>
  );
}

export default PlantPage;