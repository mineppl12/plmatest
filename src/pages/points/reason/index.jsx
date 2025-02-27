import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";

import MySwal from "~shared/ui/sweetalert";

import { Card } from "react-bootstrap";
import DataTable from '~shared/ui/dataTable';

import './index.scss';

const TITLE = import.meta.env.VITE_TITLE;

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

function Points_Reason(){
    const [ columns, setColumns ] = useState([]);
    const [ tableData, setTableData ] = useState([]);
    
    useEffect(() => {
        init();
    }, []);

    async function init(){
        let testList = [];
        const data = await getData("http://points.jshsus.kr/api/points/reason");

        testList = data.map((x, idx) => {
            const { id, title, plus, minus } = x;
            const delta = plus - minus;

            return [ id, title, delta, "" ];
        });

        setTableData(testList);
        setColumns([
            { data: "번호" },
            { data: "반영 내용", className: "dt-reason" },
            { data: "반영 정보" },
            { data: "#" }
        ])
    }

    return(
        <>
        <div id="points_reason">
            <Card>
                <Card.Header><Card.Title>사유 관리</Card.Title></Card.Header>
                <Card.Body>
                    <div className="tableWrap">
                        <Card.Text className="label">상벌점 사유 현황</Card.Text>
                        {/* <DataTable
                            id="pointsReason" className="pointsReasonTable display stripe cell-border"
                            data={tableData} options={{
                                "columnDefs": [
                                    {
                                        targets: "_all",
                                        className: "dt-center"
                                    },
                                    {
                                        targets: [1],
                                        className: "dt-reason"
                                    }
                                ],
                                language: {
                                    emptyTable: '불러온 상벌점 사유 정보가 없습니다.',
                                    search: "통합 검색: "
                                },
                                autoWidth: false,
                                info: false,
                                lengthChange: false,
                                order: [[0, 'asc']]
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>번호</th>
                                    <th className="dt-reason">반영 내용</th>
                                    <th>반영정보</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </DataTable> */}

                        <DataTable
                            className="pointsReasonTable"
                            columns={columns}
                            data={tableData}
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Points_Reason;