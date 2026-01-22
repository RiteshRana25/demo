"use client";

import React, { useState } from "react";
import { Manrope, Poppins } from "next/font/google";
import AmbulanceCarousel from "@/Components/AmbulanceCarousel";
import EcgLine from "@/Components/EcgLine";
import { db } from "@/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { Toaster, toast } from "react-hot-toast";

const manrope = Manrope({ subsets: ["latin"], weight: ["700", "800"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [showMessagePrompt, setShowMessagePrompt] = useState(false);
  const [message, setMessage] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentDocId, setCurrentDocId] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      try {
        // Add new document to Firebase
        const docRef = await addDoc(collection(db, "submissions"), {
          email: email,
          message: "",
          timestamp: new Date(),
          id: Date.now().toString(),
        });
        
        setCurrentEmail(email);
        setCurrentDocId(docRef.id);
        setEmail("");
        setShowMessagePrompt(true);
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Error submitting email. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSendMessage = async () => {
    setIsLoading(true);
    try {
      if (message.trim() && currentDocId) {
        // Update the document with the message
        await updateDoc(doc(db, "submissions", currentDocId), {
          message: message,
        });
        toast.success("Message sent successfully! 🎉", {
          duration: 4000,
          position: "bottom-center",
          style: {
            background: "#2E8B57",
            color: "#F9FBFA",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
          },
        });
      } else if (!message.trim()) {
        toast.success("Email saved! 🎉", {
          duration: 4000,
          position: "bottom-center",
          style: {
            background: "#2E8B57",
            color: "#F9FBFA",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
          },
        });
      }
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to send message. Please try again.", {
        duration: 4000,
        position: "bottom-center",
        style: {
          background: "#dc2626",
          color: "#F9FBFA",
          padding: "16px",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    } finally {
      setShowMessagePrompt(false);
      setMessage("");
      setCurrentDocId("");
      setIsLoading(false);
    }
  };

  const handleSkipMessage = () => {
    setShowMessagePrompt(false);
    setMessage("");
    setCurrentDocId("");
  };
  return (
    <div
      className={`h-screen w-full overflow-hidden bg-[#ffffff] text-[#000000] flex flex-col items-center justify-between p-10 md:p-6 relative ${poppins.className}`}
    >
      <Toaster />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#4A90A4] opacity-10 blur-[150px] pointer-events-none" />

      {/* 1. Header Section */}
      <header className="z-10 flex items-center">
        <h1
          className={`${manrope.className} text-4xl font-extrabold tracking-tight text-[#2E8B57] mb-4`}
        >
          iCureIn
        </h1>
      </header>
      <div className="flex w-full ecg-track">
        <EcgLine />
      </div>

      {/* 2. Main Content (Center) */}
      <main className="z-10 text-center w-full flex flex-col items-center flex-grow ">
        <h2
          className={`${manrope.className} text-lg md:text-2xl lg:text-4xl font-extrabold mb-6 mt-6 md:mt-0 leading-tight text-[#2E8B57]`}
        >
          Get Ready for a Whole New <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A90A4] to-[#4A90A4] mb-6">
            Era of Healthcare.
          </span>
        </h2>

        <p className="text-sm md:text-base opacity-80 mb-2 italic flex items-center gap-2 mb-6">
          🚀 Launching Soon
        </p>

        {/* Form Section */}
        <div className="w-full max-w-md">
          <h3
            className={`${manrope.className} text-xl md:text-xl mb-2 font-bold text-[#2E8B57] mt-6 md:mt-0`}
          >
            Stay Tuned.
          </h3>
          <p className="text-xs opacity-70 mb-4 font-light">
            Join the waitlist for exclusive early access.
          </p>

          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-[#ffffff] border-2 border-[#4A90A4] focus:outline-none focus:border-[#2E8B57] transition-all text-sm text-[#000000]"
              required
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-[#2E8B57] hover:bg-[#2E8B57]  text-[#F9FBFA] font-bold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95 text-sm whitespace-nowrap disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Notify Us"}
            </button>
          </form>
          <p className="text-[10px] mt-6 md:mt-3   italic">
            We value your privacy.
          </p>
        </div>
        <AmbulanceCarousel />
      </main>

      {/* Message Prompt Modal */}
      {showMessagePrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#ffffff] rounded-2xl p-8 max-w-md w-full border-2 border-[#4A90A4]">
            <h2 className={`${manrope.className} text-2xl font-extrabold text-[#2E8B57] mb-2`}>
              Email Sent! ✓
            </h2>
            <p className="text-[#000000] mb-6">
              Your email <span className="font-bold">{currentEmail}</span> has been sent successfully.
            </p>
            <p className="text-[#000000] font-semibold mb-6">
              Would you like to send us a message?
            </p>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message (optional)"
              className="w-full px-4 py-3 rounded-xl bg-[#ffffff] border-2 border-[#4A90A4] focus:outline-none focus:border-[#2E8B57] transition-all text-[#000000] mb-4 resize-none"
              rows={4}
            />

            <div className="flex gap-3">
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="flex-1 bg-[#2E8B57] hover:bg-[#1f6b40] text-[#F9FBFA] font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                {isLoading ? "Saving..." : message.trim() ? "Send Message" : "Skip"}
              </button>
              <button
                onClick={handleSkipMessage}
                disabled={isLoading}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-[#F9FBFA] font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95 disabled:opacity-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Footer Section (Pinned to Bottom) */}
      <footer className="z-10 w-full max-w-4xl flex flex-col items-center border-t border-[#F9FBFA]/10 pt-0">
        <p className="text-xs md:text-lg font-semibold mb-1 text-[#2E8B57]">
          Interested to be a part of this revolution
        </p>
        <p className="text-[11px] md:text-lg opacity-70">
          Investment or partnership inquiries:
          <a
            href="mailto:contact@icurein.com"
            className="ml-1 text-[#4A90A4] hover:underline font-bold"
          >
            contact@icurein.com
          </a>
        </p>
        <p className="text-[6px] md:text-[10px] mt-2 uppercase tracking-[0.3em] text-center">
          This website is a pre-launch information page.full details will be
          available soon.
        </p>
      </footer>
    </div>
  );
}
