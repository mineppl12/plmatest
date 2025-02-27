import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';

import './index.scss';
import { lightning_bolt } from "~shared/scripts/lightning_bolt.js";

const TITLE = import.meta.env.VITE_TITLE;

function Home(){
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    const resizeHandler = useCallback(() => {
        setStageSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
    
        canvas.width = stageSize.width;
        canvas.height = stageSize.height;
        const ctx = canvas.getContext("2d");
        ctxRef.current = ctx;

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        draw(ctx);
      }, [stageSize]);

    function init(){
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        };
    }

    function draw(ctx){
        ctx.fillStyle = '#001C30';

        ctx.fillRect(0, 0, stageSize.width, stageSize.height);

        lightning_bolt(ctx, stageSize);
    }

    return(
        <>
        <div id="about">
            <canvas
                width={stageSize.width}
                height={stageSize.height}
                tabIndex={0}
                ref={canvasRef}
            ></canvas>
        </div>
        </>
    )
}

export default Home;