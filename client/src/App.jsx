import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Spin } from 'antd';
import { routes } from './routes';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    }>
      {routing}
    </Suspense>
  );
};

export default App;
