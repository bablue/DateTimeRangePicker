import React, { useState, useEffect } from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button, Box, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import dayjs from 'dayjs';

function DateTimeRangePicker({ startDate, endDate, granularity, setStartDate, setEndDate, setGranularity, handleClose }) {
  const [startDateLocal, setStartDateLocal] = useState(dayjs(startDate));
  const [endDateLocal, setEndDateLocal] = useState(dayjs(endDate));
  const [granularityLocal, setGranularityLocal] = useState(granularity);

  // Helper to convert granularity to minutes
  const granularityToMinutes = (gran) => {
    switch (gran) {
      case '1 min': return 1;
      case '5 min': return 5;
      case '30 min': return 30;
      case '1 hr': return 60;
      case '1 day': return 1440;
      default: return 0;
    }
  };

  // Effect to adjust granularity if it exceeds the selected time period
  useEffect(() => {
    const duration = endDateLocal.diff(startDateLocal, 'minute');
    const granMinutes = granularityToMinutes(granularityLocal);

    if (granMinutes > duration) {
      const possibleGranularities = ['1 min', '5 min', '30 min', '1 hr', '1 day'].filter(gran => granularityToMinutes(gran) <= duration);
      setGranularityLocal(possibleGranularities.pop()); // Set to the largest valid granularity
    }
  }, [startDateLocal, endDateLocal, granularityLocal]);

  const handleApply = () => {
    setStartDate(startDateLocal.toDate());
    setEndDate(endDateLocal.toDate());
    setGranularity(granularityLocal);
    handleClose();
  };

  const handleReset = () => {
    const lastHour = dayjs().subtract(1, 'hour');
    setStartDateLocal(lastHour);
    setEndDateLocal(dayjs());
    setGranularityLocal('1 min');
  };

  const handleGranularityChange = (event) => {
    setGranularityLocal(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={() => setStartDateLocal(dayjs().subtract(1, 'hour'))}>Last hour</Button>
            <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={() => setStartDateLocal(dayjs().subtract(30, 'minute'))}>Last 30 minutes</Button>
            <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={() => setStartDateLocal(dayjs().subtract(4, 'hour'))}>Last 4 hours</Button>
            <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={() => setStartDateLocal(dayjs().subtract(12, 'hour'))}>Last 12 hours</Button>
            <Button variant="contained" color="primary" sx={{ color: 'white' }} onClick={() => setStartDateLocal(dayjs().subtract(24, 'hour'))}>Last 24 hours</Button>
            <Button variant="contained" color="primary" onClick={() => { setStartDateLocal(dayjs()); setEndDateLocal(dayjs()); }}>Custom</Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
            <DateTimePicker
              label="Start Date"
              value={startDateLocal}
              onChange={setStartDateLocal}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Date"
              value={endDateLocal}
              onChange={setEndDateLocal}
              renderInput={(params) => <TextField {...params} />}
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Granularity</FormLabel>
            <RadioGroup
              aria-label="granularity"
              name="granularity"
              value={granularityLocal}
              onChange={handleGranularityChange}
            >
              <FormControlLabel value="1 min" control={<Radio />} label="1 min" />
              <FormControlLabel value="5 min" control={<Radio />} label="5 min" />
              <FormControlLabel value="30 min" control={<Radio />} label="30 min" />
              <FormControlLabel value="1 hr" control={<Radio />} label="1 hr" />
              <FormControlLabel value="1 day" control={<Radio />} label="1 day" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
        <Button onClick={handleApply} variant="contained" color="primary">Apply Changes</Button>
        <Button onClick={handleReset} variant="outlined" color="primary">Reset</Button>
      </Box>
    </LocalizationProvider>
  );
}

export default DateTimeRangePicker;
