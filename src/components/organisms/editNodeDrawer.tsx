import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';
import { closeDrawer, updateActualNodeLabel } from '@/redux/drawerSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';
import Input from '../atoms/input';
interface EditNodeDrawerProps {
    dispatch: any;
}

const EditNodeDrawer: React.FC<EditNodeDrawerProps> = ({ dispatch }) => {

    const {isOpen, actualNode} = useSelector((state: RootState) => state.drawer);

    const updateNodeLabel = (newLabel: string) => {
        dispatch(updateActualNodeLabel(newLabel))
    };

    return (
        <>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={() => dispatch(closeDrawer())}
                sx={{
                    zIndex: 2000,
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
                        alignItems: "center", // Alinea verticalmente
                        width: "100%",
                        background: "#add8e6",
                        padding: 2,
                    }}
                >
                    <MessageIcon sx={{ marginRight: 1 }} /> {/* Espaciado entre el icono y el texto */}
                    <Typography variant="h5" gutterBottom>
                        Cambios
                    </Typography>
                </Box>
                <Typography variant="h6" sx={{paddingLeft:2, paddingTop:2}}>
                    Editar label
                </Typography>
                
                <Input
  value={typeof actualNode?.data?.label === 'string' ? actualNode.data.label : ""}
  onChange={(e) => updateNodeLabel(e.target.value)}
/>


                </Box>
            </Drawer>
        </>

    );
};

export default EditNodeDrawer;