import { DeleteOutlined } from '@ant-design/icons';
import { Button, ColorPicker, Input, InputNumber, Space, Typography } from 'antd';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useGraphStore } from '../../store';

const { Title, Text } = Typography;

//todo: REFACTOR CODE
export const NodePropertiesOverlay = memo(() => {
    const {
        nodes,
        edges,
        selectedNodeId,
        selectedEdgeId,
        updateNode,
        updateEdge,
        deleteNode,
        deleteEdge,
        setSelectedNode,
        setSelectedEdge
    } = useGraphStore();

    interface LocalValues {
        label?: string;
        color?: string;
        weight?: number;
        width?: number;
        height?: number;
        isDirected?: boolean;
        [key: string]: string | number | boolean | undefined;
    }

    const [localValues, setLocalValues] = useState<LocalValues>({});
    const timeoutRef = useRef<number | null>(null);
    const lastSavedValues = useRef<LocalValues>({});

    const selectedNode = nodes.find(node => node.id === selectedNodeId);
    const selectedEdge = edges.find(edge => edge.id === selectedEdgeId);
    const selectedItem = selectedNode || selectedEdge;

    useEffect(() => {
        if (selectedNode) {
            const nodeValues = {
                label: selectedNode.data?.label || '',
                color: selectedNode.data?.color || '#f8f9fa',
                weight: selectedNode.data?.weight || 0,
                width: selectedNode.style?.width || 150,
                height: selectedNode.style?.height || 80,
            };
            setLocalValues(nodeValues);
            lastSavedValues.current = { ...nodeValues };
        } else if (selectedEdge) {
            const edgeValues = {
                weight: selectedEdge.data?.weight || 1,
                label: selectedEdge.data?.label || '',
                isDirected: selectedEdge.data?.isDirected || false,
            };
            setLocalValues(edgeValues);
            lastSavedValues.current = { ...edgeValues };
        } else {
            setLocalValues({});
            lastSavedValues.current = {};
        }
    }, [selectedNode?.id, selectedNode?.data, selectedNode?.style, selectedEdge?.id, selectedEdge?.data]);

    const debouncedSave = useCallback((field: string, value: any) => {

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set new timeout
        timeoutRef.current = window.setTimeout(() => {
            // Only save if value actually changed
            if (lastSavedValues.current[field] !== value) {
                console.log(`Saving field "${field}" with value:`, value, 'for node:', selectedNodeId);
                if (selectedNodeId) {
                    if (field === 'width' || field === 'height') {
                        // Handle dimensions differently
                        updateNode(selectedNodeId, {
                            style: {
                                [field]: value,
                            }
                        });
                    } else {
                        // Handle data fields - pass them as direct field updates since updateNode handles this
                        const updateData = { [field]: value };
                        console.log('Calling updateNode with:', updateData);
                        updateNode(selectedNodeId, updateData);
                    }
                } else if (selectedEdgeId) {
                    updateEdge(selectedEdgeId, {
                        [field]: value,
                    });
                }

                // Update the last saved value
                lastSavedValues.current = {
                    ...lastSavedValues.current,
                    [field]: value
                };
            }
        }, 200); // Increased debounce time for better performance
    }, [selectedNodeId, selectedEdgeId, updateNode, updateEdge]);

    const handleValueChange = useCallback((field: string, value: any) => {
        // Update local state immediately for responsive UI
        setLocalValues(prev => ({
            ...prev,
            [field]: value
        }));

        // Debounce the actual save
        debouncedSave(field, value);
    }, [debouncedSave]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleDelete = useCallback(() => {
        if (selectedNodeId) {
            deleteNode(selectedNodeId);
        } else if (selectedEdgeId) {
            deleteEdge(selectedEdgeId);
        }
    }, [selectedNodeId, selectedEdgeId, deleteNode, deleteEdge]);

    const handleClose = useCallback(() => {
        // Save any pending changes before closing
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            // Force save current values if different from last saved
            Object.keys(localValues).forEach(field => {
                if (lastSavedValues.current[field] !== localValues[field]) {
                    if (selectedNodeId) {
                        if (field === 'width' || field === 'height') {
                            updateNode(selectedNodeId, {
                                style: { [field]: localValues[field] }
                            });
                        } else {
                            updateNode(selectedNodeId, { [field]: localValues[field] });
                        }
                    } else if (selectedEdgeId) {
                        updateEdge(selectedEdgeId, {
                            [field]: localValues[field],
                        });
                    }
                }
            });
        }

        setSelectedNode(null);
        setSelectedEdge(null);
    }, [localValues, selectedNodeId, selectedEdgeId, updateNode, updateEdge, setSelectedNode, setSelectedEdge]);

    if (!selectedItem) {
        return null;
    }

    return (
        <div
            style={{
                position: 'fixed',
                top: '30%',
                left: '20px',
                width: '280px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                padding: '16px',
                maxHeight: 'calc(100vh - 120px)',
                overflowY: 'auto',
            }}
        >
            {/* Header with close button */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px',
                paddingBottom: '8px',
                borderBottom: '1px solid #f0f0f0'
            }}>
                <Title level={5} style={{ margin: 0 }}>
                    {selectedNode ? '📦 Node Properties' : '🔗 Edge Properties'}
                </Title>
                <Button
                    type="text"
                    size="small"
                    onClick={handleClose}
                    style={{ padding: '2px 6px' }}
                >
                    ✕
                </Button>
            </div>

            {/* Node Properties */}
            {selectedNode && (
                <Space direction="vertical" style={{ width: '100%' }}>
                    {/* Basic Info */}
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        <Text type="secondary">ID: {selectedNode.id.substring(0, 8)}...</Text><br />
                        <Text type="secondary">
                            Position: ({Math.round(selectedNode.position.x)}, {Math.round(selectedNode.position.y)})
                        </Text>
                    </div>

                    {/* Label */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Label:</Text>
                        <Input
                            size="small"
                            value={localValues.label || ''}
                            onChange={(e) => handleValueChange('label', e.target.value)}
                            placeholder="Node label"
                            style={{ marginTop: '4px' }}
                        />
                    </div>

                    {/* Weight */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Weight:</Text>
                        <InputNumber
                            size="small"
                            style={{ width: '100%', marginTop: '4px' }}
                            value={localValues.weight || 0}
                            onChange={(value) => handleValueChange('weight', value || 0)}
                            min={0}
                        />
                    </div>

                    {/* Color */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Color:</Text>
                        <div style={{ marginTop: '4px' }}>
                            <ColorPicker
                                size="small"
                                value={localValues.color}
                                onChange={(color) => handleValueChange('color', color.toHexString())}
                                onChangeComplete={(color) => {
                                    // Force immediate save on color picker close
                                    if (timeoutRef.current) {
                                        clearTimeout(timeoutRef.current);
                                    }
                                    debouncedSave('color', color.toHexString());
                                }}
                                showText
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>

                    {/* Dimensions */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Size:</Text>
                        <Space.Compact style={{ width: '100%', marginTop: '4px' }}>
                            <InputNumber
                                size="small"
                                placeholder="Width"
                                value={localValues.width || 150}
                                onChange={(value) => handleValueChange('width', value || 150)}
                                min={150}
                                max={500}
                                addonBefore="W"
                                style={{ width: '50%' }}
                            />
                            <InputNumber
                                size="small"
                                placeholder="Height"
                                value={localValues.height || 80}
                                onChange={(value) => handleValueChange('height', value || 80)}
                                min={80}
                                max={300}
                                addonBefore="H"
                                style={{ width: '50%' }}
                            />
                        </Space.Compact>
                    </div>
                </Space>
            )}

            {/* Edge Properties */}
            {selectedEdge && (
                <Space direction="vertical" style={{ width: '100%' }}>
                    {/* Basic Info */}
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                        <Text type="secondary">ID: {selectedEdge.id.substring(0, 8)}...</Text><br />
                        <Text type="secondary">
                            {selectedEdge.source} → {selectedEdge.target}
                        </Text>
                    </div>

                    {/* Label */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Label:</Text>
                        <Input
                            size="small"
                            value={localValues.label || ''}
                            onChange={(e) => handleValueChange('label', e.target.value)}
                            placeholder="Edge label"
                            style={{ marginTop: '4px' }}
                        />
                    </div>

                    {/* Weight */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Weight:</Text>
                        <InputNumber
                            size="small"
                            style={{ width: '100%', marginTop: '4px' }}
                            value={localValues.weight || 1}
                            onChange={(value) => handleValueChange('weight', value || 1)}
                            min={0}
                        />
                    </div>

                    {/* Direction */}
                    <div>
                        <Text strong style={{ fontSize: '12px' }}>Type:</Text>
                        <div style={{ marginTop: '4px' }}>
                            <Button
                                size="small"
                                type={localValues.isDirected ? 'primary' : 'default'}
                                onClick={() => handleValueChange('isDirected', !localValues.isDirected)}
                                style={{ width: '100%' }}
                            >
                                {localValues.isDirected ? '🎯 Directed (Arrow)' : '🔄 Undirected (Line)'}
                            </Button>
                        </div>
                    </div>
                </Space>
            )}

            {/* Delete Button */}
            <div style={{
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #f0f0f0'
            }}>
                <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={handleDelete}
                    style={{ width: '100%' }}
                >
                    Delete {selectedNode ? 'Node' : 'Edge'}
                </Button>
            </div>
        </div>
    );
});

NodePropertiesOverlay.displayName = 'NodePropertiesOverlay';