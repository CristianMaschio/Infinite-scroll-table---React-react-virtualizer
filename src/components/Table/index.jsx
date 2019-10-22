import React, { useEffect, useState } from "react";
import { Table as TableVirtualized, Column } from "react-virtualized";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import "react-virtualized/styles.css";
import "./table.css";

/*
 *  Improvements:
 *  - I could use prop-types to improve the readability of the component's props and the future reuse of it
 *  - Create a better style using: ant or material design and Scss
 *  - Create a loading
 *  - Create an error management
 *  - Create a Jest test
 *  Other:
 *  - Here I used React Hooks but in a similar project i use components, prop-types, scss and ant
 *    link: https://github.com/CristianMaschio/coding-todos
 */

function Table() {
  // -------life-cycles------
  const [data, setData] = useState([]);
  const [startDataApi, setStartDataApi] = useState(0);

  /*
   * here I use a fake API give by https://jsonplaceholder.typicode.com/ and I simulate
   * multiple call for making similar call as description `/api/read?start=100&length=100`
   * this call receive an array of 500 objects for stress much better as possible this component
   *
   * this useEffect is called only when the state "startDataApi" is changed
   */
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(response => response.json())
      .then(newData => setData(newData));
  }, [startDataApi]);

  // -------functions------
  const nextPage = () => {
    setStartDataApi(startDataApi + 500);
  };

  const prevPage = () => {
    if (startDataApi >= 500) setStartDataApi(startDataApi - 500);
  };

  /*
   *  For improve the performance i use react-virtualized.
   *  It will allow us to take large sets of data, process them on the fly,
   *  and render them with little-to-no jank.
   */
  return (
    <div className="table">
      <AutoSizer disableHeight>
        {({ width }) => (
          <TableVirtualized
            width={width}
            height={400}
            headerHeight={30}
            rowHeight={30}
            rowCount={data.length}
            rowGetter={({ index }) => data[index]}
          >
            <Column
              label="Id"
              dataKey="id"
              width={60}
              cellDataGetter={({ rowData }) => rowData.id + startDataApi}
            />
            <Column
              label="Name"
              width={200}
              dataKey="name"
              cellRenderer={({ rowData }) => rowData.name}
            />
            <Column
              label="Email"
              width={200}
              dataKey="email"
              cellRenderer={({ rowData }) => rowData.email}
            />
            <Column
              label="Body"
              width={200}
              dataKey="body"
              cellRenderer={({ rowData }) => rowData.body}
              flexGrow={1}
            />
          </TableVirtualized>
        )}
      </AutoSizer>
      <div className="table-nav-container">
        <div
          className={`prev-button ${startDataApi === 0 ? "disable" : ""}`}
          onClick={prevPage}
        >
          {"<< Prev page"}
        </div>
        <div>Current page: {startDataApi / 500}</div>
        <div className="next-button" onClick={nextPage}>
          {"Next page >>"}
        </div>
      </div>
    </div>
  );
}

export default Table;
