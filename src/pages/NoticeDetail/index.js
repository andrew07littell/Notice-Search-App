import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const NoticeDetail = ({ notices }) => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const notice = notices.find((notice) => notice.id === noticeId);

  if (!notice) {
    return <Typography variant="h6">Notice not found</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 2 }}>
      <Button
        startIcon={<ArrowBackIosNewIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 2 }}
      >
        Back
      </Button>
      <Paper elevation={3} sx={{ p: isMobile ? 2 : 4 }}>
        <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 2 }}>
          {notice.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Published on{" "}
          {new Date(notice.publicationDate.seconds * 1000).toLocaleString()}
        </Typography>
        <Typography variant="body1" paragraph>
          {notice.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default NoticeDetail;
