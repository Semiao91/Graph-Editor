import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import React from 'react';

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
    icon: React.ReactNode;
    tooltip?: string;
}

export default function IconButton({
    icon,
    tooltip,
    ...props
}: IconButtonProps) {
    return (
        <Button
            icon={icon}
            title={tooltip}
            {...props}
        />
    );
}