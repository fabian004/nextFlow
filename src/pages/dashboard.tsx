import React from 'react';
import MainLayout from '../components/templates/MainLayout';
import NodeSidebar from '../components/organisms/nodeSideBar';
import FlowEditor from '../components/organisms/flowEditor';

const DashboardPage: React.FC = () => {
  const onDragStart = (event: any, type: string) => {
    event.dataTransfer.setData('application/reactflow', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <MainLayout>
        <NodeSidebar onDragStart={onDragStart} />
        <FlowEditor />
    </MainLayout>
  );
};

export default DashboardPage;
