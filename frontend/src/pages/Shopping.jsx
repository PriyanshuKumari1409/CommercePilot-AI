import { useState } from "react";

import ChatPanel from "../components/ChatPanel";
import BuyerPanel from "../components/BuyerPanel";
import SellerPanel from "../components/SellerPanel";
import DecisionCard from "../components/DecisionCard";
import BudgetCard from "../components/BudgetCard";
import ApprovalCard from "../components/ApprovalCard";
import AuditTimeline from "../components/AuditTimeline";
import AnalyticsCard from "../components/AnalyticsCard";
import ExportPDF from "../components/ExportPDF";
import Footer from "../components/Footer";

function Shopping() {
  const [buyer, setBuyer] = useState({
    product: "",
    price: 0,
    rating: 0,
    reason: "",
    image: "",
  });

  const [seller, setSeller] = useState({
    offerPrice: 0,
    discount: 0,
    delivery: "",
    warranty: "",
    cashback: "",
    reason: "",
  });

  const [decision, setDecision] = useState({
    status: "Waiting",
    confidence: 0,
  });

  const [budget, setBudget] = useState(0);

  const [timeline, setTimeline] = useState([]);
  const [userDecision, setUserDecision] = useState(null);

  const resetNegotiation = () => {
    setBuyer({
      product: "",
      price: 0,
      rating: 0,
      reason: "",
      image: "",
    });

    setSeller({
      offerPrice: 0,
      discount: 0,
      delivery: "",
      warranty: "",
      cashback: "",
      reason: "",
    });

    setDecision({
      status: "Waiting",
      confidence: 0,
    });

    setBudget(0);
    setTimeline([]);
    setUserDecision(null);
  };

  const showResults = buyer.product !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-8">
      {/* Header */}

      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
          CommercePilot AI
        </h1>

        <p className="text-gray-600 text-lg mt-3">
          Multi-Agent AI Shopping & Negotiation Platform
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-8">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-blue-200 p-5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-blue-700 text-lg">Buyer AI</h3>

                <p className="text-xs text-gray-500">Product Discovery Agent</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                ● ONLINE
              </span>
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">LLM</span>
                <span className="font-semibold">Gemini 3.6 Flash</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Task</span>
                <span className="font-semibold">Product Search</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="text-green-600 font-semibold animate-pulse">
                  Ready
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Confidence</span>
                <span className="font-semibold">98%</span>
              </div>
            </div>
          </div>
          {/* <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200 p-5">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <h3 className="font-bold text-purple-700">
                Seller AI
              </h3>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              <strong>Model:</strong> Gemini 3.6 Flash
            </p>

            <p className="text-sm text-gray-500">
              <strong>Role:</strong> Dynamic Pricing
            </p>
          </div> */}

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-200 p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-purple-700">
                   Seller AI
                </h3>

                <p className="text-xs text-gray-500">Pricing & Offer Engine</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold animate-pulse">
                ● Online
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Model:</span> Gemini 3.6 Flash
              </p>

              <p>
                <span className="font-semibold">Role:</span> Dynamic Pricing
              </p>

              <p>
                <span className="font-semibold">Capabilities:</span>
                <br />
                • Negotiates discounts
                <br />
                • Calculates cashback
                <br />• Optimizes delivery & warranty
              </p>
            </div>
          </div>

          {/* <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200 p-5">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
              <h3 className="font-bold text-orange-700">
                Negotiation AI
              </h3>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              <strong>Model:</strong> Gemini 3.6 Flash
            </p>

            <p className="text-sm text-gray-500">
              <strong>Role:</strong> Deal Optimization
            </p>
          </div>

        </div>

      </div> */}

          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-orange-200 p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-orange-700">
                  Negotiation AI
                </h3>

                <p className="text-xs text-gray-500">
                  Decision Intelligence Engine
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold animate-pulse">
                ● Online
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p>
                <span className="font-semibold">Model:</span> Gemini 3.6 Flash
              </p>

              <p>
                <span className="font-semibold">Role:</span> Deal Optimization
              </p>

              <p>
                <span className="font-semibold">Capabilities:</span>
                <br />
                • Compares buyer & seller offers
                <br />
                • Selects the best deal
                <br />• Generates final recommendation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left */}

        <div className="lg:col-span-3">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <ChatPanel
              setBuyer={setBuyer}
              setSeller={setSeller}
              setDecision={setDecision}
              setBudget={setBudget}
              setTimeline={setTimeline}
              resetNegotiation={resetNegotiation}
            />
          </div>
        </div>

        {/* Center */}

        <div className="lg:col-span-5 space-y-6">
          <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6
            transition-all duration-700
            ${
              showResults
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <BuyerPanel buyer={buyer} />
          </div>

          <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6
            transition-all duration-700 delay-100
            ${
              showResults
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <SellerPanel seller={seller} />
          </div>
        </div>

        {/* Right */}

        <div className="lg:col-span-4 space-y-6">
          <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 transition-all duration-700 delay-200 ${
              showResults
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <DecisionCard decision={decision} />
          </div>

          <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 transition-all duration-700 delay-300 ${
              showResults
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <BudgetCard
              budget={budget}
              finalPrice={seller.offerPrice || 0}
              savings={Math.max(0, budget - (seller.offerPrice || 0))}
            />
          </div>

          <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 transition-all duration-700 delay-500 ${
              showResults
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* <ApprovalCard decision={decision} /> */}
            <ApprovalCard
              decision={decision}
              userDecision={userDecision}
              setUserDecision={setUserDecision}
            />
          </div>

          <div
            className={`bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6 transition-all duration-700 delay-700 ${
              showResults
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <AnalyticsCard
              buyer={buyer}
              seller={seller}
              decision={decision}
              timeline={timeline}
               userDecision={userDecision}
            />
          </div>
        </div>
      </div>

      {/* Timeline */}

      <div
        className={`mt-8 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-6
        transition-all duration-700 delay-1000 ${
          timeline.length
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        {/* <AuditTimeline timeline={timeline} /> */}
        <AuditTimeline
             timeline={timeline}
             userDecision={userDecision}
          />

        <div className="mt-6">
          <ExportPDF
            buyer={buyer}
            seller={seller}
            decision={decision}
            budget={budget}
            timeline={timeline}
            userDecision={userDecision}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Shopping;
