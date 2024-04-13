import React, { useState, useEffect } from 'react';
import { Card, Space, Statistic, Typography } from 'antd';
import { UserOutlined, ShoppingCartOutlined, ShopOutlined } from '@ant-design/icons';
import { Bar } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';

function Dashboard() {
  return (
    <div>
      <h3 className='dash1'>Dashboard</h3>
      <Space direction="horizontal">
        <DashboardCard
          icon={<ShoppingCartOutlined style={{ color: 'green', backgroundColor: 'rgba(0,255,0,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={'Commandes'}
          value={120}
        />
        <DashboardCard
          icon={<UserOutlined style={{ color: 'blue', backgroundColor: 'rgba(0,0,255,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={'Clients'}
          value={120}
        />
        <DashboardCard
          icon={<ShopOutlined style={{ color: 'purple', backgroundColor: 'rgba(0,255,255,0.25)', borderRadius: 20, fontSize: 24, padding: 8 }} />}
          title={'Produits'}
          value={120}
        />
      </Space>
      <Space>
      </Space>
      
     <div className='mon7ana'>
        <DashboardChart />
        </div>
    </div>
  );
}
export default Dashboard;

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

function DashboardChart() {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Mocking data since getRevenue is not defined
    const res = {
      carts: [
        { userId: 1, discountedTotal: 100 },
        { userId: 2, discountedTotal: 150 },
        { userId: 3, discountedTotal: 200 },
      ],
    };

    const labels = res.carts.map((cart) => `User-${cart.userId}`);
    const data = res.carts.map((cart) => cart.discountedTotal);

    const dataSource = {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data,
          backgroundColor: 'rgba(255, 0, 0, 0.5)',
        },
      ],
    };

    setRevenueData(dataSource);
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Order Revenue',
      },
    },
  };

  return (
    <Card style={{ width: 500, height: 250 }}>
      <Bar options={options} data={revenueData} />
    </Card>
  );
}
