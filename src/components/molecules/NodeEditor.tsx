import React from 'react';
import { Box, Typography } from '@mui/material';
import Select from '../atoms/Select';
import Input from '../atoms/input';
import { NodeMessageTypes } from '@/constants/NodeMessageTypes';
import { NodeMultiSelectTypes } from '@/constants/NodeMultiSelectTypes';

interface NodeEditorProps {
    actualNode: any; // Cambia a tu tipo específico
    updateNodeLabel: (newLabel: string) => void;
    updateNodeQuestion: (newQuestion: string) => void;
}

const NodeEditor: React.FC<NodeEditorProps> = ({ actualNode, updateNodeLabel, updateNodeQuestion }) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6">Atributos del Nodo</Typography>
            <br/>
            {actualNode?.type === "messageNode" ? (
                <Select
                    value={typeof actualNode?.data?.label === 'string' ? actualNode.data.label : ""}
                    onChange={(e) => updateNodeLabel(e.target.value)}
                    label="Texto"
                    options={Object.values(NodeMessageTypes)}
                />
            ) : actualNode?.type === "multiSelectNode" ? (
                <>
                    <Select
                        value={typeof actualNode?.data?.question === 'string' ? actualNode.data.question : ""}
                        onChange={(e) => updateNodeQuestion(e.target.value)}
                        label="Pregunta"
                        options={Object.values(NodeMultiSelectTypes)}
                    />
                    <br/><br/>
                    <Input
                        label='Texto'
                        value={typeof actualNode?.data?.label === 'string' ? actualNode.data.label : ""}
                        onChange={(e) => updateNodeLabel(e.target.value)}
                    />
                </>
            ) : (
                <Input
                    label='Texto'
                    value={typeof actualNode?.data?.label === 'string' ? actualNode.data.label : ""}
                    onChange={(e) => updateNodeLabel(e.target.value)}
                />
            )}
        </Box>
    );
};

export default NodeEditor;
