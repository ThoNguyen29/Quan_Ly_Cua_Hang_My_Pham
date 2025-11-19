import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [TAIKHOAN, setTAIKHOAN] = useState('');
  const [MATKHAU, setMATKHAU] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        TAIKHOAN,
        MATKHAU,
      });

      // Lưu token vào localStorage hoặc context
      localStorage.setItem('token', response.data.token);
      console.log('Đăng nhập thành công:', response.data);
      alert('Đăng nhập thành công!');
      // Chuyển hướng đến trang chính sau khi đăng nhập thành công
      // window.location.href = '/dashboard';

    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      <h2>Đăng nhập hệ thống</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="text"
          placeholder="Tài khoản"
          value={TAIKHOAN}
          onChange={(e) => setTAIKHOAN(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={MATKHAU}
          onChange={(e) => setMATKHAU(e.target.value)}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer' }}>Đăng nhập</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginPage;


