import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "../components/styles/DataDisplay.css";

const azureAppServicesURL = process.env.REACT_APP_AZURE_APP_SERVICES_URL;

const DataDisplay = ({ label, parameter }) => {
  const [data, setData] = useState(null);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInterval = 1000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${azureAppServicesURL}/latest/${parameter}`
        );

        setData(response.data.value);
        setTime(response.data.time);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, fetchInterval);

    return () => clearInterval(intervalId);
  }, [parameter]);

  return (
    <div className="data-display">
      <h3>{label}</h3>
      {loading && <div>Loading...</div>}
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div>
          <div>Value: {data !== null ? data : "No data"}</div>
          <div>
            Measured At: {time ? new Date(time).toLocaleString() : "Unknown"}
          </div>
        </div>
      )}
    </div>
  );
};

DataDisplay.propTypes = {
  label: PropTypes.string.isRequired,
  parameter: PropTypes.string.isRequired,
};

export default DataDisplay;
