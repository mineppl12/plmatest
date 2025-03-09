import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './index.scss';

import axios from "axios";
import moment from "moment";

import DataTable from '~shared/ui/datatable';
import { Card, Button } from "react-bootstrap";

const TITLE = import.meta.env.VITE_TITLE;

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

function Case_Control(){
    const [ columns, setColumns ] = useState([]);
    const [ tableData, setTableData ] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init(){
        let dataList = await getData("https://points.jshsus.kr/api/remote/case");
        
        dataList = dataList.map((x, idx) => {
            const { id, status, name, updatedAt, updatedBy } = x;

            return [
                id,
                <span className="dt-name">{name}</span>,
                <span className={`dt-status ${status ? "open" : "closed"}`}>{status ? "해제 중" : "잠김"}</span>,
                <>
                    <Button className="rowButton operation" variant="success" size="sm">해제</Button>
                    <Button className="rowButton comm" variant="primary" size="sm">통신</Button>
                </>,
                `${moment(updatedAt).format("YYYY-MM-DD HH:MM:SS")} (${updatedBy})`
            ]
        });

        setTableData(dataList);
        setColumns([
            { data: "ID", orderable: false },
            { data: "디바이스명", orderable: false },
            { data: "잠금상태", orderable: false },
            { data: "조작 / 통신", orderable: false },
            { data: "마지막 기록", orderable: false }
        ]);
    }

    return(
        <>
        <div id="case_control">
            <Card>
                <Card.Header><Card.Title>보관함 조작</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text className="label">보관함 조작</Card.Text>
                    <div className="tableWrap">
                        <DataTable
                            className="remoteCaseControl"
                            columns={columns}
                            data={tableData}
                            options={{
                                search: false,
                                pagination: false
                            }}
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Case_Control;