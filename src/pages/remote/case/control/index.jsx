import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './index.scss';

import { Card } from "react-bootstrap";

const TITLE = import.meta.env.VITE_TITLE;

function Case_Control(){

    return(
        <>
        <div id="case_control">
            <Card>
                <Card.Header><Card.Title>보관함 조작</Card.Title></Card.Header>
            </Card>
        </div>
        </>
    )
}

export default Case_Control;