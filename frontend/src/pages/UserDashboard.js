import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function UserDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'home', name: 'Trang chủ', icon: '🏠' },
    { id: 'products', name: 'Sản phẩm', icon: '💄' },
    { id: 'orders', name: 'Đơn hàng của tôi', icon: '📦' },
    { id: 'profile', name: 'Thông tin cá nhân', icon: '👤' },
  ];

  // Danh sách sản phẩm mẫu
  const products = [
    { id: 1, name: 'Son Dior Rouge', price: 850000, image: '💄', category: 'Son môi' },
    { id: 2, name: 'Kem Chanel', price: 1200000, image: '🧴', category: 'Kem dưỡng' },
    { id: 3, name: 'Nước hoa Gucci', price: 2500000, image: '🌸', category: 'Nước hoa' },
    { id: 4, name: 'Phấn MAC', price: 650000, image: '💅', category: 'Trang điểm' },
    { id: 5, name: 'Mascara Maybelline', price: 350000, image: '👁️', category: 'Trang điểm' },
    { id: 6, name: 'Sữa rửa mặt Cetaphil', price: 280000, image: '🧼', category: 'Chăm sóc da' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            Beauty Store
          </h1>
          <p className="text-sm text-gray-600">Cửa hàng mỹ phẩm</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.HOTEN}</p>
              <p className="text-xs text-gray-600">Khách hàng</p>
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
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeMenu === item.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
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
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
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
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              {/* Cart */}
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeMenu === 'home' && (
            <div>
              {/* Banner */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 mb-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Chào mừng trở lại, {user?.HOTEN}!</h2>
                <p className="text-lg">Khám phá bộ sưu tập mỹ phẩm cao cấp của chúng tôi</p>
              </div>

              {/* Featured Products */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sản phẩm nổi bật</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((product) => (
                    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="p-6">
                        <div className="text-6xl mb-4 text-center">{product.image}</div>
                        <h4 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-pink-600">
                            {product.price.toLocaleString('vi-VN')}₫
                          </span>
                          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all">
                            Mua ngay
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'products' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800">Tất cả sản phẩm</h3>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
                  <option>Tất cả danh mục</option>
                  <option>Son môi</option>
                  <option>Kem dưỡng</option>
                  <option>Nước hoa</option>
                  <option>Trang điểm</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="p-6">
                      <div className="text-6xl mb-4 text-center">{product.image}</div>
                      <h4 className="font-bold text-lg text-gray-800 mb-2">{product.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{product.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-pink-600">
                          {product.price.toLocaleString('vi-VN')}₫
                        </span>
                        <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeMenu === 'orders' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Đơn hàng của bạn</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Đơn hàng #001</span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      Đã giao
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Ngày đặt: 15/11/2025</p>
                  <p className="text-lg font-bold text-pink-600">Tổng: 1,500,000₫</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Đơn hàng #002</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      Đang giao
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Ngày đặt: 18/11/2025</p>
                  <p className="text-lg font-bold text-pink-600">Tổng: 850,000₫</p>
                </div>
              </div>
            </div>
          )}

          {activeMenu === 'profile' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                  <input
                    type="text"
                    value={user?.HOTEN || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mã nhân viên</label>
                  <input
                    type="text"
                    value={user?.MANV || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vai trò</label>
                  <input
                    type="text"
                    value={user?.VAITRO || ''}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default UserDashboard;
