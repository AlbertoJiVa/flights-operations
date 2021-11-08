import { useState } from "react";
import Moment from "react-moment";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  Box,
  Stack,
  Button,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DesktopDatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "../styles/FlightsTable.css";

const StyledTableCellPrimary = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#f1c933",
    backgroundColor: "#073590",
    border: "1px solid #f1c933",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableCellSecondary = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#f1c933",
    backgroundColor: "#073590",
    fontSize: 12,
  },
}));

export default function FlightsTable({
  flights,
  newFlihgt,
  signOut,
  blinkAllowed,
  ...props
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [value, setValue] = useState(new Date());
  const [eventAnchorEl, setEventAnchorEl] = useState(null);
  const [selectedEventSort, setSelectedEventSort] = useState("SELECT AIRPORT");
  const [filters, setFilters] = useState({ airport: null });

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleEventSortOpen = (event) => {
    setEventAnchorEl(event.currentTarget);
  };

  const handleEventSortClose = () => {
    setEventAnchorEl(null);
  };

  const handleEventSortSelect = (value) => {
    setSelectedEventSort(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      airport: value,
    }));
    setEventAnchorEl(null);
  };

  const sameDay = (d1, d2) => {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  const applyFilters = (flights, query, filters) =>
    flights.filter((flight) => {
      let matches = true;

      if (
        query &&
        !flight.arrival_number.toLowerCase().includes(query.toLowerCase()) &&
        !flight.departure_number.toLowerCase().includes(query.toLowerCase()) &&
        !flight.arrival_origin.toLowerCase().includes(query.toLowerCase()) &&
        !flight.departure_destiny.toLowerCase().includes(query.toLowerCase()) &&
        !flight.reg.toLowerCase().includes(query.toLowerCase())
      ) {
        matches = false;
      }

      if (
        filters.airport &&
        filters.airport !== "SELECT AIRPORT" &&
        flight.airport !== filters.airport
      ) {
        matches = false;
      }

      if (
        value &&
        !sameDay(value, new Date(flight.arrival_sta.seconds * 1000))
      ) {
        matches = false;
      }

      return matches;
    });

  const airports = [...new Set(flights.map((flight) => flight.airport))];
  const filteredFlights = applyFilters(flights, query, filters);

  return (
    <>
      <Card>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            m: -1,
            p: 2,
            background: "linear-gradient(90deg,#f3f3f4,#5975ac)",
          }}
        >
          <Box
            sx={{
              m: 1,
              maxWidth: "100%",
              width: 400,
            }}
          >
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              onChange={handleQueryChange}
              placeholder="Flight, Orig, Dest, Reg"
              value={query}
              variant="outlined"
            />
          </Box>
          <Box sx={{ m: 1, width: 200 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  inputFormat="MM/dd/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Box sx={{ m: 1, width: 200 }}>
            <Button
              sx={{ color: "black", background: "#efa53e" }}
              aria-controls="event-menu"
              aria-haspopup="true"
              endIcon={<ArrowDropDownIcon fontSize="small" />}
              variant="contained"
              onClick={handleEventSortOpen}
            >
              {selectedEventSort}
            </Button>
            <Menu
              id="airport-menu"
              anchorEl={eventAnchorEl}
              keepMounted
              open={Boolean(eventAnchorEl)}
              onClose={handleEventSortClose}
            >
              <MenuItem
                sx={{ minWidth: 150 }}
                onClick={() => handleEventSortSelect("SELECT AIRPORT")}
              >
                SELECT AIRPORT
              </MenuItem>
              {airports.map((airport) => (
                <MenuItem
                  key={airport}
                  sx={{ minWidth: 150 }}
                  onClick={() => handleEventSortSelect(airport)}
                >
                  {airport}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              m: 1,
              width: 240,
              ml: 10,
            }}
          >
            <Typography sx={{ color: "#ffffff" }} variant="h4">
              Operations
            </Typography>
          </Box>
        </Box>
        <Box sx={{ minWidth: 700 }}>
          <Table size="small" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCellPrimary align="center" colSpan={4} />
                <StyledTableCellPrimary align="center" colSpan={8}>
                  ARRIVALS
                </StyledTableCellPrimary>
                <StyledTableCellPrimary align="center" colSpan={9}>
                  DEPARTURES
                </StyledTableCellPrimary>
              </TableRow>
              <TableRow>
                <StyledTableCellSecondary>APT</StyledTableCellSecondary>
                <StyledTableCellSecondary>
                  Flight Status
                </StyledTableCellSecondary>
                <StyledTableCellSecondary>Reg</StyledTableCellSecondary>
                <StyledTableCellSecondary
                  sx={{ borderRight: "1px solid #f1c933" }}
                >
                  A/C Type
                </StyledTableCellSecondary>
                <StyledTableCellSecondary
                  sx={{ borderLeft: "1px solid #f1c933" }}
                >
                  Flight Nº
                </StyledTableCellSecondary>
                <StyledTableCellSecondary>Orig</StyledTableCellSecondary>
                <StyledTableCellSecondary>ETA</StyledTableCellSecondary>
                <StyledTableCellSecondary>STA</StyledTableCellSecondary>
                <StyledTableCellSecondary>ATA</StyledTableCellSecondary>
                <StyledTableCellSecondary>TOB</StyledTableCellSecondary>
                <StyledTableCellSecondary>BAG</StyledTableCellSecondary>
                <StyledTableCellSecondary
                  sx={{ borderRight: "1px solid #f1c933" }}
                >
                  Stand
                </StyledTableCellSecondary>
                <StyledTableCellSecondary
                  sx={{ borderLeft: "1px solid #f1c933" }}
                >
                  Flight Nº
                </StyledTableCellSecondary>
                <StyledTableCellSecondary>Dest</StyledTableCellSecondary>
                <StyledTableCellSecondary>CTOT</StyledTableCellSecondary>
                <StyledTableCellSecondary>ETD</StyledTableCellSecondary>
                <StyledTableCellSecondary>STD</StyledTableCellSecondary>
                <StyledTableCellSecondary>ATD</StyledTableCellSecondary>
                <StyledTableCellSecondary>TOB</StyledTableCellSecondary>
                <StyledTableCellSecondary>BAG</StyledTableCellSecondary>
                <StyledTableCellSecondary>Stand</StyledTableCellSecondary>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFlights.map((flight) => {
                const isNew = newFlihgt.id === flight.id;

                return (
                  <TableRow key={flight.id}>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.airport || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      <Typography
                        sx={{ display: "block" }}
                        color="textSecondary"
                        variant="caption"
                      >
                        En route
                      </Typography>
                      {flight.status || "..."}
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: "bold" }}
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.reg || "..."}
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #C0C0C0" }}
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.type || "..."}
                    </TableCell>
                    <TableCell
                      sx={{ borderLeft: "1px solid #C0C0C0" }}
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.arrival_number || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.arrival_origin || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      <Moment format="HH:mm">
                        {new Date(flight.arrival_eta.seconds * 1000)}
                      </Moment>
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      <Moment format="HH:mm">
                        {new Date(flight.arrival_sta.seconds * 1000)}
                      </Moment>
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.arrival_ata || "--:--"}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.arrival_tob || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.arrival_bag || "..."}
                    </TableCell>
                    <TableCell
                      sx={{ borderRight: "1px solid #C0C0C0" }}
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.arrival_stand || "..."}
                    </TableCell>
                    <TableCell
                      sx={{ borderLeft: "1px solid #C0C0C0" }}
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_number || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_destiny || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_ctot || "--:--"}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_etd || "--:--"}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      <Moment format="HH:mm">
                        {new Date(flight.departure_std.seconds * 1000)}
                      </Moment>
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_atd || "--:--"}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_tob || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_bag || "..."}
                    </TableCell>
                    <TableCell
                      className={isNew && blinkAllowed ? "blinking" : ""}
                    >
                      {flight.departure_stand || "..."}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Card>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "row-reverse" }}>
        <Button
          color="error"
          sx={{ mr: 2 }}
          onClick={() => handleSignOut()}
          variant="contained"
        >
          Sign Out
        </Button>
        <Button
          sx={{ mr: 2 }}
          component={RouterLink}
          to="/"
          variant="contained"
        >
          Back to Menu
        </Button>
      </Box>
    </>
  );
}
