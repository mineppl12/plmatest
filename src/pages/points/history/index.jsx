import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";
import moment from "moment";

import DataTable from '~shared/ui/datatable';
import MySwal from "~shared/ui/sweetalert";

import './index.scss';

import { Card, Button, Dropdown } from "react-bootstrap";

const TITLE = import.meta.env.VITE_TITLE;

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

function Points_History(){
    const [ tableData, setTableData ] = useState([]);
    const [ columns, setColumns ] = useState([]);
    const [ selectOption, setSelectOption ] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init(){
        const data = await getData("http://points.jshsus.kr/api/points/history");
        
        const dataList = data.map((x, idx) => {
            const { id, date, act_date, teacher, user, reason_caption, beforeplus, beforeminus, afterplus, afterminus } = x;
            const delta = afterplus - beforeplus - (afterminus - beforeminus);

            return [
                <Button variant="danger" size="sm">삭제</Button>,
                id,
                moment(date).format("YYYY-MM-DD"),
                teacher.name,
                <a href="#">{user.name} ({user.stuid})</a>,
                `${user.name} (${user.stuid})`,
                <>
                    <span className={`type ${delta < 0 ? "bad" : "good"}`}>{delta < 0 ? "벌점" : "상점"}</span>
                    <span className="score">{Math.abs(delta)}점</span>
                </>,
                delta,
                reason_caption.length > 40 ? reason_caption.substring(0, 40) + '...'  : reason_caption,
                moment(act_date).format("YYYY-MM-DD"),
                <Button variant="danger" size="sm">삭제</Button>
            ];
        });

        setColumns([
            { data: "선택", orderable: false },
            { data: "ID", className: "dt-id" },
            { data: "기준일자" },
            { data: "권한자" },
            { data: "성명 (학번)", className: "dt-link", searchBase: 5 },
            { hidden: true },
            {
                className: "dt-content",
                data: <Dropdown>
                        <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm"
                                         onClick={(e) => {optionHandler(e)}}>전체 보기</Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>,
                orderBase: 7
            },
            { hidden: true },
            { data: "사유", className: "dt-reason" },
            { data: "반영일시" },
            { data: "#", orderable: false }
        ]);

        setTableData(dataList);
    }

    function optionHandler(e){
        e.preventDefault();
        e.stopPropagation();
        e.stopPropagation();
    }

    return(
        <>
        <div id="points_history">
            <Card>
                <Card.Header><Card.Title>상벌점 기록</Card.Title></Card.Header>
                <Card.Body>
                    <div className="tableWrap">
                        <Card.Text className="label">상벌점 기록</Card.Text>
                        {/* <DataTable
                            id="pointsHistory" className="historyTable display stripe cell-border"
                            data={tableData}
                            options={{
                                columnDefs: [
                                    { targets: "_all", className: "dt-center" },
                                    { targets: [4], className: "dt-link"},
                                    { targets: [0, -1], className: "dt-button" },
                                    { targets: [5], className: "dt-content" },
                                    { targets: [6], className: "dt-reason" }
                                ],
                                language: {
                                    emptyTable: '상벌점 기록이 존재하지 않습니다.',
                                    search: "통합 검색: "
                                },
                                autoWidth: false,
                                info: false,
                                lengthChange: false,
                                order: [[1, 'desc']],
                            }}
                        >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>기준일자</th>
                                    <th>권한자</th>
                                    <th>성명 (학번)</th>
                                    <th>
                                        <Dropdown onClick={e => optionHandler}>
                                            <Dropdown.Toggle variant="info" id="dropdown-basic" size="sm">전체 보기</Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </th>
                                    <th className="dt-reason">사유</th>
                                    <th>반영일시</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </DataTable> */}
                        <DataTable 
                            className="historyTable"
                            columns={columns}
                            data={tableData}
                            order={[1, 'desc']}
                            options={{
                                language: {
                                    search: "통합 검색: "
                                }
                            }} />
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Points_History;