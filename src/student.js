import React, { useState } from "react";
import "./student.css";

function Student() {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [marks, setMarks] = useState("");
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const getGrade = (m) => {
    if (m >= 90) return { label: "A+", color: "#2ecc71" };
    if (m >= 80) return { label: "A",  color: "#3a7bd5" };
    if (m >= 70) return { label: "B",  color: "#e6c200" };
    if (m >= 60) return { label: "C",  color: "#e8845a" };
    return           { label: "F",  color: "#cc0000" };
  };

  const handleSubmit = () => {
    if (name === "" || roll === "" || marks === "") return;
    const student = { name, roll, marks: Number(marks) };
    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = student;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, student]);
    }
    setName(""); setRoll(""); setMarks("");
  };

  const deleteStudent = (index) => {
    setStudents(students.filter((_, i) => i !== index));
  };

  const editStudent = (index) => {
    const s = students[index];
    setName(s.name); setRoll(s.roll); setMarks(s.marks);
    setEditIndex(index);
  };

  const avg = students.length
    ? (students.reduce((a, s) => a + s.marks, 0) / students.length).toFixed(1)
    : null;

  return (
    <div className="sm-page">
      <div className="sm-container">

        <div className="sm-header">
          <h2 className="sm-title">Student Management</h2>
          {students.length > 0 && (
            <div className="sm-stats">
              <span className="sm-stat">{students.length} students</span>
              <span className="sm-stat-sep">·</span>
              <span className="sm-stat">Avg: {avg}</span>
            </div>
          )}
        </div>

        <div className="sm-form">
          <div className="sm-field">
            <label className="sm-label">Name</label>
            <input className="sm-input" type="text" placeholder="Student name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="sm-field">
            <label className="sm-label">Roll No</label>
            <input className="sm-input" type="text" placeholder="Roll number"
              value={roll} onChange={(e) => setRoll(e.target.value)} />
          </div>
          <div className="sm-field">
            <label className="sm-label">Marks</label>
            <input className="sm-input" type="number" placeholder="0 – 100"
              value={marks} onChange={(e) => setMarks(e.target.value)} />
          </div>
          <button className="sm-btn" onClick={handleSubmit}>
            {editIndex !== null ? "Update" : "Add Student"}
          </button>
        </div>

        {students.length === 0 ? (
          <p className="sm-empty">No students added yet.</p>
        ) : (
          <div className="sm-table-wrap">
            <table className="sm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Marks</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const grade = getGrade(s.marks);
                  return (
                    <tr key={i}>
                      <td className="sm-td-num">{i + 1}</td>
                      <td>{s.name}</td>
                      <td>{s.roll}</td>
                      <td>{s.marks}</td>
                      <td>
                        <span className="sm-grade" style={{ color: grade.color, borderColor: grade.color }}>
                          {grade.label}
                        </span>
                      </td>
                      <td className="sm-actions">
                        <button className="sm-edit-btn" onClick={() => editStudent(i)}>Edit</button>
                        <button className="sm-delete-btn" onClick={() => deleteStudent(i)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Student;