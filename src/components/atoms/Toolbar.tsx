import type { SpaceProps } from 'antd';
import { Space } from 'antd';
import React from 'react';

export interface ToolbarProps extends SpaceProps {
    children: React.ReactNode;
}

export default function Toolbar({
    children,
    size = 'small',
    ...props
}: ToolbarProps) {
    return (
        <Space
            size={size}
            style={{
                padding: '8px 16px',
                backgroundColor: '#fafafa',
                borderBottom: '1px solid #f0f0f0',
                ...props.style
            }}
            {...props}
        >
            {children}
        </Space>
    );
}