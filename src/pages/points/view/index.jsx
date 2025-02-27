import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";

import './index.scss';

import { Card, Button } from "react-bootstrap";
import DataTable from "~shared/ui/dataTable";

const TITLE = import.meta.env.VITE_TITLE;

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

function Points_View(){
    const [ tableData, setTableData ] = useState([]);
    const [ columns, setColumns ] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init(){
        let testList = [];
        const data = await getData("http://points.jshsus.kr/api/points/view");

        testList = data.map((x, idx) => {
            const { stuid, grade, num, name, plus, minus } = x;
            const className = x.class;

            return [
                <a href="#">{stuid}</a>,
                grade,
                className,
                num,
                <a href="#">{name}</a>,
                plus,
                minus,
                0,
                plus - minus
            ];
        });

        setTableData(testList);
        setColumns([
            { data: "학번", className: "dt-link" },
            { data: "학년" },
            { data: "반" },
            { data: "번호" },
            { data: "성명", className: "dt-name dt-link" },
            { data: "누계 상점" },
            { data: "누계 벌점" },
            { data: "기타" },
            { data: "합계", className: "dt-sum" }
        ]);
    }

    return(
        <>
        <div id="points_view">
            <Card>
                <Card.Header><Card.Title>상벌점 현황</Card.Title></Card.Header>
                <Card.Body>
                    <Card.Text className="label">학생 검색</Card.Text>

                    <div className="tableWrap">
                        <br/>
                        <Card.Text className="label">상벌점 현황</Card.Text>
                        {/* <DataTable
                            id="pointsView" className="pointsTable display stripe cell-border"
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
                                    },
                                    {
                                        targets: [-1],
                                        className: "dt-sum"
                                    }
                                ],
                                language: {
                                    emptyTable: '불러온 학생 정보가 없습니다.'
                                },
                                oLanguage: {
                                    sSearch: "통합 검색:"
                                },
                                autoWidth: false,
                                info: false,
                                lengthChange: false,
                                order: [[0, 'asc']]
                            }}
                        >
                            <thead>
                                <tr>
                                    <th className="dt-name dt-link">학번</th>
                                    <th>학년</th>
                                    <th>반</th>
                                    <th>번호</th>
                                    <th className="dt-name dt-link">성명</th>
                                    <th>누계 상점</th>
                                    <th>누계 벌점</th>
                                    <th>기타</th>
                                    <th className="dt-sum">합계</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </DataTable> */}

                        <DataTable
                            className="pointsViewTable"
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

export default Points_View;