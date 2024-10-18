import React from 'react';
import MainLayout from '../components/templates/MainLayout';
import FlowEditor from '../components/organisms/flowEditor';

const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
        <FlowEditor />
    </MainLayout>
  );
};

export default DashboardPage;
