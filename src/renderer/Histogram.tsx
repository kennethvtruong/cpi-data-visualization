import React, { useEffect, useRef } from 'react';
import BarChart from './BarChart';
import './styles.css';

interface HistogramProps {
  params: {
    frequency: string;
    startDate: string;
    endDate: string;
    transform: string;
  };
  data: Array<{ date: string; value: number }>;
  setData: React.Dispatch<
    React.SetStateAction<Array<{ date: string; value: number }>>
  >;
}

const Histogram: React.FC<HistogramProps> = ({ params, data, setData }) => {
  const isMounted = useRef(false);
  const fetchData = async () => {
    try {
      const queryString = `?collapse=${params.frequency}&start_date=${params.startDate}&end_date=${params.endDate}&transform=${params.transform}&order=asc`;
      const response = await fetch(
        `https://data.nasdaq.com/api/v3/datasets/RATEINF/CPI_USA.csv${queryString}&api_key=GjnzxkK7m5ybzh12gzx7`
      );
      const responseStr = await response.text();
      const responseData = responseStr
        .split('\n')
        .slice(1)
        .map((el) => {
          const arr = el.split(',');
          const obj = {
            date: arr[0],
            value: parseFloat(arr[1]),
          };
          return obj;
        });
      setData(responseData);
      console.log('response', responseData);
    } catch (e) {
      console.error('Error fetching data:', e);
    }
  };

  useEffect(() => {
    if (isMounted.current)  fetchData();
    else isMounted.current = true;
  }, [params]);

  const calculateFrequency = () => {
    const frequency: Array<{ date: string; value: number }> = [];
    data.forEach((el) => {
      if (el.date.length !== 0) {
        frequency.push(el);
      }
    });

    return frequency;
  };

  return (
    <div className="histogram">
      {data.length > 0 ? <BarChart data={calculateFrequency()} /> : <></>}
    </div>
  );
};

export default Histogram;
