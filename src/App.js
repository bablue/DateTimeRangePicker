import React, { useState } from 'react';
import DateTimeRangePicker from './DateTimeRangePicker';
import { Box, Button, Typography, Modal } from '@mui/material';

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [granularity, setGranularity] = useState('1 min');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h6">Start Date: {startDate.toLocaleString()}</Typography>
      <Typography variant="h6">End Date: {endDate.toLocaleString()}</Typography>
      <Typography variant="h6">Granularity: {granularity}</Typography>
      <Button onClick={handleOpen} variant="outlined">Change Time Period or Granularity</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <DateTimeRangePicker 
            startDate={startDate} 
            endDate={endDate} 
            granularity={granularity}
            setStartDate={setStartDate} 
            setEndDate={setEndDate} 
            setGranularity={setGranularity}
            handleClose={handleClose} 
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default App;
