import { useState, useEffect } from "react";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    email: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Đường dẫn Backend API
  const API_URL = "http://localhost:5000/api/students";

  // Câu 47: Lấy danh sách sinh viên từ Backend (GET)
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Câu 48: Quản lý sự thay đổi dữ liệu trong Form Input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Câu 49: Xử lý Thêm mới (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      // Cập nhật sinh viên
      await fetch(`${API_URL}/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setEditingId(null);
    } else {
      // Thêm mới sinh viên
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ studentId: "", name: "", email: "" });
    fetchStudents();
  };

  // Chuẩn bị thông tin để sửa
  const handleEdit = (st) => {
    setEditingId(st._id);
    setFormData({ studentId: st.studentId, name: st.name, email: st.email });
  };

  // Xóa sinh viên (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sinh viên này?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchStudents();
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2>Quản Lý Sinh Viên - MERN Stack</h2>

      {/* Form nhập dữ liệu */}
      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
      >
        <input
          name="studentId"
          placeholder="Mã sinh viên"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm mới"}</button>
      </form>

      {/* Bảng hiển thị danh sách */}
      <table
        border="1"
        cellPadding="10"
        cellSpacing="0"
        style={{ width: "100%", textIndent: "left" }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.map((st) => (
            <tr key={st._id}>
              <td>{st.studentId}</td>
              <td>{st.name}</td>
              <td>{st.email}</td>
              <td>
                <button onClick={() => handleEdit(st)}>Sửa</button>{" "}
                <button onClick={() => handleDelete(st._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
