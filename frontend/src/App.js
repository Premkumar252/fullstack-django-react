import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [filter, setFilter] = useState("");
  const [students, setStudents] = useState([]);

  const insertData = () => {
    if (!name.trim()) {
      alert("Please enter a name");
      return;
    }

    axios.post("http://localhost:8000/api/insert/", {
      name: name.trim(),
      age: age || "",
      email: email.trim()
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      alert("Inserted Successfully!");
      setName("");
      setAge("");
      setEmail("");
      fetchData(); // auto refresh
    })
    .catch(err => {
      const errorMsg = err.response?.data?.error || err.message || "Unknown error";
      alert("Error: " + errorMsg);
      console.error("Insert Error:", err);
    });
  };

  const fetchData = () => {
    axios.get("http://localhost:8000/api/students/")
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        const errorMsg = err.response?.data?.error || err.message || "Unknown error";
        alert("Error: " + errorMsg);
        console.error("Fetch Error:", err);
      });
  };

  const filterData = () => {
    axios.get(`http://localhost:8000/api/filter/?name=${encodeURIComponent(filter)}`)
      .then(res => setStudents(res.data))
      .catch(err => {
        const errorMsg = err.response?.data?.error || err.message || "Unknown error";
        alert("Error: " + errorMsg);
        console.error("Filter Error:", err);
      });
  };

  return (
    <div className="main">

      {/* LEFT SIDE */}
      <div className="left">

        <h2>Insert Data</h2>
        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Age" onChange={e => setAge(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />

        <button onClick={insertData}>Insert</button>

        <hr />

        <h2>Filter</h2>
        <input
          placeholder="Search Name"
          onChange={e => setFilter(e.target.value)}
        />

        <button onClick={filterData}>OK</button>
        <button className="secondary" onClick={fetchData}>Fetch All</button>

        <h2>Data</h2>
        <ul>
          {students.map((s, index) => (
            <li key={index}>
              {s.name} - {s.age} - {s.email}
            </li>
          ))}
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="right">

        <h2>Dashboard</h2>

        <div className="card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="card">
          <h3>Quick Actions</h3>
          <p>✔ Add new student</p>
          <p>✔ Search using filter</p>
          <p>✔ Refresh using Fetch All</p>
        </div>

        <div className="card">
          <h3>Latest Entry</h3>
          {students.length > 0 ? (
            <p>{students[students.length - 1].name}</p>
          ) : (
            <p>No data</p>
          )}
        </div>

      </div>

    </div>
  );
}

export default App;