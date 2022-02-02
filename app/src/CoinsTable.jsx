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
  { id: "index", label: "#", minWidth: 20 },

  { id: "name", label: "Name", minWidth: 40, align: "left", minWidth: 100 },
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

function CoinsTable({ setCompareCoins, compareCoins, callBackFunc, coins }) {
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
      <Paper
        sx={{
          position: "relative",
          height: "99vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <TableContainer sx={{ maxHeight: "90%" }}>
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
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "index") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <span>{index + 1 + page * rowsPerPage}</span>
                            </TableCell>
                          );
                        }
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
                              <MenueButton
                                currentCoin={row}
                                setCompareCoins={setCompareCoins}
                                callBackFunc={callBackFunc}
                                compareCoins={compareCoins}
                                coins={coins}
                              />
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
          style={{ position: "absolute", bottom: "0px", right: "0px" }}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={coins.length}
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
