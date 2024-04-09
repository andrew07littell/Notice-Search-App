import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Search = ({ onSearchChange, onDateChange }) => {
  return (
    <Box
      sx={{ display: "flex", gap: 2, mb: 2 }}
      data-testid="search-input-container"
    >
      <TextField
        fullWidth
        label="Search by title"
        variant="outlined"
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker onChange={(value) => onDateChange(value.toDate())} />
      </LocalizationProvider>
    </Box>
  );
};

export default Search;
