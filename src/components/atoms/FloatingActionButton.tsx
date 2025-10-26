import type { FloatButtonProps } from 'antd';
import { FloatButton } from 'antd';
import React from 'react';

export interface FloatingActionButtonProps extends FloatButtonProps {
    children?: React.ReactNode;
}

export default function FloatingActionButton({
    children,
    ...props
}: FloatingActionButtonProps) {
    return (
        <FloatButton {...props}>
            {children}
        </FloatButton>
    );
}