import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  Link,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NoDataOverlay from "../NoDataOverlay";

const NoticeTable = ({ notices }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <TableContainer component={Paper} sx={{ mt: 2, overflowX: "auto" }}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            {!isMobile && <TableCell align="right">Publication Date</TableCell>}
            <TableCell align="right">Content Preview</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notices.map((notice) => (
            <TableRow
              key={notice.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Link
                  component={RouterLink}
                  to={`/notices/${notice.id}`}
                  underline="hover"
                >
                  {notice.title}
                </Link>
              </TableCell>
              {!isMobile && (
                <TableCell align="right">
                  {new Date(
                    notice.publicationDate.seconds * 1000
                  ).toLocaleString()}
                </TableCell>
              )}
              <TableCell align="right">{`${notice.content.substring(
                0,
                50
              )}...`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {notices.length === 0 && <NoDataOverlay />}
    </TableContainer>
  );
};

export default NoticeTable;
