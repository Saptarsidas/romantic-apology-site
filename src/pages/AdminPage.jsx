import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../auth/AdminAuthContext";
import { useSiteContent } from "../content/SiteContentContext";
import RomanticPhotoFrame from "../components/RomanticPhotoFrame";

const pageOrder = ["page1", "page2", "page3", "page4", "page5", "page6", "page7"];

function prettyPageName(pageKey) {
  return pageKey.replace("page", "Page ");
}

export default function AdminPage() {
  const navigate = useNavigate();
  const { logout, changePassword } = useAdminAuth();
  const { content, ready, updatePage, resetContent } = useSiteContent();
  const [status, setStatus] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [busyPage, setBusyPage] = useState("");

  const handleUpload = async (pageKey, file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Only image files are allowed.");
      return;
    }

    setBusyPage(pageKey);
    setStatus("");

    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(`/api/admin/upload/${pageKey}`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const data = await response.json();
    setBusyPage("");

    if (!response.ok) {
      setStatus(data.message || "Upload failed.");
      return;
    }

    await updatePage(pageKey, {
      imageSrc: data.imageSrc,
      imageAlt: file.name,
    });
    setStatus(`Uploaded image for ${prettyPageName(pageKey)}.`);
  };

  const handleCropChange = async (pageKey, field, value) => {
    await updatePage(pageKey, { [field]: value });
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    setStatus("");

    if (!newPass || newPass.length < 10) {
      setStatus("New password must be at least 10 characters.");
      return;
    }

    const result = await changePassword({
      currentPassword: currentPass,
      newPassword: newPass,
    });

    if (!result.ok) {
      setStatus(result.message || "Password update failed.");
      return;
    }

    setCurrentPass("");
    setNewPass("");
    setStatus("Admin password updated.");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin-login", { replace: true });
  };

  const handleReset = async () => {
    await resetContent();
    setStatus("Content reset to defaults.");
  };

  if (!ready) {
    return <main className="mx-auto min-h-screen p-10 text-center text-rose-800">Loading admin...</main>;
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6">
      <section className="float-in rounded-3xl border border-rose-200/70 bg-white/80 p-5 shadow-2xl shadow-rose-300/35 backdrop-blur sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-4xl font-bold text-rose-900">Secure Content Admin</h1>
            <p className="text-sm text-rose-700">
              Password-protected editor with uploads stored on the server database.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleReset}
              className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
            >
              Reset Defaults
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
            >
              Logout
            </button>
            <Link
              to="/"
              className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
            >
              Back To Site
            </Link>
          </div>
        </div>

        <form
          onSubmit={handlePasswordChange}
          className="mb-5 grid gap-3 rounded-2xl border border-rose-200 bg-white p-4 md:grid-cols-3"
        >
          <label className="text-sm font-semibold text-rose-700">
            Current Password
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
              required
            />
          </label>
          <label className="text-sm font-semibold text-rose-700">
            New Password
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
              required
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded-full bg-rose-600 px-4 py-2 text-sm font-bold text-white hover:bg-rose-700"
            >
              Update Password
            </button>
          </div>
        </form>

        {status ? <p className="mb-5 text-sm font-semibold text-rose-700">{status}</p> : null}

        <div className="space-y-5">
          {pageOrder.map((pageKey) => {
            const page = content[pageKey];
            return (
              <div key={pageKey} className="rounded-2xl border border-rose-200 bg-white p-4">
                <h2 className="mb-3 text-xl font-bold text-rose-800">{prettyPageName(pageKey)}</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm font-semibold text-rose-700">
                    Title
                    <input
                      value={page.title}
                      onChange={(e) => updatePage(pageKey, { title: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Subtitle
                    <textarea
                      value={page.subtitle}
                      onChange={(e) => updatePage(pageKey, { subtitle: e.target.value })}
                      rows={2}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Image URL or relative path
                    <input
                      value={page.imageSrc}
                      onChange={(e) => updatePage(pageKey, { imageSrc: e.target.value })}
                      placeholder="https://... or /uploads/photo.jpg"
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Upload Picture
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleUpload(pageKey, e.target.files?.[0])}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Image Fit
                    <select
                      value={page.imageFit}
                      onChange={(e) => updatePage(pageKey, { imageFit: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    >
                      <option value="cover">Cover</option>
                      <option value="contain">Contain</option>
                    </select>
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Image Alt Text
                    <input
                      value={page.imageAlt}
                      onChange={(e) => updatePage(pageKey, { imageAlt: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Crop Focus X: {page.imagePositionX}%
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={page.imagePositionX}
                      onChange={(e) => handleCropChange(pageKey, "imagePositionX", Number(e.target.value))}
                      className="mt-1 w-full"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700">
                    Crop Focus Y: {page.imagePositionY}%
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={page.imagePositionY}
                      onChange={(e) => handleCropChange(pageKey, "imagePositionY", Number(e.target.value))}
                      className="mt-1 w-full"
                    />
                  </label>

                  <label className="text-sm font-semibold text-rose-700 md:col-span-2">
                    Placeholder Label
                    <input
                      value={page.imageLabel}
                      onChange={(e) => updatePage(pageKey, { imageLabel: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-rose-200 px-3 py-2 text-sm"
                    />
                  </label>

                  <div className="md:col-span-2 space-y-3">
                    <RomanticPhotoFrame
                      imageSrc={page.imageSrc}
                      imageAlt={page.imageAlt}
                      imageLabel={page.imageLabel}
                      imageFit={page.imageFit}
                      imagePositionX={page.imagePositionX}
                      imagePositionY={page.imagePositionY}
                      className="h-56 sm:h-72"
                    />

                    {page.imageSrc ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => updatePage(pageKey, { imageSrc: "" })}
                          className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                        >
                          Remove Picture
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            updatePage(pageKey, {
                              imageFit: "cover",
                              imagePositionX: 50,
                              imagePositionY: 50,
                            })
                          }
                          className="rounded-full border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                        >
                          Reset Crop
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
