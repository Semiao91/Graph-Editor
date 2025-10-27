import type { ButtonProps as AntButtonProps } from 'antd';
import { Button as AntButton } from 'antd';
import React from 'react';

export interface ButtonProps extends AntButtonProps {
    children: React.ReactNode;
}

export default function Button({
    children,
    ...props
}: ButtonProps) {
    return (
        <AntButton {...props}>
            {children}
        </AntButton>
    );
}
