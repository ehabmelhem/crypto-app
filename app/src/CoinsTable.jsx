import { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Graph from "./Graph";
import MenueButton from "./MenueButton";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const columns = [
  { id: "name", label: "Name", minWidth: 100 },
  {
    id: "priceChange1d",
    label: "24h CHANGE",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "PRICE",
    minWidth: 40,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "priceBtc",
    label: "RICE IN BTC",
    minWidth: 40,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "marketCap",
    label: "MARKET CAP",
    minWidth: 40,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "volume",
    label: "VOLUME 24H",
    minWidth: 40,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "chart",
    label: "PRICE GRAPH(70)",
    minWidth: 40,
    align: "left",
    format: (value) => value.toFixed(2),
  },
  {
    id: "menueButton",
    label: "menue",
    minWidth: 40,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  //         <MenueButton />
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

function CoinsTable({ coins }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="App">
      {/* {coins.map((coin, index) => {
        return <h3>{coin.id}</h3>;
      })} */}
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {coins
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "name") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <div className="coin__name">
                                <img className="coin__icon" src={row["icon"]} />
                                <div>
                                  {value}{" "}
                                  <span className="coin_symbol">
                                    * {row["symbol"]}
                                  </span>
                                </div>
                              </div>
                            </TableCell>
                          );
                        }
                        if (column.id === "priceChange1d") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span
                                className={`change__24 ${
                                  value > 0 ? "active" : "dis__active"
                                }`}
                              >
                                {value < 0 ? (
                                  <ArrowDropDownIcon />
                                ) : (
                                  <ArrowDropUpIcon />
                                )}
                                {value}%
                              </span>
                            </TableCell>
                          );
                        }
                        if (column.id === "menueButton") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <MenueButton />
                            </TableCell>
                          );
                        }
                        if (column.id === "chart") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Graph
                                isUp={row["priceChange1d"] > 0 ? true : false}
                                coinID={row["id"]}
                              />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default CoinsTable;
