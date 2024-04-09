import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Modal,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import { db } from "../../utils/db";

import StatusSnackBar from "../StatusSnackBar";

const desktopStyle = {
  "& .MuiTextField-root": { mb: 2 },
  Width: 400,
  padding: 2,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const mobileStyle = {
  "& .MuiTextField-root": { mb: 2 },
  Width: 400,
  padding: 2,
  position: "absolute",
  top: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const AddNoticeForm = ({ modalOpen, handleModalClose, onAdd }) => {
  const [title, setTitle] = useState("");
  const [publicationDate, setPublicationDate] = useState(null);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    await setIsSubmitting(true);
    await setError("");
    await setSuccess("");

    if (title.length < 5) {
      setError("Title must be at least 5 characters long");
      setIsSubmitting(false);
      return;
    }

    if (
      publicationDate === null ||
      publicationDate?.toDate().toString() === "Invalid Date"
    ) {
      setError("Publication date is required");
      setIsSubmitting(false);
      return;
    }
    if (content.length < 10) {
      setError("Content must be at least 10 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, "notices"), {
        title,
        publicationDate: Timestamp.fromDate(publicationDate.toDate()),
        content,
      });
      setTitle("");
      setPublicationDate(null);
      setContent("");
      setSuccess("New notice created successfully");
      onAdd();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={modalOpen}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        data-testid="add-form-container"
        component="form"
        sx={isMobile ? mobileStyle : desktopStyle}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Add New Notice
        </Typography>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Publication Date"
            value={publicationDate}
            onChange={setPublicationDate}
            renderInput={(params) => (
              <TextField {...params} fullWidth required />
            )}
          />
        </LocalizationProvider>

        <TextField
          fullWidth
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
        <StatusSnackBar success={success} error={error} />
      </Box>
    </Modal>
  );
};

export default AddNoticeForm;
