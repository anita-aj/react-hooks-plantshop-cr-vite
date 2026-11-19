import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // All plants from the backend
  const [plants, setPlants] = useState([]);

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

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search />
      <PlantList plants={plants} />
    </main>
  );
}

export default PlantPage;