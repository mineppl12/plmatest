import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

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

    const [ dataLoading, setDataLoading ] = useState(false);

    const [ optionList, setOptionList ] = useState([
        {data: "상점", view: true}, {data: "벌점", view: true}, {data: "기타", view: true}
    ]);

    useEffect(() => {
        init();
    }, []);

    async function init(allData = false){
        const data = await getData("https://points.jshsus.kr/api/points/history", {allData});
        
        const dataList = data.map((x, idx) => {
            const { id, date, act_date, teacher, user, reason_caption, beforeplus, beforeminus, afterplus, afterminus } = x;
            const delta = afterplus - beforeplus - (afterminus - beforeminus);

            return [
                <Button variant="danger" size="sm">삭제</Button>,
                id,
                moment(date).format("YYYY-MM-DD"),
                teacher.name,
                <a href="#">{"김철수"} ({user.stuid})</a>,
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
                data: <Dropdown onClick={optionHandler}>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" size="sm"
                                        >전체 보기</Dropdown.Toggle>

                        <Dropdown.Menu>
                            {optionList.map((x, idx) => {
                                return (<Dropdown.Item key={idx} active={x.view == true}
                                    onClick={(e) => { optionSelect(e, idx, x); }}>
                                    {x.data}
                                </Dropdown.Item>)
                                }
                            )}
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
        e.stopPropagation();
    }

    function optionSelect(e, idx, x){
        e = e || window.event;

        const arr = [...optionList];
        arr[idx].view = !arr[idx].view;

        setOptionList(arr);
    }

    async function refreshData(){
        if (dataLoading) return;

        setDataLoading(true);
        await init();
        setDataLoading(false);
    }

    async function allData(){
        if (dataLoading) return;

        setDataLoading(true);
        await init(true);
        setDataLoading(false);
    }

    return(
        <>
        <div id="points_history">
            <Card>
                <Card.Header><Card.Title>상벌점 기록</Card.Title></Card.Header>
                <Card.Body>
                    <div className="tableWrap">
                        <Card.Text className="label">상벌점 기록</Card.Text>
                        <DataTable 
                            className="historyTable"
                            columns={columns}
                            data={tableData}
                            order={[1, 'desc']}
                            options={{
                                language: {
                                    search: "통합 검색: "
                                },
                                button: [
                                    <Button className="tableButton" onClick={refreshData} disabled={dataLoading} variant="primary">새로고침</Button>,
                                    <Button className="tableButton" onClick={allData} disabled={dataLoading} variant="primary">전체 기록 조회</Button>
                                ]
                            }} />
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Points_History;