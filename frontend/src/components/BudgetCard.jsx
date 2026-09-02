function BudgetCard({ budget, finalPrice, savings }) {
  const hasBudget = Number(budget) > 0;
  const hasFinalPrice = Number(finalPrice) > 0;

  const withinBudget =
    hasBudget &&
    hasFinalPrice &&
    Number(finalPrice) <= Number(budget);

  const failedNegotiation =
    hasBudget &&
    hasFinalPrice &&
    Number(finalPrice) > Number(budget);

  const actualSavings =
    withinBudget
      ? Math.max(0, Number(savings))
      : 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Budget Analysis
      </h2>

      {/* Budget */}
      <div className="bg-blue-50 rounded-xl p-5 text-center mb-6">
        <p className="text-gray-500">
          Your Budget
        </p>

        <h2 className="text-4xl font-bold text-blue-700 mt-2">
          ₹{hasBudget ? budget : 0}
        </h2>
      </div>

      <div className="space-y-5">

        {/* Final Price */}
        <div className="flex justify-between">
          <span>Final Price</span>

          <b>
            ₹{hasFinalPrice ? finalPrice : 0}
          </b>
        </div>

        {/* Money Saved */}
        <div className="flex justify-between">
          <span>Money Saved</span>

          <b
            className={
              withinBudget
                ? "text-green-600"
                : "text-gray-500"
            }
          >
            ₹{actualSavings}
          </b>
        </div>

        {/* Within Budget */}
        <div className="flex justify-between">
          <span>Within Budget</span>

          <b
            className={
              withinBudget
                ? "text-green-600"
                : failedNegotiation
                ? "text-red-600"
                : "text-gray-500"
            }
          >
            {!hasBudget
              ? "-"
              : withinBudget
              ? "Yes"
              : failedNegotiation
              ? "No"
              : "-"}
          </b>
        </div>

      </div>

      {/* Status Message */}
      <div className="border-t mt-6 pt-5">

        {withinBudget ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">

            <p className="font-semibold text-green-700">
              ✅ Deal Within Budget
            </p>

            <p className="text-gray-600 mt-2">
              The AI Seller successfully negotiated a
              price within your budget.
            </p>

          </div>
        ) : failedNegotiation ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">

            <p className="font-semibold text-red-700">
              ❌ Budget Limit Exceeded
            </p>

            <p className="text-gray-600 mt-2">
              The negotiated price exceeds your maximum
              budget.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Increase your budget or modify your
              product requirements to continue.
            </p>

          </div>
        ) : (
          <p className="text-gray-600">
            Enter a budget and start negotiation to see
            budget analysis.
          </p>
        )}

      </div>
    </div>
  );
}

export default BudgetCard;