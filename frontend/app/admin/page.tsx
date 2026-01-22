"use client";

import { useState, useEffect } from "react";
import { Manrope } from "next/font/google";
import Link from "next/link";
import { db } from "@/firebase";
import { collection, query, onSnapshot, deleteDoc, doc, getDocs } from "firebase/firestore";

const manrope = Manrope({ subsets: ["latin"], weight: ["700", "800"] });

interface Submission {
  id: string;
  email: string;
  message: string;
  timestamp?: any;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    // Set up real-time listener for Firestore
    const q = query(collection(db, "submissions"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: Submission[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Submission);
      });
      // Sort by timestamp, newest first
      data.sort((a, b) => {
        const timeA = a.timestamp?.toMillis?.() || 0;
        const timeB = b.timestamp?.toMillis?.() || 0;
        return timeB - timeA;
      });
      setSubmissions(data);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "123") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
      setPassword("");
    }
  };

  const handleClearSubmissions = async () => {
    if (confirm("Are you sure you want to delete all submissions?")) {
      setIsLoading(true);
      try {
        const snapshot = await getDocs(collection(db, "submissions"));
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        setSubmissions([]);
      } catch (error) {
        console.error("Error clearing submissions: ", error);
        alert("Error clearing submissions");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    try {
      await deleteDoc(doc(db, "submissions", id));
    } catch (error) {
      console.error("Error deleting submission: ", error);
      alert("Error deleting submission");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="h-screen w-full bg-[#ffffff] text-[#000000] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1
            className={`${manrope.className} text-4xl font-extrabold text-center mb-8 text-[#2E8B57]`}
          >
            Admin Access
          </h1>
          
          <form
            onSubmit={handlePasswordSubmit}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-sm font-semibold mb-2 text-[#2E8B57]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-5 py-3 rounded-xl bg-[#ffffff] border-2 border-[#4A90A4] focus:outline-none focus:border-[#2E8B57] transition-all text-[#000000]"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-semibold">{error}</p>
            )}

            <button
              type="submit"
              className="bg-[#2E8B57] hover:bg-[#1f6b40] text-[#F9FBFA] font-bold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[#4A90A4] hover:underline text-sm font-semibold"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#ffffff] text-[#000000] flex flex-col items-center justify-start p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1
            className={`${manrope.className} text-4xl font-extrabold text-[#2E8B57]`}
          >
            Admin Dashboard
          </h1>
          <Link
            href="/"
            className="text-[#4A90A4] hover:underline font-semibold"
          >
            Logout
          </Link>
        </div>

        <div className="bg-[#f5f5f5] p-6 rounded-xl border-2 border-[#4A90A4]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#2E8B57]">
              Email Submissions ({submissions.length})
            </h2>
            {submissions.length > 0 && (
              <button
                onClick={handleClearSubmissions}
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition-all disabled:opacity-50"
              >
                {isLoading ? "Clearing..." : "Clear All"}
              </button>
            )}
          </div>

          {submissions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No email submissions yet.
            </p>
          ) : (
            <div className="space-y-3">
              {submissions.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg border border-[#4A90A4] relative"
                >
                  <button
                    onClick={() => handleDeleteSubmission(item.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold text-lg"
                  >
                    ×
                  </button>
                  <div className="flex justify-between items-start mb-2 pr-6">
                    <div>
                      <p className="text-[#000000] font-semibold">{item.email}</p>
                      <p className="text-xs text-gray-500">ID: {item.id}</p>
                    </div>
                  </div>
                  {item.message && (
                    <div className="mt-3 p-3 bg-[#f9f9f9] rounded border border-gray-200">
                      <p className="text-xs font-semibold text-gray-600 mb-1">Message:</p>
                      <p className="text-sm text-[#000000]">{item.message}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
