
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);

  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem('students');
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [status, setStatus] = useState('Enrolled');

  const [editingId, setEditingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);

  const [editName, setEditName] = useState('');
  const [editStudentId, setEditStudentId] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editStatus, setEditStatus] = useState('Enrolled');

  function closeForm() {
    setShowForm(false);
    setName('');
    setStudentId('');
    setAge('');
    setEmail('');
    setCourse('');
    setStatus('Enrolled');
  }

  function addStudent(event) {
    event.preventDefault();

    if (
      !name.trim() ||
      !studentId.trim() ||
      !age ||
      !email.trim() ||
      !course.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (!Number.isFinite(Number(age)) || Number(age) <= 0) {
      alert('Please enter a valid age.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    setStudents([
      ...students,
      {
        id: Date.now(),
        name: name.trim(),
        studentId: studentId.trim(),
        age: Number(age),
        email: email.trim(),
        course: course.trim(),
        status: status
      }
    ]);

    closeForm();
  }

  function startEditing(student) {
  setEditingStudent(student);
  setEditName(student.name);
  setEditStudentId(student.studentId);
  setEditAge(String(student.age));
  setEditEmail(student.email);
  setEditCourse(student.course);
  setEditStatus(student.status);
}

  function saveEdit(id) {
    if (
      !editName.trim() ||
      !editStudentId.trim() ||
      !editAge ||
      !editEmail.trim() ||
      !editCourse.trim()
    ) {
      alert('Please fill in all fields.');
      return;
    }

    if (
      !Number.isFinite(Number(editAge)) ||
      Number(editAge) <= 0
    ) {
      alert('Please enter a valid age.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail.trim())) {
      alert('Please enter a valid email address.');
      return;
    }

    setStudents(
      students.map((student) =>
        student.id === id
          ? {
              ...student,
              name: editName.trim(),
              studentId: editStudentId.trim(),
              age: Number(editAge),
              email: editEmail.trim(),
              course: editCourse.trim(),
              status: editStatus
            }
          : student
      )
    );

    setEditingId(null);
setEditingStudent(null);
setEditName('');
setEditStudentId('');
setEditAge('');
setEditEmail('');
setEditCourse('');
setEditStatus('Enrolled');
  }

  function deleteStudent() {
    if (!deletingStudent) return;

    setStudents(
      students.filter(
        (student) => student.id !== deletingStudent.id
      )
    );

    if (editingId === deletingStudent.id) {
      setEditingId(null);
    }

    setDeletingStudent(null);
  }

  return (
    <div className="app">
      <h1>Student Management System</h1>

      <div className="dashboard">
        <h2>Dashboard</h2>
        <p>Total Students: {students.length}</p>

        <button onClick={() => setShowForm(true)}>
          Add Student
        </button>

        <h2>Student Records</h2>

        {students.length === 0 ? (
          <p>No students added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Student ID</th>
                <th>Age</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enrollment Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>

                  <td>{student.studentId}</td>
                    
                  <td>{student.age}</td>

                  <td>{student.email}</td>
                  <td>{student.course}</td>

                  <td>{student.status}</td>

                  <td>
                <button onClick={() => startEditing(student)}>
  Edit
</button>

                    <button
                      onClick={() => setDeletingStudent(student)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Student</h2>

            <form onSubmit={addStudent}>
              <input
                type="text"
                placeholder="Student Name and Surname"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Student ID"
                value={studentId}
                onChange={(event) =>
                  setStudentId(event.target.value)
                }
                required
              />

              <input
                type="number"
                placeholder="Age"
                min="1"
                value={age}
                onChange={(event) => setAge(event.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Course"
                value={course}
                onChange={(event) => setCourse(event.target.value)}
                required
              />

              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option value="Enrolled">Enrolled</option>
                <option value="Not Enrolled">Not Enrolled</option>
              </select>

              <button type="submit">Save Student</button>

              <button type="button" onClick={closeForm}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
      
{editingStudent && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Edit Student</h2>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          saveEdit(editingStudent.id);
        }}
      >
        <input
          type="text"
          placeholder="Student Name and Surname"
          value={editName}
          onChange={(event) => setEditName(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Student ID"
          value={editStudentId}
          onChange={(event) =>
            setEditStudentId(event.target.value)
          }
          required
        />

        <input
          type="number"
          placeholder="Age"
          min="1"
          value={editAge}
          onChange={(event) => setEditAge(event.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={editEmail}
          onChange={(event) => setEditEmail(event.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Course"
          value={editCourse}
          onChange={(event) => setEditCourse(event.target.value)}
          required
        />

        <select
          value={editStatus}
          onChange={(event) => setEditStatus(event.target.value)}
        >
          <option value="Enrolled">Enrolled</option>
          <option value="Not Enrolled">Not Enrolled</option>
        </select>

        <button type="submit">Save Changes</button>

        <button
          type="button"
          onClick={() => setEditingStudent(null)}
        >
          Cancel
        </button>
      </form>
    </div>
  </div>
)}


      {deletingStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Deletion</h2>

            <p>
              Are you sure you want to delete{' '}
              {deletingStudent.name}?
            </p>

            <button onClick={deleteStudent}>
              Yes, Delete
            </button>

            <button
              onClick={() => setDeletingStudent(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
