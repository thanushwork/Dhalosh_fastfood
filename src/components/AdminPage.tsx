import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingBag, Users, Calendar, Download, RefreshCw } from 'lucide-react';
import { ordersAPI, analyticsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const AdminPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [loading, setLoading] = useState(false);
  const [orderStats, setOrderStats] = useState({
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0,
    allTime: 0
  });
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const { user } = useAuth();

  // Load data from API
  const loadDashboardData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      // Load order statistics
      const statsResponse = await ordersAPI.getOrderStats(token);
      if (statsResponse.success) {
        setOrderStats(statsResponse.data);
      }

      // Load chart data
      const trendsResponse = await analyticsAPI.getOrderTrends(token, 'week');
      if (trendsResponse.success) {
        setChartData(trendsResponse.data);
      }

      // Load category data
      const categoryResponse = await analyticsAPI.getCategoryStats(token);
      if (categoryResponse.success) {
        setCategoryData(categoryResponse.data);
      }

      // Load recent orders
      const ordersResponse = await ordersAPI.getAllOrders(token, { limit: 10, sort: 'createdAt:desc' });
      if (ordersResponse.success) {
        setRecentOrders(ordersResponse.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  React.useEffect(() => {
    loadDashboardData();
  }, [user]);

  const handleExportReport = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      const dateRange = {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString()
      };

      const blob = await analyticsAPI.exportReport(token, 'orders', dateRange);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error exporting report:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Orders"
          value={orderStats.today}
          icon={ShoppingBag}
          color="bg-orange-500"
        />
        <StatCard
          title="This Week"
          value={orderStats.thisWeek}
          icon={Calendar}
          color="bg-blue-500"
        />
        <StatCard
          title="This Month"
          value={orderStats.thisMonth}
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatCard
          title="All Time"
          value={orderStats.allTime}
          icon={Users}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Orders Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Orders Trend (Last 7 Days)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#f97316" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex space-x-2">
            <button
              onClick={loadDashboardData}
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={handleExportReport}
              className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order: any, index) => (
                <tr key={order.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id || (1000 + index)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerInfo?.name || `Customer ${index + 1}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items?.map((item: any) => item.name).join(', ') || 'Chicken Rice, Chicken 65'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.total || (240 + index * 10)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status || 'Completed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.createdAt ? 
                      new Date(order.createdAt).toLocaleString() : 
                      `${Math.floor(Math.random() * 60)} mins ago`
                    }
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    {loading ? 'Loading orders...' : 'No recent orders found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;