import React from 'react'; 
import { Drawer, Box, Typography, Button } from '@mui/material'; // Importa Select y MenuItem
import MessageIcon from '@mui/icons-material/Message';
import { closeDrawer, updateActualNodeLabel, updateActualNodeQuestion, removeNode } from '@/redux/drawerSlice'; 
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import Input from '../atoms/input';
import Select from '../atoms/Select';
import NodeEditor from '../molecules/NodeEditor';

export const NodeMessageTypes = {
    Initial: "Action",
    SendEmail: "Send Email",
    SendWhatsApp: "Send WhatsApp"
};

interface EditNodeDrawerProps {
    dispatch: any;
}

const EditNodeDrawer: React.FC<EditNodeDrawerProps> = ({ dispatch }) => {
    const { isOpen, actualNode } = useSelector((state: RootState) => state.drawer);

    const updateNodeLabel = (newLabel: string) => {
        dispatch(updateActualNodeLabel(newLabel));
    };

    const updateNodeQuestion = (newQuestion: string) => {
        dispatch(updateActualNodeQuestion(newQuestion));
    };

    const handleRemoveNode = () => {
        dispatch(removeNode()); 
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => dispatch(closeDrawer())}
                sx={{
                    zIndex: 1200,
                    width: '37vw',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: '37vw',
                    },
                }}
            >
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            background: "#add8e6",
                            padding: 2,
                        }}
                    >
                        <MessageIcon sx={{ marginRight: 1 }} />
                        <Typography variant="h5" gutterBottom>
                            Cambios
                        </Typography>
                    </Box>
                    
                    <NodeEditor
                        actualNode={actualNode}
                        updateNodeLabel={updateNodeLabel}
                        updateNodeQuestion={updateNodeQuestion}
                    />

                    <Button 
                        variant="contained" 
                        color="error" 
                        sx={{ margin: 2 }} 
                        onClick={handleRemoveNode} 
                    >
                        Borrar Nodo
                    </Button>
                </Box>
            </Drawer>
        </>
    );
};

export default EditNodeDrawer;
