import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart
} from 'recharts';
import Card from '../../common/Card/Card';
import './MemberGrowthChart.css';

const MemberGrowthChart = ({ data, title = 'Member Growth' }) => {
  return (
    <Card title={title}>
      <div className="growth-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="period" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="members"
              fill="#D4AF37"
              stroke="#8B4513"
              fillOpacity={0.3}
            />
            <Line
              type="monotone"
              dataKey="newMembers"
              stroke="#8B0000"
              strokeWidth={2}
              dot={{ fill: '#D4AF37', strokeWidth: 2 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MemberGrowthChart;