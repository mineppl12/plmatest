import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";
import './index.scss';

import DataTable from "~shared/ui/dataTable";

import { Card, Button } from "react-bootstrap";

const TITLE = import.meta.env.VITE_TITLE;

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

function Points_Apply(){
    const [ columns, setColumns ] = useState([]);
    const [ tableData, setTableData ] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init(){
        let testList = [];

        setTableData(testList);
        setColumns([
            { data: "ID" },
            { data: "학년" },
            { data: "반" },
            { data: "번호" },
            { data: "기준일자" },
            { data: "성명 (학번)" },
            { data: "유형" },
            { data: "반영 내용" },
            { data: "처리 후 합계" },
            { data: "사유" },
            { data: "반영일시" }
        ]);
    }

    return(
        <>
        <div id="points_apply">
            <Card>
                <Card.Header><Card.Title>상벌점 부여</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text className="label">학생 검색</Card.Text>
                    <Card.Text className="label">발급 내용</Card.Text>
                    <Card.Text className="label">임의 표시 정보</Card.Text>

                    <div className="tableWrap">
                        <br/>
                        <Card.Text className="label">발급할 상벌점 목록</Card.Text>
                        {/* <DataTable
                            id="pointsView" className="pointsTable display stripe"
                            data={tableData} options={{
                                "columnDefs": [
                                    {
                                        targets: "_all",
                                        className: "dt-center"
                                    },
                                    {
                                        targets: [0, 4],
                                        className: "dt-link",
                                        render: ( data, type, row ) => {
                                            return `<a href="/points/view/?student=${data}">${data}</a>`;
                                        }
                                    }
                                ],
                                language: {
                                    emptyTable: '부여할 상벌점 카드가 등록되지 않았습니다'
                                },
                                autoWidth: false,
                                info: false,
                                lengthChange: false,
                                order: [[0, 'asc']]
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>학년</th>
                                    <th>반</th>
                                    <th>번호</th>
                                    <th>기준일자</th>
                                    <th>성명 (학번)</th>
                                    <th>유형</th>
                                    <th>반영 내용</th>
                                    <th>처리 후 합계</th>
                                    <th className="reason">사유</th>
                                    <th>반영일시</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </DataTable> */}
                        <DataTable 
                            className="pointsApplyTable"
                            data={tableData}
                            columns={columns}
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Points_Apply;