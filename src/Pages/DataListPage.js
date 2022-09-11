import React, { useEffect, useState } from "react";
import ExportToCSV from "../components/ExportToCSV";
import Graph from "../components/Graph";
import Home from "../home/home";
import DeviceTelemetryService from "../services/general/DeviceTelemetryService";
import ModalOne from "../shared/modal/ModalOne";

const DataListPage = () => {
  const [allDevice, setAllDevice] = useState([]);
  const [selectedSortCategory, setSelectedSortCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [toggleSelectedFeild, setToggleSelectedFeild] = useState(false);
  const [searchTogglrSelected, setSearchToggleSelected] = useState(false);
  const [isSortedToggle, setIsSortedToggle] = useState(false);
  const [searchField, setSearchField] = useState("");
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    DeviceTelemetryService.list().then((res) => {
      setAllDevice(res.data.deviceTelemetry);
      setDevices(res.data.deviceTelemetry);
    });
  }, []);

  useEffect(() => {
    if (selectedSortCategory !== "") {
      setToggleSelectedFeild(true);
    }
  }, [selectedSortCategory]);
  useEffect(() => {
    if (searchCategory !== "") {
      setSearchToggleSelected(true);
    }
  }, [searchCategory]);

  const handleSortCategoryChange = (e) => {
    let sortValue = e.target.value;
    setSelectedSortCategory(sortValue);
  };

  const handleSearchCategoryChange = (e) => {
    let searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const listSortType = (e) => {
    let typeOfSort = e.target.value;
    if (selectedSortCategory === "tds") {
      if (typeOfSort === "asc") {
        let assendingTds = () => {
          let sorted = allDevice.sort(
            (a, b) =>
              JSON.parse(a.desc.replaceAll("'", '"')).tds -
              JSON.parse(b.desc.replaceAll("'", '"')).tds
          );
          return sorted;
        };
        setIsSortedToggle(true);
        setAllDevice(assendingTds);
      } else if (typeOfSort === "desc") {
        let decendingTds = () => {
          let sorted = allDevice.sort(
            (a, b) =>
              JSON.parse(b.desc.replaceAll("'", '"')).tds -
              JSON.parse(a.desc.replaceAll("'", '"')).tds
          );
          return sorted;
        };
        setIsSortedToggle(false);
        setAllDevice(decendingTds);
      }
    } else if (selectedSortCategory === "time") {
      if (typeOfSort === "asc") {
        let assendingTime = () => {
          let sorted = allDevice.sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at)
          );
          return sorted;
        };
        setIsSortedToggle(true);
        setAllDevice(assendingTime);
      } else if (typeOfSort === "desc") {
        let decendingTime = () => {
          let sorted = allDevice.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          return sorted;
        };
        setIsSortedToggle(false);
        setAllDevice(decendingTime);
      }
    }
  };
  useEffect(() => {
    if (searchField === "") {
      setAllDevice(devices);
    } else {
      if (searchCategory === "macId") {
        const filterData = allDevice.filter((item) => {
          return item.device.macid
            .toLowerCase()
            .includes(searchField.toLowerCase());
        });

        if (filterData !== undefined && filterData.length > 0) {
          setAllDevice(filterData);
        } else if (filterData.length === 0) {
          setAllDevice(devices);
          setAllDevice([]);
        }
      } else if (searchCategory === "type") {
        const filterData = allDevice.filter((item) => {
          return item.device.type
            .toLowerCase()
            .includes(searchField.toLowerCase());
        });

        if (filterData !== undefined && filterData.length > 0) {
          setAllDevice(filterData);
        } else if (filterData.length === 0) {
          setAllDevice([]);
        }
      }
    }
  }, [searchField]);

  const searchFilter = (e) => {
    setSearchField(e.target.value);
  };

  return (
    <Home>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav"></div>
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              <h2 className="my-4" style={{ fontVariant: "small-caps" }}>
                <span className="shadow py-1 px-4 rounded-bottom">
                  Device List
                </span>
              </h2>
              <div className="card mb-4">
                <div className="d-flex align-items-center py-3 px-3 row">
                  <div className="col-4">
                    <label className="me-2">Sort category -</label>
                    <label className="me-2" htmlFor="">
                      Tds
                      <input
                        type="radio"
                        name="sort"
                        value="tds"
                        onChange={handleSortCategoryChange}
                      />
                    </label>
                    <label htmlFor="">
                      Time
                      <input
                        type="radio"
                        name="sort"
                        value="time"
                        onChange={handleSortCategoryChange}
                      />
                    </label>
                    <select
                      onChange={listSortType}
                      className="form-control text-center"
                      disabled={toggleSelectedFeild === true ? false : true}
                    >
                      <option value="desc">-- Choose Sort type --</option>

                      <option value="asc" className="text-uppercase">
                        Assending
                      </option>
                      <option value="desc" className="text-uppercase">
                        Decending
                      </option>
                    </select>
                  </div>
                  <div className="dataTable-search col-4">
                    <label className="me-2">Filter category -</label>
                    <label className="me-2" htmlFor="">
                      Mac ID
                      <input
                        type="radio"
                        name="filter"
                        value="macId"
                        onChange={handleSearchCategoryChange}
                      />
                    </label>
                    <label htmlFor="">
                      Type
                      <input
                        type="radio"
                        name="filter"
                        value="type"
                        onChange={handleSearchCategoryChange}
                      />
                    </label>
                    <input
                      className="dataTable-input"
                      placeholder="Search..."
                      type="text"
                      onChange={searchFilter}
                      disabled={searchTogglrSelected === true ? false : true}
                    />
                  </div>
                  <div className="col-4">
                    <ExportToCSV listData={allDevice} />
                  </div>
                </div>
                <div className="card-body ">
                  <div id="datatablesSimple" className="w-100 border ">
                    <div className="">
                      <div className=" row border-bottom g-0">
                        <div className=" col-2 border-end py-2 fw-bold">
                          Device Mac Id
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Device Type
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Device Info
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Time
                        </div>
                        <div className="col-2 border-end py-2 fw-bold">Tds</div>
                        <div className="col-2 border-end py-2 fw-bold">
                          Action
                        </div>
                      </div>
                    </div>

                    {allDevice.length > 0 ? (
                      <div className="tableBody">
                        {allDevice?.map((item, id) => (
                          <div className=" border-bottom row g-0" key={id}>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {item.device.macid}
                            </div>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {item.device.type}
                            </div>
                            <div className="col-2 py-2   border-end d-flex align-items-center justify-content-center">
                              {item.device.info}
                            </div>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {new Date(item.created_at).toLocaleString()}
                            </div>

                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              {JSON.parse(item.desc.replaceAll("'", '"')).tds}
                            </div>
                            <div className="col-2 py-2 border-end d-flex align-items-center justify-content-center">
                              <ModalOne
                                className="btn btn-sm btn-outline-primary float-end"
                                button={{
                                  title: "View Graph",
                                }}
                              >
                                <Graph device={item} />
                              </ModalOne>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <h3 className="mt-4 mb-4">No Data Found</h3>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Home>
  );
};

export default DataListPage;
