import { Layout } from 'antd';
import React from 'react';
const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
  fullScreen?: boolean;
  minWidth?: number | string;
  minHeight?: number | string;
  displayFlex?: boolean;
}

export default function MainLayout({
  children,
  fullScreen = false,
  minHeight,
  minWidth,
  displayFlex
}: MainLayoutProps) {
  if (fullScreen) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: '#f8f9fa',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    );
  }

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
