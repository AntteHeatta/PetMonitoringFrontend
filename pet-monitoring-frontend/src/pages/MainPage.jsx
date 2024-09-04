import DataDisplay from "../components/DataDisplay";

function MainPage() {
  return (
    <>
      <h1>Pet Monitoring</h1>
      <DataDisplay label="Temperature" parameter="temperature" />
      <DataDisplay label="Humidity" parameter="humidity" />
      <DataDisplay label="Luminosity" parameter="luminosity" />
      <DataDisplay label="Pressure" parameter="pressure" />
    </>
  );
}

export default MainPage;
