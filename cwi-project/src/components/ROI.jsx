import { useEffect, useState } from "react";
import Map from "./Map";

export default function FindYourROI() {
  // Basin Geometry Inputs
  const [insideLength, setInsideLength] = useState("");
  const [insideWidth, setInsideWidth] = useState("");
  const [insideSlope, setInsideSlope] = useState("");
  const [outsideSlope, setOutsideSlope] = useState("");
  const [topLevee, setTopLevee] = useState("");
  const [pondSlope, setPondSlope] = useState("");
  const [freeboard, setFreeboard] = useState("");
  const [waterDepth, setWaterDepth] = useState("");

  // Soil Inputs
  const [soil, setSoil] = useState(null); // from Map
  const [infiltrationRate, setInfiltrationRate] = useState("");

  // Water Availability
  const [wetFrequency, setWetFrequency] = useState("");
  const [wetMonths, setWetMonths] = useState("");

  // Development Costs
  const [landCostPerAcre, setLandCostPerAcre] = useState("");
  const [pipelineLength, setPipelineLength] = useState("");
  const [earthworkCostPerYd, setEarthworkCostPerYd] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanYears, setLoanYears] = useState("");

  // Water Costs
  const [waterCost, setWaterCost] = useState("");
  const [storedWaterValue, setStoredWaterValue] = useState("");
  const [omCost, setOmCost] = useState("");

  const [results, setResults] = useState(null);

  // Receive soil data from Map
  const handleSoilReceived = (soilObj) => {
    setSoil(soilObj);
    if (soilObj?.rate) {
      setInfiltrationRate(soilObj.rate);
    }
  };

  const calculateROI = () => {
    // Convert to numbers
    const L = parseFloat(insideLength);
    const W = parseFloat(insideWidth);
    const slope = parseFloat(insideSlope);
    const depth = parseFloat(waterDepth);
    const fb = parseFloat(freeboard);

    const totalDepth = depth + fb;
    const inflatedWidth = W + 2 * slope * totalDepth;
    const inflatedLength = L + 2 * slope * totalDepth;

    const ACRE_SQFT = 43560;

    const wettedAreaSqFt = inflatedWidth * inflatedLength;
    const wettedAreaAcres = wettedAreaSqFt / ACRE_SQFT;

    const earthworkVolumeCuYd =
      (inflatedWidth * inflatedLength * totalDepth) / 27;

    const developmentCost = earthworkVolumeCuYd * parseFloat(earthworkCostPerYd);

    const days = parseFloat(wetMonths) * 30.4;
    const annualRechargeAF =
      (parseFloat(infiltrationRate) *
        wettedAreaSqFt *
        days) /
      ACRE_SQFT;

    const annualBenefit =
      annualRechargeAF * parseFloat(storedWaterValue);

    const roi = ((annualBenefit - developmentCost) / developmentCost) * 100;

    setResults({
      wettedAreaAcres: wettedAreaAcres.toFixed(2),
      soil: soil?.symbol,
      infiltration: infiltrationRate,
      volume: earthworkVolumeCuYd.toFixed(0),
      annualRechargeAF: annualRechargeAF.toFixed(2),
      developmentCost: developmentCost.toFixed(2),
      annualBenefit: annualBenefit.toFixed(2),
      roi: roi.toFixed(2),
    });
  };

  return (
  <section className="w-full h-screen overflow-hidden bg-gray-50 flex flex-row">

    {/* LEFT PANEL — Inputs */}
    <div className="w-[30%] h-full overflow-y-auto px-6 py-4 space-y-6 border-r border-gray-300 bg-white">
      <h1 className="text-2xl font-bold">Find Your ROI</h1>

      <div className="space-y-6">

        <InputSection title="Basin Size & Design">
          <Input label="Inside Length (ft)" setter={setInsideLength}  />
          <Input label="Inside Width (ft)" setter={setInsideWidth} />
          <Input label="Inside Slopes (H:1)" setter={setInsideSlope} />
          <Input label="Outside Slopes (H:1)" setter={setOutsideSlope} />
          <Input label="Top of Levee (ft)" setter={setTopLevee} />
          <Input label="Slope Across Pond (ft)" setter={setPondSlope} />
          <Input label="Freeboard (ft)" setter={setFreeboard} />
          <Input label="Water Depth (ft)" setter={setWaterDepth} />
        </InputSection>

        <InputSection title="Soil Data (from Map)">
          <p className="text-sm text-gray-700">
            {soil ? `${soil.symbol} - ${soil.desc}` : "Draw polygon on map"}
          </p>
          <Input label="Infiltration Rate (ft/day)" setter={setInfiltrationRate} />
        </InputSection>

        <InputSection title="Water Availability">
          <Input label="Wet Year Frequency (%)" setter={setWetFrequency} />
          <Input label="Wet Season Duration (months)" setter={setWetMonths} />
        </InputSection>

        <InputSection title="Development Costs">
          <Input label="Land Cost ($/acre)" setter={setLandCostPerAcre} />
          <Input label="Pipeline Length (ft)" setter={setPipelineLength} />
          <Input label="Earthwork Cost ($/yd³)" setter={setEarthworkCostPerYd} />
          <Input label="Interest Rate (%)" setter={setInterestRate} />
          <Input label="Loan Term (years)" setter={setLoanYears} />
        </InputSection>

        <InputSection title="Water Costs">
          <Input label="Cost of Recharge Water ($/AF)" setter={setWaterCost} />
          <Input label="Value of Stored Water ($/AF)" setter={setStoredWaterValue} />
          <Input label="O&M Cost ($/AF)" setter={setOmCost} />
        </InputSection>

        <button
          onClick={calculateROI}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Calculate ROI
        </button>

      </div>
    </div>

    <Map onSoilResult={handleSoilReceived} />

    {/* RIGHT PANEL — Results */}
    <div className="w-[30%] h-full px-6 py-8 bg-white border-l border-gray-300">
      <h2 className="text-xl font-semibold mb-4 text-center">Estimated Results</h2>

      {results ? (
        <div className="space-y-2 text-sm">
          <Result label="Soil" value={results.soil || "N/A"} />
          <Result label="Infiltration Rate" value={results.infiltration ? `${results.infiltration} ft/day` : "N/A"} />
          <Result label="Basin Area" value={`${results.wettedAreaAcres} acres`} />
          <Result label="Excavation Volume" value={`${results.volume} yd³`} />
          <Result label="Annual Recharge" value={`${results.annualRechargeAF} AF/year`} />
          <Result label="Setup Cost" value={`$${results.developmentCost}`} />
          <Result label="Annual Benefit" value={`$${results.annualBenefit}`} />
          <Result
            label="ROI"
            value={`${results.roi}%`}
            highlight={true}
            positive={parseFloat(results.roi) >= 0}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">Enter values to calculate.</p>
      )}
    </div>
  </section>
);
function InputSection({ title, children }) {
  return (
    <div className="border rounded-md p-3 bg-gray-50">
      <p className="font-semibold text-sm mb-2">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Input({ label, setter }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-700">{label}</label>
      <input
        type="number"
        onChange={(e) => setter(e.target.value)}
        className="px-2 py-1 text-sm border rounded"
      />
    </div>
  );
}


function Result({ label, value, highlight, positive }) {
  return (
    <p>
      <strong>{label}: </strong>
      <span className={highlight ? (positive ? "text-green-600" : "text-red-600") : ""}>
        {value}
      </span>
    </p>
  );
}

}
