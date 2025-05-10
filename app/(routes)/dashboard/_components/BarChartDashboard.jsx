import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { TrendingUp, PieChart as PieChartIcon, LineChart as LineChartIcon } from "lucide-react";

const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

function BarChartDashboard({ budgetList }) {
  // Prepare data for different chart types
  const barChartData = budgetList?.map(budget => ({
    name: budget.name,
    budget: Number(budget.amount),
    spent: Number(budget.totalSpend || 0),
    remaining: Number(budget.amount) - Number(budget.totalSpend || 0)
  }));

  const pieChartData = budgetList?.map(budget => ({
    name: budget.name,
    value: Number(budget.totalSpend || 0)
  }));

  const lineChartData = budgetList?.map(budget => ({
    name: budget.name,
    budget: Number(budget.amount),
    spent: Number(budget.totalSpend || 0)
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <h2 className="font-bold text-2xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          Financial Overview
        </h2>
      </div>

      {/* Bar Chart - Budget vs Spent */}
      <div className="bg-white rounded-xl p-6 border shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-700">Budget vs Spent</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={barChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                padding: '12px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="budget" 
              name="Budget"
              fill="#93c5fd"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="spent" 
              name="Spent"
              fill="#2563eb"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Spending Distribution */}
      <div className="bg-white rounded-xl p-6 border shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-700">Spending Distribution</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                padding: '12px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Budget vs Spent Trend */}
      <div className="bg-white rounded-xl p-6 border shadow-soft">
        <div className="flex items-center gap-2 mb-4">
          <LineChartIcon className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-gray-700">Budget vs Spent Trend</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={lineChartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fill: '#64748b' }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
                padding: '12px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="budget" 
              name="Budget"
              stroke="#93c5fd" 
              strokeWidth={2}
              dot={{ fill: '#93c5fd', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="spent" 
              name="Spent"
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartDashboard;
