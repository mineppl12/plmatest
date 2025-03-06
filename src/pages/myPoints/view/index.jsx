import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import moment from "moment";
import getData from "~shared/scripts/getData.js";

import './index.scss';

import { Card, Badge, Button, Dropdown } from "react-bootstrap";
import DataTable from '~shared/ui/datatable';

const TITLE = import.meta.env.VITE_TITLE;
const userID = 32020; // 32067

function MyPoints_View(){
    const [ userInfo, setUserInfo ] = useState({});
    const [ tableData, setTableData ] = useState([]);
    const [ columns, setColumns ] = useState([]);

    useEffect(() => {
        init();
    }, []);

    async function init(){
        const userInfoData = await getData("https://points.jshsus.kr/api/user", { userID });
        if (userInfoData["msg"]) return;
        const { name, stuid, plus, minus, history } = userInfoData;
        const etc = 0;

        const userHistory = history.map((x, idx) => {
            const { id, date, act_date, teacher, reason_caption, beforeplus, beforeminus, afterplus, afterminus } = x;
            const delta = afterplus - beforeplus - (afterminus - beforeminus);

            return [
                "",
                id,
                moment(date).format("YYYY-MM-DD"),
                teacher.name,
                <a href="#">{name} ({stuid})</a>,
                <>
                    <span className={`type ${delta < 0 ? "bad" : "good"}`}>{delta < 0 ? "벌점" : "상점"}</span>
                    <span className="score">{Math.abs(delta)}점</span>
                </>,
                delta,
                reason_caption.length > 40 ? reason_caption.substring(0, 40) + '...'  : reason_caption,
                moment(act_date).format("YYYY-MM-DD"),
                <Button variant="danger" size="sm">이의 제기</Button>
            ];
        });

        setTableData(userHistory);
        setUserInfo({ name, stuid, plus, minus, etc, points: plus - minus });

        setColumns([
            { data: "선택", orderable: false },
            { data: "ID", className: "dt-id" },
            { data: "기준일자" },
            { data: "권한자" },
            { data: "성명 (학번)", className: "dt-link" },
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
                orderBase: 6
            },
            { hidden: true },
            { data: "사유", className: "dt-reason" },
            { data: "반영일시" },
            { data: "#", orderable: false }
        ]);
    }

    function handleButtonClick(id) {
        alert(`Button clicked for ID: ${id}`);
    }

    return(
        <>
        <div id="mypoints_view">
            <Card>
                <Card.Header><Card.Title>내 상벌점</Card.Title></Card.Header>
                <Card.Body>
                    <br/>
                    <h1 className="label myPoint">
                        <span className="sum">{userInfo.points}점</span>
                        <Badge className="plus">상점: +{userInfo.plus}</Badge>
                        <Badge className="minus">벌점: -{userInfo.minus}</Badge>
                        <Badge className="etc">기타: {userInfo.etc}</Badge>
                    </h1>

                    <div className="tableWrap">
                        <br/>
                        <Card.Text className="label">상벌점 기록</Card.Text>
                        <DataTable 
                            className="myPointsViewTable"
                            columns={columns}
                            data={tableData}
                            order={[1, 'desc']}
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

export default MyPoints_View;