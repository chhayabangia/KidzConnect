import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Spin, Alert } from 'antd';

const { Title, Text } = Typography;

const TestPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching data from API...');
      
      const response = await fetch('http://localhost:5001/daycares');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Data fetched successfully:', result);
      setData(result);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Don't fetch automatically on page load
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>API Test Page</Title>
      <Text>Click the button below to test the API connection</Text>
      
      <div style={{ marginTop: '16px', marginBottom: '16px' }}>
        <Button type="primary" onClick={fetchData} loading={loading}>
          Fetch Data from API
        </Button>
      </div>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Spin size="large" />
          <div style={{ marginTop: '10px' }}>Loading data...</div>
        </div>
      )}
      
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
        />
      )}
      
      {data && (
        <Card title="API Response">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Card>
      )}
    </div>
  );
};

export default TestPage;
