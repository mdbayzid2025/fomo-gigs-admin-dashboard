import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiCpu, FiActivity, FiClock } from "react-icons/fi";
import { BsMemory } from "react-icons/bs";
import { HiStatusOnline } from "react-icons/hi";
import { useGetSystemHealthQuery } from "../../Redux/api/interactApi";

const SystemHealth = () => {
  const { data: allSystemData, isLoading, isError } = useGetSystemHealthQuery();
  const systemData = allSystemData?.data;
  console.log(systemData);

  const [memoryHistory, setMemoryHistory] = useState([]);
  const [loadHistory, setLoadHistory] = useState([]);

  useEffect(() => {
    if (!systemData) return;

    // Generate initial historical data
    const initialMemory = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}m`,
      usage: Math.random() * 20 + 60,
    }));
    const initialLoad = Array.from({ length: 20 }, (_, i) => ({
      time: `${i}m`,
      load: Math.random() * 2,
    }));

    setMemoryHistory(initialMemory);
    setLoadHistory(initialLoad);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setMemoryHistory((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: `${prev.length}m`,
            usage: Math.random() * 15 + 65,
          },
        ];
        return newData;
      });

      setLoadHistory((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: `${prev.length}m`,
            load: Math.random() * 2.5,
          },
        ];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [systemData]);

  const formatUptime = (uptime) => {
    const parts = [];
    if (uptime.days > 0) parts.push(`${uptime.days}d`);
    if (uptime.hours > 0) parts.push(`${uptime.hours}h`);
    if (uptime.minutes > 0) parts.push(`${uptime.minutes}m`);
    return parts.join(" ");
  };

  const getStatusColor = (percentage) => {
    if (percentage < 60) return "text-emerald-600";
    if (percentage < 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBg = (percentage) => {
    if (percentage < 60) return "bg-emerald-100";
    if (percentage < 80) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">
          Failed to load system health data.
        </p>
      </div>
    );
  }

  if (!systemData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">No system data available.</p>
      </div>
    );
  }

  return (
    <div className="h-[91vh] bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 mb-2">
            <HiStatusOnline className="text-emerald-500 text-2xl animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-900">
              System Health Monitor
            </h1>
          </div>
          <div>
            <p className="text-gray-600 ml-12">
              Real-time server performance metrics
            </p>
            <p className="text-gray-500 text-sm ml-12 mt-1">
              Last updated: {new Date(systemData?.timestamp).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
          {/* CPU Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-emerald-100">
                <FiCpu className="text-xl text-emerald-600" />
              </div>
              <span className="text-emerald-600 text-sm font-semibold px-3 py-1 bg-emerald-100 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-gray-600 text-sm">CPU Cores</h3>
            <p className="text-2xl font-bold text-gray-900">
              {systemData?.cpuCores}
            </p>
            <p className="text-gray-500 text-xs">Available processors</p>
          </div>

          {/* Memory Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div
                className={`p-2 rounded-xl ${getStatusBg(
                  systemData?.memory.usedMemoryPercentage
                )}`}
              >
                <BsMemory className="text-xl text-red-600" />
              </div>
              <span
                className={`${getStatusColor(
                  systemData?.memory.usedMemoryPercentage
                )} text-sm font-semibold px-3 py-1 ${getStatusBg(
                  systemData?.memory.usedMemoryPercentage
                )} rounded-full`}
              >
                {systemData?.memory.usedMemoryPercentage.toFixed(1)}%
              </span>
            </div>
            <h3 className="text-gray-600 text-sm">Memory Usage</h3>
            <p className="text-2xl font-bold text-gray-900">
              {systemData?.memory.usedMemory.GB} GB
            </p>
            <p className="text-gray-500 text-xs">
              of {systemData?.memory.totalMemory.GB} GB total
            </p>
          </div>

          {/* Load Average Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl bg-purple-100`}>
                <FiActivity className="text-xl text-purple-600" />
              </div>
              <span className="text-purple-600 text-sm font-semibold px-3 py-1 bg-purple-100 rounded-full">
                Optimal
              </span>
            </div>
            <h3 className="text-gray-600 text-sm">Load Average (1m)</h3>
            <p className="text-2xl font-bold text-gray-900">
              {systemData?.loadAverage["1min"].toFixed(2)}
            </p>
            <p className="text-gray-500 text-xs">
              5m: {systemData?.loadAverage["5min"]} | 15m:{" "}
              {systemData?.loadAverage["15min"]}
            </p>
          </div>

          {/* Uptime Card */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-xl bg-cyan-100`}>
                <FiClock className="text-2xl text-cyan-600" />
              </div>
              <span className="text-cyan-600 text-sm font-semibold px-3 py-1 bg-cyan-100 rounded-full">
                Running
              </span>
            </div>
            <h3 className="text-gray-600 text-sm">System Uptime</h3>
            <p className="text-2xl font-bold text-gray-900">
              {formatUptime(systemData?.uptime)}
            </p>
            <p className="text-gray-500 text-xs">Continuous operation</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Memory Usage Chart */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <BsMemory className="text-2xl text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">
                Memory Usage Trend
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={memoryHistory}>
                <defs>
                  <linearGradient
                    id="memoryGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#2563eb"
                  fillOpacity={1}
                  fill="url(#memoryGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Load Average Chart */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <FiActivity className="text-2xl text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">
                System Load Trend
              </h2>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={loadHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#111827",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="load"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={{ fill: "#9333ea", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Memory Details */}
        <div className="mt-3 bg-white rounded-2xl p-4 border border-gray-200 shadow-lg">
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Memory Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Total Memory</p>
              <p className="text-2xl font-bold text-gray-900">
                {systemData?.memory.totalMemory.GB} GB
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {systemData?.memory.totalMemory.MB} MB
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Used Memory</p>
              <p className="text-2xl font-bold text-yellow-600">
                {systemData?.memory.usedMemory.GB} GB
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {systemData?.memory.usedMemory.MB} MB
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-600 text-sm mb-1">Free Memory</p>
              <p className="text-2xl font-bold text-emerald-600">
                {systemData?.memory.freeMemory.GB} GB
              </p>
              <p className="text-gray-500 text-xs mt-1">
                {systemData?.memory.freeMemory.MB} MB
              </p>
            </div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Memory Usage</span>
              <span>{systemData?.memory.usedMemoryPercentage.toFixed(2)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  systemData?.memory.usedMemoryPercentage < 60
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500"
                    : systemData?.memory.usedMemoryPercentage < 80
                    ? "bg-gradient-to-r from-yellow-600 to-yellow-500"
                    : "bg-gradient-to-r from-red-600 to-red-500"
                }`}
                style={{ width: `${systemData?.memory.usedMemoryPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;
