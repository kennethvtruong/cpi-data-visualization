import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './styles.css'
import Histogram from './Histogram';
import HistogramOptions from './HistogramOptions';

interface Params {
  startDate: string;
  endDate: string;
  frequency: string;
  transform: string;
}

function HistogramContainer() {
  const [params, setParams] = useState<Params>({
    startDate: "",
    endDate: "",
    frequency: "",
    transform: "none",
})
  const [error, setError] = useState<boolean>(false)
  const [data, setData] = useState<Array<{ date: string; value: number }>>([]);

  return (
      <div className='App'>
        <h1 className="header">US Consumer Price Index</h1>
        <Histogram params={params} data={data} setData={setData}/>
        <HistogramOptions setParams={setParams} error={error} setError={setError} setData={setData}/>
      </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HistogramContainer />} />
      </Routes>
    </Router>
  );
}
