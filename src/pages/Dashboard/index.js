import React, { useState } from "react";

import Search from "../../component/Search";
import NoticeList from "../../component/NoticeList";
import Pagination from "../../component/Pagination";
import useNotices from "../../hooks/useNotices";
import useDebounce from "../../hooks/useDebounce";
import AddNoticeForm from "../../component/AddNoticeForm";

import {
  Box,
  CircularProgress,
  Typography,
  Fab,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

const Dashboard = ({ notices, setNotices }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, totalPages, refreshNotices } = useNotices({
    searchTerm: debouncedSearchTerm,
    filterDate: selectedDate,
    currentPage,
    setNotices,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearchChange = (search) => {
    setSearchTerm(search);
    setCurrentPage(1);
  };

  const handlePageChange = (_, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Search
        onSearchChange={handleSearchChange}
        onDateChange={setSelectedDate}
      />
      {loading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center" }}
          role="progress-bar"
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">Error: {error}</Typography>
      ) : (
        <>
          <NoticeList notices={notices} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChange={handlePageChange}
          />
        </>
      )}
      <AddNoticeForm
        modalOpen={modalOpen}
        handleModalClose={() => setModalOpen(false)}
        onAdd={refreshNotices}
      />
      <Fab
        color="secondary"
        aria-label="add"
        onClick={() => setModalOpen(true)}
        style={{ position: "fixed", bottom: 16, right: 16 }}
        variant={!isMobile && "extended"}
        data-testid="add-form-button"
      >
        <AddIcon />
        {!isMobile && " Add Form"}
      </Fab>
    </Box>
  );
};

export default Dashboard;
