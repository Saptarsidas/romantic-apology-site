import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DEFAULT_ADMIN_PASSWORD, loginAdmin } from "../auth/adminAuth";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const ok = await loginAdmin(password);
    setLoading(false);

    if (ok) {
      navigate("/admin", { replace: true });
      return;
    }

    setError("Wrong password. Try again.");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center justify-center px-4 py-8 sm:px-6">
      <section className="float-in w-full rounded-3xl border border-rose-200/70 bg-white/80 p-6 shadow-2xl shadow-rose-300/35 backdrop-blur">
        <h1 className="text-3xl font-bold text-rose-900">Admin Login</h1>
        <p className="mt-2 text-sm text-rose-700">Private access for your content editor.</p>

        <form onSubmit={onSubmit} className="mt-5 space-y-3">
          <label className="block text-sm font-semibold text-rose-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
              placeholder="Enter admin password"
              required
            />
          </label>

          {error ? <p className="text-sm font-semibold text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-70"
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-xs text-rose-700">
          Default password: <span className="font-bold">{DEFAULT_ADMIN_PASSWORD}</span>
        </p>

        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-rose-700 underline">
          Back to Website
        </Link>
      </section>
    </main>
  );
}
