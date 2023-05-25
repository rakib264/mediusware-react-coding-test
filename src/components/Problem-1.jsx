import React, { useState } from "react";
import { useEffect } from "react";

const Problem1 = () => {
    const [show, setShow] = useState('all');
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
  
    const [store, setStore] = useState([]);
    const [items, setItems] = useState([]);
    const [activeItems, setActiveItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);


   const sortItems = (values) => {
    const priority = {
      active: 1,
      completed: 2,
    };


    if(values && values.length){
        const sortedItems = [...values].sort((a, b) => {
            return priority[a.status] - priority[b.status];
          });
        
    setItems(sortedItems);
    }
  
    
  };

  const showActiveItem = () => {
    
    const activeItemsData = [...store].filter(
      (item) => item.status === "active"
    );
    setActiveItems(activeItemsData);
  };

  const showCompletedItem = () => {
    const completedItemDaa = [...store].filter(
      (item) => item.status === "completed"
    );
    setCompletedItems(completedItemDaa);
  };

  const handleClick = (val, values = null) => {
    setShow(val);
    if (val === "all") {
        sortItems(values);
    } else if (val === "active") {
      showActiveItem();
    } else {
      showCompletedItem();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = [...store, {
        name: name,
        status: status,
      }]

    setStore(values);
    setName("");
    setStatus("");
    handleClick("all", values);
  };

  const renderItem = (item, index) => (
    <tr key={index}>
    <td>{item.name}</td>
    <td>{item.status}</td>
  </tr>
  )




  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            className="row gy-2 gx-3 align-items-center mb-4"
            onSubmit={handleSubmit}
          >
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value.toLowerCase())}
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            {show === "all" && (
              <tbody>
                {items && items.length>0 &&
                  items.map((item, index) => (
                    renderItem(item, index)
                  ))}
              </tbody>
            )}
            {show === "active" && (
              <tbody>
                {activeItems && activeItems.length>0 &&
                  activeItems.map((item, index) => (
                    renderItem(item, index)
                  ))}
              </tbody>
            )}
            {show === "completed" && (
              <tbody>
                { completedItems && completedItems.length>0 &&
                  completedItems.map((item, index) => (
                    renderItem(item, index)
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
