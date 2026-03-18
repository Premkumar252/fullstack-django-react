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
    axios.post("http://127.0.0.1:8000/insert/", {
      name,
      age,
      email
    })
    .then(() => {
      alert("Inserted");
      fetchData(); // auto refresh
    });
  };

  const fetchData = () => {
    axios.get("http://127.0.0.1:8000/students/")
      .then(res => setStudents(res.data));
  };

  const filterData = () => {
    axios.get(`http://127.0.0.1:8000/filter/?name=${filter}`)
      .then(res => setStudents(res.data));
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