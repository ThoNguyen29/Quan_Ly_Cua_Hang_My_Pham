import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalEmployees: 0,
    totalOrders: 0,
    revenue: 0
  });

  useEffect(() => {
    // Tải dữ liệu thống kê
    // TODO: Gọi API để lấy thống kê
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'dashboard', name: 'Tổng quan', icon: '📊' },
    { id: 'products', name: 'Sản phẩm', icon: '💄' },
    { id: 'employees', name: 'Nhân viên', icon: '👥' },
    { id: 'orders', name: 'Đơn hàng', icon: '🛒' },
    { id: 'customers', name: 'Khách hàng', icon: '👤' },
    { id: 'reports', name: 'Báo cáo', icon: '📈' },
    { id: 'settings', name: 'Cài đặt', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-600 to-pink-600 text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-purple-500">
          <h1 className="text-2xl font-bold">Beauty Store</h1>
          <p className="text-sm text-purple-200">Admin Panel</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-purple-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-2xl">👨‍💼</span>
            </div>
            <div>
              <p className="font-semibold">{user?.HOTEN}</p>
              <p className="text-xs text-purple-200">{user?.VAITRO}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeMenu === item.id
                      ? 'bg-white text-purple-600'
                      : 'hover:bg-purple-500'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-purple-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
          >
            <span>🚪</span>
            <span className="font-medium">Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {menuItems.find(item => item.id === activeMenu)?.name}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="text-sm text-gray-600">
                {new Date().toLocaleDateString('vi-VN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeMenu === 'dashboard' && (
            <div>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Sản phẩm</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalProducts}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💄</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Nhân viên</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalEmployees}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Đơn hàng</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalOrders}</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🛒</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Doanh thu</p>
                      <p className="text-3xl font-bold text-gray-800">
                        {stats.revenue.toLocaleString('vi-VN')}₫
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Đơn hàng gần đây</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">ĐH001 - Nguyễn Văn A</p>
                        <p className="text-sm text-gray-600">10 phút trước</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Hoàn thành
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">ĐH002 - Trần Thị B</p>
                        <p className="text-sm text-gray-600">25 phút trước</p>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                        Đang xử lý
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Sản phẩm bán chạy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-200 rounded-lg"></div>
                        <div>
                          <p className="font-medium text-gray-800">Son Dior Rouge</p>
                          <p className="text-sm text-gray-600">Đã bán: 45</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-200 rounded-lg"></div>
                        <div>
                          <p className="font-medium text-gray-800">Kem Chanel</p>
                          <p className="text-sm text-gray-600">Đã bán: 38</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeMenu !== 'dashboard' && (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <span className="text-6xl mb-4 block">🚧</span>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Chức năng đang phát triển
              </h3>
              <p className="text-gray-600">
                Phần {menuItems.find(item => item.id === activeMenu)?.name} đang được phát triển
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
