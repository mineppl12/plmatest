import { useState, useEffect, useRef } from 'react';
import Pagination from 'react-bootstrap/Pagination';

import './index.scss';

async function getData(url, params = {}){
    const response = await axios.get(`${url}`, {
        params: params
    });

    return response.data;
}

const maxViewPage = 5;

const DataTable = ({ columns, data, order, className, options }) => {
    const [ sortMethod, setSortMethod ] = useState({});
    const [ rowPerPage, setRowPerPage ] = useState(10);
    const [ page, setPage ] = useState(1);
    const [ maxPage, setMaxPage ] = useState(0);

    const [ filteredData, setFilteredData ] = useState(data);
    const [ viewData, setViewData ] = useState(data);

    const thRef = useRef([]);
    const thRefWidths = useRef([]);

    function pagination(sortedData, rowCount, pageTo){
        const slicedData = sortedData.slice((pageTo - 1) * rowCount, pageTo * rowCount);

        setPage(pageTo);

        return slicedData;
    }

    function sort(wholeData, wholeColumns, sortMethodTo){
        let { column, asc } = sortMethodTo;
        column = wholeColumns[column] ? (wholeColumns[column].orderBase ? wholeColumns[column].orderBase : column) : column;

        function compare(a, b){
            if (typeof a === 'number' && typeof b === 'number') return a - b;

            const strA = String(a);
            const strB = String(b);
            
            return strA.localeCompare(strB, undefined, { numeric: true });
        }

        wholeData.sort((x, y) => {
            const result = compare(x[column], y[column]);
            
            return asc ? result : -result;
        });

        setSortMethod(sortMethodTo);

        return wholeData;
    }

    function fixWidth(refs){
        const el = refs.current;
        const widths = [];

        el.map((x, idx) => {
            const w = x.offsetWidth;
            widths.push(w);
            x.style.width = `${w}px`;
        });

        return widths;
    }

    function draw(wholeData, wholeColumns, sortMethodTo, pageTo){
        const sortedData = sort(wholeData, wholeColumns, sortMethodTo);
        const slicedData = pagination(sortedData, rowPerPage, pageTo);

        if (!thRefWidths.current) thRefWidths.current = fixWidth(thRef);

        setMaxPage(Math.floor(sortedData.length / rowPerPage));
        setFilteredData(wholeData);
        setViewData(slicedData);
    }

    function filter(e, wholeData, columns, sortMethod, page){
        e = e || window.event;

        const keyword = String(e.target.value);

        if (keyword == ""){
            draw(wholeData, columns, sortMethod, page);
            return;
        }

        const finalData = [];

        wholeData.map((col, idx) => {
            const isValid = col.map((td, _) => {
                if (!(typeof td == "string" || typeof td == "number")) return false;
                td = String(td);
                if (td.search(keyword) >= 0) return true;
                else false;
            }).reduce((x, y) => x || y);

            if (!isValid) return [];
            else{
                finalData.push(col);
                return col;
            }
        });

        draw(finalData, columns, sortMethod, page);
    }

    useEffect(() => {
        draw(data, columns, {column: order ? order[0] : 0, asc: order ? order[1] === 'asc' : true}, 1);
    }, [data, order, columns]);

    return(
        <div className="tableWrapper">
            <div className="tableFilter">
                <div className="input_wrap">
                    <h1 className="filterText">{options ? (options.language ? (options.language.search ? options.language.search : "Search: ") : "Search: ") : "Search: "}</h1>
                    <input type="text"
                        className="filterInput"
                        onInput={(e) => {
                            filter(e, data, columns, sortMethod, page);
                        }}
                    />
                </div>
            </div>
            <table className={`dataTable ${className}`}>
                <colgroup>
                    {columns.map((col, idx) => (
                        <col key={idx} data-dt-column={idx}></col>
                    ))}
                </colgroup>
                <thead>
                    <tr>
                        {columns.map((col, idx) => {
                            if (col.hidden) return "";
                            else return (
                                <th className={`${col.className ? col.className : ""} ${col.orderable === false ? "" : "dt-column-orderable"} ${col.orderable != false && sortMethod.column == idx ? "dt-column-ordered" : ""} ${(col.orderable != false && sortMethod.column == idx) ? (sortMethod.asc ? "dt-column-ordered-asc" : "dt-column-ordered-desc") : ""}`}
                                    key={idx}
                                    data-dt-column={idx}
                                    onClick={() => {
                                        if (col.orderable === false) return;

                                        if (sortMethod.column == idx) draw(data, columns, {column: idx, asc: !sortMethod.asc}, 1);
                                        else draw(data, columns, {column: idx, asc: true}, 1);
                                    }}
                                    ref={el => thRef.current[idx] = el}>
                                    <span className="dt-column-title">{col.data}</span>
                                    <span className="dt-column-order"></span>
                                </th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {viewData ? viewData.map((row, idx) => (
                        <tr key={idx}>{
                            row.map((item, iidx) => {
                                if (!columns[iidx]) return "";

                                if (columns[iidx].hidden) return "";
                                else return (
                                    <td key={iidx}
                                        className={`${columns[iidx] ? (columns[iidx].className ? columns[iidx].className : "") : ""}`}>
                                        {item}</td>);
                                })
                        }</tr>
                    )) : ""}
                </tbody>
            </table>
            <div className="tablePagination">
                {(() => {
                    if (maxPage <= maxViewPage){
                        const firstPages = new Array(maxPage).fill(0);

                        return(
                            <Pagination>
                                <Pagination.Prev disabled={page <= 1} onClick={() => { if (page > 1) draw(filteredData, columns, sortMethod, page - 1)}} />
                                    {
                                        firstPages.map((x, idx) => <Pagination.Item key={idx}
                                                                                    active={idx + 1 == page}
                                                                                    onClick={() => {draw(filteredData, columns, sortMethod, idx + 1)}}>
                                                                                    {idx + 1}
                                                                    </Pagination.Item>)
                                    }
                                    <Pagination.Next disabled={page >= maxPage} onClick={() => { if (page < maxPage) draw(filteredData, columns, sortMethod, page + 1)}} />
                            </Pagination>
                        );
                    }

                    if (page < maxViewPage){
                        const firstPages = new Array(maxViewPage).fill(0);

                        return (
                            <Pagination>
                                <Pagination.Prev disabled={page <= 1} onClick={() => { if (page > 1) draw(filteredData, columns, sortMethod, page - 1)}} />
                                {
                                    firstPages.map((x, idx) => <Pagination.Item key={idx}
                                                                                active={idx + 1 == page}
                                                                                onClick={() => {draw(filteredData, columns, sortMethod, idx + 1)}}>
                                                                                {idx + 1}
                                                                </Pagination.Item>)
                                }
                                <Pagination.Ellipsis />
                                <Pagination.Item onClick={() => { draw(filteredData, columns, sortMethod, maxPage)}}>{maxPage}</Pagination.Item>
                                <Pagination.Next onClick={() => { draw(filteredData, columns, sortMethod, page + 1)}} />
                            </Pagination>
                        );
                    }

                    else if (page >= maxViewPage && page <= maxPage - maxViewPage + 1) return (
                        <Pagination>
                            <Pagination.Prev onClick={() => { draw(filteredData, columns, sortMethod, page - 1)}} />
                            <Pagination.Item onClick={() => { draw(filteredData, columns, sortMethod, 1)}}>{1}</Pagination.Item>
                            <Pagination.Ellipsis />

                            <Pagination.Item onClick={() => { draw(filteredData, columns, sortMethod, page - 1)}}>{page - 1}</Pagination.Item>
                            <Pagination.Item active>{page}</Pagination.Item>
                            <Pagination.Item onClick={() => { draw(filteredData, columns, sortMethod, page + 1)}}>{page + 1}</Pagination.Item>

                            <Pagination.Ellipsis />
                            <Pagination.Item>{maxPage}</Pagination.Item>
                            <Pagination.Next onClick={() => { draw(filteredData, columns, sortMethod, page + 1)}} />
                        </Pagination>
                    );

                    else if (page > maxPage - maxViewPage + 1){
                        const lastPages = new Array(maxViewPage).fill(0);

                        return (
                            <Pagination>
                                <Pagination.Prev onClick={() => { draw(filteredData, columns, sortMethod, page - 1)}} />
                                <Pagination.Item onClick={() => { draw(filteredData, columns, sortMethod, 1)}} >{1}</Pagination.Item>
                                <Pagination.Ellipsis />

                                {
                                    lastPages.map((x, idx) => <Pagination.Item key={idx}
                                                                                active={maxPage - maxViewPage + idx + 1 == page}
                                                                                onClick={() => {draw(filteredData, columns, sortMethod, maxPage - maxViewPage + idx + 1)}}>
                                                                                {maxPage - maxViewPage + idx + 1}
                                                                </Pagination.Item>)
                                }
                                <Pagination.Next disabled={page >= maxPage} onClick={() => { if (page < maxPage) draw(filteredData, columns, sortMethod, page + 1)}} />
                            </Pagination>
                        );
                    }
                })()}
            </div>
        </div>
    )
}

export default DataTable;