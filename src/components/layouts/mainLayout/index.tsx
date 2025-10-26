import { Layout } from 'antd';
import React from 'react';
const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  minWidth?: number | string;
  minHeight?: number | string;
  displayFlex?: boolean;
}

export default function MainLayout({ children, minHeight, minWidth, displayFlex }: MainLayoutProps) {
  return (
    <Content
      style={{
        margin: '24px auto',
        padding: '24px',
        width: '100%',
        maxWidth: minWidth || '1200px',
        minHeight: minHeight || '600px',
        display: displayFlex ? 'flex' : 'block',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {children}
    </Content>
  );
}
