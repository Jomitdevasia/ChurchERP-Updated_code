import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import Card from '../../common/Card/Card';
import './DonationChart.css';

const COLORS = ['#D4AF37', '#8B0000', '#6A0DAD', '#4169E1', '#228B22'];

const DonationChart = ({ data, type = 'line', title = 'Monthly Donations' }) => {
  const ChartComponent = type === 'line' ? LineChart : type === 'bar' ? BarChart : PieChart;
  
  const renderChart = () => {
    if (type === 'pie') {
      return (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      );
    }

    return (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip />
        <Legend />
        {type === 'line' ? (
          <Line
            type="monotone"
            dataKey="value"
            stroke="#D4AF37"
            strokeWidth={2}
            dot={{ fill: '#8B0000', strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        ) : (
          <Bar dataKey="value" fill="#D4AF37" radius={[4, 4, 0, 0]} />
        )}
      </>
    );
  };

  return (
    <Card title={title} className="donation-chart-card">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <ChartComponent data={data}>
            {renderChart()}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default DonationChart;