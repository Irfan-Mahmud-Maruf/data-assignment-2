import {  Container } from "@mui/material";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState([]);
    const [selectedData, setselectedData] = useState([]);
    const [page, setPage] = useState(0);
    const [pagination, setPagination] = useState([]);
    // let [page, setPage] = useState(0);
    // let page = 0;
    const API_URL = `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`;

    // useEffect(() => {
    //    fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0`)

    useEffect(() => {
        window.page = 0;
        call_interval();
    }, []);

    useEffect(() => {
        setPage(page + 1);
        let tempPaginition = [...pagination];
        tempPaginition.push(page + 1);
        setPagination(tempPaginition);

        console.log('updated data ', data);
    }, [data]);

    const call_interval = () => {
        window.data = [];
        setselectedData(data[0]);
        setInterval(() => {
            set_data()
        }, 5000);
    };

    const set_data = () => {
        axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${window.page}`)
            .then(res => {
                let hits = res.data.hits;
                window.page++;
                window.data.push(hits);
                setData([...window.data]);
            })
    }

    const set_view_data = (pageNO) => {
        // console.log(pageNO, data[pageNO]);
        setselectedData(data[pageNO]);
    }

    return (
        <div className="App">
            {
                <Container fixed>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>All Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedData?.length ? selectedData.map((row) => (
                                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.title}
                                        </TableCell>
                                    </TableRow>
                                )) :
                                    <TableRow>
                                        <TableCell>nai</TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            }
            {
                <Container fixed>
                    <Stack spacing={2}>
                    {/* {pagination.map((i) => (
                                
                                i < pagination.length ? 
                                // <Pagination count={i} variant="outlined" color="primary" onClick={() => set_view_data(i - 1)} />
                            //     <Button variant="outlined" size="small" onClick={() => set_view_data(i - 1)} sx={{
                            //         display: 'flex',
                            //         flexWrap: 'wrap',
                            //       }}>
                            //     {i}
                            //   </Button>
                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                              <Button onClick={() => set_view_data(i - 1)}>{i}</Button>
                            </ButtonGroup>
                                : <Button />
                             
                         ))} */}
                    {/* <Pagination count={pagination} variant="outlined" color="primary" onClick={() => set_view_data(i - 1)} /> */}
                        <ul className="d-flex flex-wrap">
                            {pagination.map((i) => (
                                
                                   i < pagination.length ? 
                                   <li onClick={() => set_view_data(i - 1)} key={i} className="btn btn-sm btn-success">{i}</li>
                                   : <li></li>
                                
                            ))}
                        </ul>
                    </Stack>
                </Container>
            }
        </div>
    );
}

export default App;
