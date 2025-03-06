import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";

import MySwal from "~shared/ui/sweetalert";

import { Card, Button } from "react-bootstrap";
import DataTable from '~shared/ui/datatable';

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
        const data = await getData("https://points.jshsus.kr/api/points/reason");

        testList = data.map((x, idx) => {
            const { id, title, plus, minus } = x;
            const delta = plus - minus;

            return [
                id,
                title,
                <>
                    <span className={`type ${delta < 0 ? "bad" : "good"}`}>{delta < 0 ? "벌점" : "상점"}</span>
                    <span className="score">{Math.abs(delta)}점</span>
                </>,
                delta,
                <>
                    <Button className="editButton" variant="primary" size="sm">수정</Button>
                    <Button className="editButton" variant="danger" size="sm">삭제</Button>
                </>
            ];
        });

        setColumns([
            { data: "번호" },
            { data: "반영 내용", className: "dt-reason" },
            { data: "반영 정보", className: "dt-content", orderBase: 3 },
            { hidden: true },
            { data: "#", className:"dt-button" }
        ]);
        
        setTableData(testList);
    }

    return(
        <>
        <div id="points_reason">
            <Card>
                <Card.Header><Card.Title>사유 관리</Card.Title></Card.Header>
                <Card.Body>
                    <div className="tableWrap">
                        <Card.Text className="label">상벌점 사유 현황</Card.Text>

                        <DataTable
                            className="pointsReasonTable"
                            columns={columns}
                            data={tableData}
                            options={{
                                language: {
                                    search: "사유 검색: "
                                }
                            }}
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Points_Reason;