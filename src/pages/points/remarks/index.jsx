import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import axios from "axios";
import moment from "moment";

import { Card, Button } from "react-bootstrap";

import './index.scss';

const TITLE = import.meta.env.VITE_TITLE;

function Points_Remarks(){
    return(
        <>
        <div id="points_remarks">
            <Card>
                <Card.Header><Card.Title>퇴사 / 모범상 관리</Card.Title></Card.Header>
                <Card.Body>
                </Card.Body>
            </Card>
        </div>
        </>
    )
}

export default Points_Remarks;