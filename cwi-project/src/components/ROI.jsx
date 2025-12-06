import { useState } from "react";
import Map from './Map.jsx';

function FindYourROI() {
  const [acreage, setAcreage] = useState("");
  const [depth, setDepth] = useState("");
  const [costPerYard, setCostPerYard] = useState("");
  const [annualBenefitPerAcre, setAnnualBenefitPerAcre] = useState("");
  const [discountRate, setDiscountRate] = useState(5);
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    const ACRE_TO_SQFT = 43560;
    const CUBIC_FEET_TO_YARDS = 1 / 27;

    const volumeCubicYards = acreage * ACRE_TO_SQFT * depth * CUBIC_FEET_TO_YARDS;

    const setupCost = volumeCubicYards * costPerYard;

    const annualBenefit = acreage * annualBenefitPerAcre;

    const discountedBenefit = annualBenefit / (1 + discountRate / 100);

    const roi = ((discountedBenefit - setupCost) / setupCost) * 100;

    setResults({
      volume: volumeCubicYards.toFixed(0),
      cost: setupCost.toFixed(2),
      roi: roi.toFixed(2),
    });
  };

  return (
    <section
      id="roi"
      className="flex flex-col md:flex-row items-center justify-between py-16 px-8 md:px-16 bg-gray-50 min-h-screen"
    >
      {/* Input Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Find Your ROI</h2>
        <p className="text-gray-600 mb-8">
          Enter details about your land to estimate the setup cost and return on investment for building a recharge basin.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Basin Area (acres)</label>
            <input
              type="number"
              value={acreage}
              onChange={(e) => setAcreage(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 40"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Average Basin Depth (feet)</label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 6"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Excavation Cost per Cubic Yard ($)</label>
            <input
              type="number"
              value={costPerYard}
              onChange={(e) => setCostPerYard(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 12"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Annual Water Benefit per Acre ($)</label>
            <input
              type="number"
              value={annualBenefitPerAcre}
              onChange={(e) => setAnnualBenefitPerAcre(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 1000"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Discount Rate (%)</label>
            <input
              type="number"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={calculateROI}
            className="mt-4 bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Calculate
          </button>
        </div>
      </div>
      <Map/>
      {/* Results Section */}
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Estimated Results</h3>
          {results ? (
            <>
              <p className="text-gray-600 mb-2">Earthwork Volume: <span className="font-semibold">{results.volume}</span> yd³</p>
              <p className="text-gray-600 mb-2">Setup Cost: <span className="font-semibold">${results.cost}</span></p>
              <p className="text-gray-600 mb-2">ROI: <span className={`font-bold ${results.roi >= 0 ? "text-green-600" : "text-red-600"}`}>{results.roi}%</span></p>
            </>
          ) : (
            <p className="text-gray-500">Enter your land details and click “Calculate”</p>
          )}
        </div>
      </div>
      <div className="h-180px"></div>
    </section>
  );
}

export default FindYourROI;
