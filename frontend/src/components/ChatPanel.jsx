

import axios from "axios";
import { useState } from "react";

function ChatPanel({
  setBuyer,
  setSeller,
  setDecision,
  setBudget,
  setTimeline,
  resetNegotiation,
}) {
  const [goal, setGoal] = useState("");
  const [budget, setBudgetInput] = useState("");
  const [category, setCategory] = useState("Laptop");

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);

  const startNegotiation = async () => {
    if (!goal.trim()) {
      alert("Please enter your shopping requirement.");
      return;
    }

    if (!budget || Number(budget) <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    resetNegotiation();
    setLoading(true);
    setStep(1);

    try {
      setStep(2);

      const { data } = await axios.post(
        "https://commercepilot-ai-nem3.onrender.com/api/negotiate",
        {
          goal,
          budget: Number(budget),
          category,
        }
      );

      console.log("API Response:", data);

      setBuyer(data.buyer);
      setSeller(data.seller);
      console.log("Decision from backend:", data.decision);
      setDecision(data.decision);
      setTimeline(data.timeline || []);
      setBudget(Number(budget));
    } catch (err) {
      console.error(err);

      if (err.response) {
        console.log(err.response.data);
      }

      alert("Unable to contact the AI service.\nPlease try again.");
    } finally {
      setLoading(false);
      setStep(0);
    }
  };

  const handleNewSearch = () => {
    resetNegotiation();
    setGoal("");
    setBudgetInput("");
    setCategory("Laptop");
    setLoading(false);
    setStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold">Shopping Goal</h2>

        <p className="text-gray-500 text-sm mt-1">
          Tell CommercePilot AI what you want. Our AI Buyer, Seller and Negotiation Agents
          will collaborate to find the best deal.
        </p>
      </div>

      {/* Goal */}
      <div>
        <label className="font-semibold">Describe your requirement</label>

        <textarea
          rows="6"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
          placeholder="Example: Gaming laptop under ₹70,000 with RTX graphics"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="font-semibold">Maximum Budget</label>

        <input
          type="number"
          value={budget}
          onChange={(e) => setBudgetInput(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
          placeholder="70000"
        />
      </div>

      {/* Category */}
      <div>
        <label className="font-semibold">Category</label>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        >
          <option>Laptop</option>
          <option>Phone</option>
          <option>Headphones</option>
          <option>Smartwatch</option>
        </select>
      </div>

      {/* Human Approval */}
      <div className="flex gap-2 items-center">
        <input type="checkbox" checked readOnly />
        <span className="text-sm">Human approval required before payment</span>
      </div>

      {/* Live Status */}
      {loading && (
        <div className="text-center">
          <p className="font-semibold text-blue-700 animate-pulse">
            {step === 1 && "Buyer Agent is searching the best products..."}
            {step === 2 && "Seller Agent is negotiating the best offer..."}
            {step === 3 && "Negotiation Agent is finalizing the deal..."}
          </p>
        </div>
      )}

      {/* Buttons */}
      <div className="space-y-3">
        <button
          onClick={startNegotiation}
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "AI Agents Working..." : "Start AI Negotiation"}
        </button>

        <button
          onClick={handleNewSearch}
          disabled={loading}
          className="w-full py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
        >
          Start New Negotiation
        </button>
      </div>

      {/* Workflow */}
      {loading && (
        <div className="mt-6 bg-slate-100 rounded-xl p-6 border shadow-lg">
          <h3 className="font-bold text-lg mb-5">Multi-Agent Workflow</h3>

          <div className="space-y-5">
            <div
              className={`flex items-center gap-4 ${
                step >= 1 ? "text-blue-700" : "text-gray-400"
              }`}
            >
              <div className="text-3xl">{step >= 1 ? "✅" : "⏳"}</div>

              <div>
                <p className="font-semibold">Buyer Agent</p>

                <p className="text-sm">
                  Searching products and comparing market prices...
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 ${
                step >= 2 ? "text-purple-700" : "text-gray-400"
              }`}
            >
              <div className="text-3xl">{step >= 2 ? "✅" : "⏳"}</div>

              <div>
                <p className="font-semibold">Seller Agent</p>

                <p className="text-sm">
                  Calculating discounts, cashback and warranty...
                </p>
              </div>
            </div>

            <div
              className={`flex items-center gap-4 ${
                step >= 3 ? "text-orange-700" : "text-gray-400"
              }`}
            >
              <div className="text-3xl">{step >= 3 ? "✅" : "⏳"}</div>

              <div>
                <p className="font-semibold">Negotiation Agent</p>

                <p className="text-sm">
                  Finalizing the best deal and preparing recommendation...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPanel;