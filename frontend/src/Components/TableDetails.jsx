import React, { useState } from "react";

function TableDetails({
  elements,
  pageNumbers,
  decrementPageData,
  incrementPageData,
  pageNumber,
}) {
  return (
    <>
      <div className="table-responsive mytable">
        <table class="table table-bordered table-striped">
          <thead>
            <tr className="table-dark">
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {elements.map((element) => (
              <tr>
                <td className="">{element.id}</td>
                <td>{element.title}</td>
                <td>{element.description}</td>
                <td>{element.price}</td>
                <td>{element.category}</td>
                <td>{element.sold.toString()}</td>
                <td className="myimagePart">
                  <img
                    src={element.image}
                    className="img-fluid mx-auto d-block"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mydivPart d-flex justify-content-between align-items-center my-2">
        <div>
          <h3>
            Page No:<span className="text-primary">{pageNumber}</span>
          </h3>
        </div>
        <div className="d-flex flex-column flex-md-row flex-lg-row">
          <button
            onClick={() => incrementPageData(pageNumbers)}
            className="me-2 btn btn-primary my-2"
          >
            Next
          </button>
          <button
            onClick={() => decrementPageData(pageNumbers)}
            className=" my-2 btn btn-primary"
          >
            Previous
          </button>
        </div>
        <div>
          <h3>
            Total data:<span className="text-success">{elements.length}</span>
          </h3>
          <p style={{fontSize:'19px', textAlign:'center'}} className="fw-bold">(10 items in 1 page)</p>
        </div>
      </div>
    </>
  );
}

export default TableDetails;
