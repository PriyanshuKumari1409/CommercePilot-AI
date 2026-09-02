import jsPDF from "jspdf";

function ExportPDF({
  buyer,
  seller,
  decision,
  budget,
  timeline,
  userDecision,
}) {
  const downloadPDF = () => {
    const pdf = new jsPDF();

    let y = 20;

    const decisionStatus =
      decision?.status || "Waiting";

    const isFailed =
      decisionStatus.toLowerCase() === "negotiation failed" ||
      decisionStatus.toLowerCase() === "failed";

    const isApproved =
      userDecision === "approved";

    const isRejected =
      userDecision === "rejected";

    // ==============================
    // TITLE
    // ==============================

    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text("CommercePilot AI Report", 20, y);

    y += 15;

    // ==============================
    // REPORT DETAILS
    // ==============================

    pdf.setFontSize(13);
    pdf.setFont("helvetica", "normal");

    pdf.text(
      `Product : ${buyer?.product || "N/A"}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Market Price : INR ${buyer?.price || 0}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Negotiated Price : INR ${seller?.offerPrice || 0}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Budget : INR ${budget || 0}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Discount : INR ${seller?.discount || 0}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Delivery : ${seller?.delivery || "N/A"}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Warranty : ${seller?.warranty || "N/A"}`,
      20,
      y
    );

    y += 10;

    pdf.text(
      `Decision : ${decisionStatus}`,
      20,
      y
    );

    y += 18;

    // ==============================
    // NEGOTIATION TIMELINE
    // ==============================

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Negotiation Timeline",
      20,
      y
    );

    y += 12;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    if (!timeline || timeline.length === 0) {
      pdf.text(
        "No negotiation timeline available.",
        20,
        y
      );
    } else {
      timeline.forEach((item) => {
        const message =
          `${item.agent}: ${item.message}`
            .replace(/₹/g, "INR ");

        const lines =
          pdf.splitTextToSize(
            message,
            170
          );

        if (y + lines.length * 7 > 280) {
          pdf.addPage();
          y = 20;
        }

        pdf.text(
          lines,
          20,
          y
        );

        y +=
          lines.length * 7 + 3;
      });
    }

    // ==============================
    // HUMAN APPROVAL
    // ==============================

    y += 15;

    if (y > 220) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");

    pdf.text(
      "Human Approval",
      20,
      y
    );

    y += 12;

    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");

    // ==============================
    // FAILED NEGOTIATION
    // ==============================

    if (isFailed) {
      pdf.text(
        "Status : PURCHASE NOT RECOMMENDED",
        20,
        y
      );

      y += 10;

      const failureLines =
        pdf.splitTextToSize(
          "Human approval is not required because the AI agents could not reach an acceptable deal within the buyer's budget.",
          170
        );

      pdf.text(
        failureLines,
        20,
        y
      );

      y +=
        failureLines.length * 7 + 5;

      const recommendationLines =
        pdf.splitTextToSize(
          "Recommendation: Increase the budget or modify the product requirements and start a new negotiation.",
          170
        );

      pdf.text(
        recommendationLines,
        20,
        y
      );

      y +=
        recommendationLines.length * 7;

    }

    // ==============================
    // APPROVED
    // ==============================

    else if (isApproved) {
      pdf.text(
        "Status : APPROVED",
        20,
        y
      );

      y += 10;

      const lines =
        pdf.splitTextToSize(
          "Human: I approve the AI recommendation and would like to proceed with this purchase.",
          170
        );

      pdf.text(
        lines,
        20,
        y
      );

      y +=
        lines.length * 7 + 5;

      const sellerLines =
        pdf.splitTextToSize(
          "Seller: Thank you! Your order has been successfully confirmed. We appreciate your purchase and will begin processing your order shortly.",
          170
        );

      pdf.text(
        sellerLines,
        20,
        y
      );

      y +=
        sellerLines.length * 7;
    }

    // ==============================
    // REJECTED
    // ==============================

    else if (isRejected) {
      pdf.text(
        "Status : REJECTED",
        20,
        y
      );

      y += 10;

      const lines =
        pdf.splitTextToSize(
          "Human: I reject this AI recommendation.",
          170
        );

      pdf.text(
        lines,
        20,
        y
      );

      y +=
        lines.length * 7 + 5;

      const sellerLines =
        pdf.splitTextToSize(
          "Seller: Understood. This negotiation has been cancelled. You may start a new negotiation anytime.",
          170
        );

      pdf.text(
        sellerLines,
        20,
        y
      );

      y +=
        sellerLines.length * 7;
    }

    // ==============================
    // WAITING
    // ==============================

    else {
      pdf.text(
        "Status : Waiting for Human Approval",
        20,
        y
      );
    }

    // ==============================
    // REPORT GENERATION TIME
    // ==============================

    const generatedAt =
      new Date().toLocaleString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      );

    y += 20;

    if (y > 270) {
      pdf.addPage();
      y = 20;
    }

    pdf.setFontSize(11);
    pdf.setFont(
      "helvetica",
      "italic"
    );

    pdf.text(
      `Report Generated: ${generatedAt}`,
      20,
      y
    );

    // ==============================
    // SAVE PDF
    // ==============================

    pdf.save(
      "CommercePilot_Report.pdf"
    );
  };

  return (
    <button
      onClick={downloadPDF}
      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
    >
      📄 Export Report (PDF)
    </button>
  );
}

export default ExportPDF;