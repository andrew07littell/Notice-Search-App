import React from "react";
import { Stack, Pagination } from "@mui/material";

const PaginationComponent = ({ totalPages, currentPage, onChange }) => {
  return (
    <Stack
      spacing={2}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: 4 }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={onChange}
        color="primary"
      />
    </Stack>
  );
};

export default PaginationComponent;
