import { use, useEffect, useState } from 'react';
import SubscriptionsContext from '../../contexts/SubscriptionsContext';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const { subscriptions } = use(SubscriptionsContext);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const calculateMonthlyData = () => {
      const monthlyAmounts = {};

      subscriptions.forEach(sub => {
        const startDate = new Date(sub.start_date);
        const endDate = new Date(sub.end_date);
        const monthDiff = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
                         (endDate.getMonth() - startDate.getMonth());

        for(let i = 0; i <= monthDiff; i++) {
          const currentDate = new Date(startDate);
          currentDate.setMonth(startDate.getMonth() + i);
          const monthKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

          monthlyAmounts[monthKey] = (monthlyAmounts[monthKey] || 0) + sub.price;
        }
      });

      return Object.entries(monthlyAmounts)
        .map(([month, amount]) => ({ month, amount }))
        .sort((a, b) => a.month.localeCompare(b.month));
    };

    setMonthlyData(calculateMonthlyData());
  }, [subscriptions]);

  const chartConfig = {
    stroke: '#22c55e',
    fill: '#22c55e',
    fontSize: 12,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white mb-6">Subscription Analytics</h1>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1e1b2e] p-4 rounded-lg">
          <h2 className="text-white text-lg mb-4">Monthly Spending Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2f2b3a" />
                <XAxis
                  dataKey="month"
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e1b2e',
                    border: '1px solid #2f2b3a',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  name="Monthly Spending"
                  stroke={chartConfig.stroke}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e1b2e] p-4 rounded-lg">
          <h2 className="text-white text-lg mb-4">Monthly Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2f2b3a" />
                <XAxis
                  dataKey="month"
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e1b2e',
                    border: '1px solid #2f2b3a',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="amount"
                  name="Monthly Distribution"
                  fill={chartConfig.fill}
                  opacity={0.8}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e1b2e] p-4 rounded-lg">
          <h2 className="text-white text-lg mb-4">Cumulative Spending</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2f2b3a" />
                <XAxis
                  dataKey="month"
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <YAxis
                  stroke="#fff"
                  tick={{ fill: '#fff' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e1b2e',
                    border: '1px solid #2f2b3a',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amount"
                  name="Cumulative Spending"
                  stroke={chartConfig.stroke}
                  fill={chartConfig.fill}
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#1e1b2e] p-4 rounded-lg">
          <h2 className="text-white text-lg mb-4">Average Monthly Spending</h2>
          <div className="flex flex-col items-center justify-center h-[300px]">
            <div className="text-4xl font-bold text-green-500 mb-2">
              ${monthlyData.length ? (monthlyData.reduce((acc, curr) => acc + curr.amount, 0) / monthlyData.length).toFixed(2) : 0}
            </div>
            <div className="text-gray-400">per month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;