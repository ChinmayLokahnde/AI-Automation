import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleSubmit}
        className="w-96 border rounded-lg p-6 space-y-4"
      >

        <h1 className="text-2xl font-bold">
          Register
        </h1>

        <input
          name="username"
          placeholder="Username"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={handleChange}
        />

        <button
          className="bg-black text-white w-full py-2 rounded"
        >
          Register
        </button>

        <p>
          Already have an account?

          <Link
            to="/login"
            className="text-blue-500 ml-1"
          >
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}