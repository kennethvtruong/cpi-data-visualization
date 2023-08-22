import React, { useState, useEffect } from 'react';
import './styles.css';

interface ChartProps {
  children: React.ReactNode;
  height: number;
  width: number;
}

const Chart: React.FC<ChartProps> = ({ children, height, width }) => (
  <svg viewBox={`0 0 ${width} ${height}`} height={height} width={width}>
    {children}
  </svg>
);

interface BarProps {
  fill?: string;
  x: number;
  y: number;
  height: number;
  width: number;
  date: string;
  value: number;
}

const Bar: React.FC<BarProps> = ({ fill = '#000', x, y, height, width, date, value }) => (
  <rect
    className="bar"
    fill={fill}
    x={x}
    y={y}
    height={height}
    width={width}
    data-html="true"
  >
    <title>{`Date: ${date}`}&#10;{`Value: ${value}`}</title>
  </rect>
);

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): void => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const bottomMargin = 10;

const greatestValue = (values: number[]) =>
  values.reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);

const lowestValue = (values: number[]) =>
  values.reduce((acc, cur) => (cur < acc ? cur : acc), Infinity);

interface BarChartProps {
  data: Array<{ date: string; value: number }>;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  let max = greatestValue(data.map((datum) => datum.value));
  max = max === -Infinity ? 0 : max;
  const topMargin = 10;

  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);
  const [chartHeight, setChartHeight] = useState(
    Math.min(window.innerHeight * 0.4) - bottomMargin
  );
  let min = lowestValue(data.map((datum) => datum.value));
  min = min === Infinity ? 0 : min;

  const chartLeftMargin = 80;

  const barWidth = (chartWidth - chartLeftMargin - 1) / data.length;

  // Define tick values for the y-axis (1.25x)
  const numTicks = 5;
  const maxTick = max * 1.25;
  const tickValues = Array.from({ length: numTicks }, (_, i) =>
    Math.abs(min + (i * (Math.abs(maxTick) - min)) / (numTicks - 1))
  );
  const scaledTickPositions = tickValues.map((tick) =>
    chartHeight - (Math.abs(tick) / maxTick) * chartHeight
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setChartWidth(window.innerWidth * 0.9);
      setChartHeight(Math.min(window.innerHeight * 0.4) - bottomMargin);
    }, 300); // Adjust the delay as needed

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [max]);

  console.log(chartHeight);
  return (
    <div className="bar-chart">
      <Chart height={chartHeight + topMargin} width={chartWidth} >
        {scaledTickPositions.map((tick, index) => (
          <g key={index}>
            <line
              x1={chartLeftMargin}
              y1={tick + topMargin}
              x2={chartWidth}
              y2={tick}
              stroke="#ccc"
            />
            <text
              x={chartLeftMargin - 10}
              y={tick + topMargin}
              dy="0.35em"
              textAnchor="end"
              stroke="#d1d5db"
              overflow="visible"
              fill="white"
              fontSize="11px"
            >
              {tickValues[index].toFixed(2)}
            </text>
          </g>
        ))}
        {data.map((datum, index) => (
          <Bar
            key={datum.date}
            fill={datum.value > 0 ? "rgb(100,149,237)" : "rgb(255,0,0)"}
            x={(index * barWidth) + chartLeftMargin}
            y={chartHeight - ((Math.abs(datum.value / maxTick)) * chartHeight)}
            width={barWidth}
            height={((Math.abs(datum.value) / maxTick) * chartHeight)}
            date={datum.date}
            value={datum.value}
          />
        ))}
      </Chart>
    </div>
  );
};

export default BarChart;