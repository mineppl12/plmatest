import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";

import './index.scss';

import { Card, Button } from "react-bootstrap";
import DataTable from "~shared/ui/datatable";

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
        const data = await getData("https://points.jshsus.kr/api/points/view");

        testList = data.map((x, idx) => {
            const { stuid, grade, num, name, plus, minus } = x;
            const className = x.class;

            return [
                <NavLink to="/check_history">{stuid}</NavLink>,
                stuid,
                grade,
                className,
                num,
                <NavLink to="/check_history">{name}</NavLink>,
                "김철수",
                plus,
                minus,
                0,
                plus - minus
            ];
        });

        setTableData(testList);
        setColumns([
            { data: "학번", className: "dt-link", orderBase: 1 },
            { hidden: true },
            { data: "학년" },
            { data: "반" },
            { data: "번호" },
            { data: "성명", className: "dt-name dt-link", orderBase: 6 },
            { hidden: true },
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

                        <DataTable
                            className="pointsViewTable"
                            columns={columns}
                            data={tableData}
                            options={{
                                language: {
                                    search: "통합 검색: "
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

export default Points_View;