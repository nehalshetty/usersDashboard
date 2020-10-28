import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import "./dashboard.css";
// import ReactPaginate from "react-paginate";
import ReactModal from "react-modal";
import { getAllUsers, deleteUser } from "../../services/users";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [userModal, setUserModal] = useState({
    isOpen: false,
    type: "",
    user: {
      name: null,
      job: null,
    },
  });
  const [deleteModal, setDeleteModal] = useState({
    isopen: false,
    itemId: null,
  });

  useEffect(() => {
    setNewData();
  }, []);

  const handleUserUpdate = (type, name = "", id = null) => () => {
    let newModal = {
      type,
      isOpen: true,
      user: { ...userModal.user, name },
    };

    setUserModal(newModal);
  };

  const handleCancleClick = () => {
    let newModal = {
      type: "",
      isOpen: false,
      user: { name: null, job: null },
    };

    setUserModal(newModal);
  };

  const handleUserInput = (ev) => {
    let newUser = { ...userModal.user };
    let newModalData;
    newUser[ev.target.name] = ev.target.value;
    newModalData = { ...userModal, user: newUser };

    setUserModal(newModalData);
  };

  // API calls
  const setNewData = async () => {
    let { status, value } = await getAllUsers();

    if (status === "Success") {
      setUserData(value.data);
    }
  };

  const handleDeleteClick = (id) => async () => {
    let deleteResp = await deleteUser(id);
  };

  return (
    <Layout>
      <div className="add-btn-container">
        <button className="default-btn " onClick={handleUserUpdate("Add")}>
          Add
        </button>
      </div>
      {userData ? (
        <div className="table-main">
          <div className="table-header">
            <div className="table-row header">Id</div>
            <div className="table-row header">Avatar</div>
            <div className="table-row header">First name</div>
            <div className="table-row header">Last name</div>
            <div className="table-row header">Email</div>
            <div className="table-row header">Actions</div>
          </div>
          {userData.map((user, key) => (
            <div className="table-content" key={key}>
              <div className="table-row ">{user.id}</div>
              <div className="table-row ">
                <img src={user.avatar} />
              </div>
              <div className="table-row ">{user.first_name}</div>
              <div className="table-row ">{user.last_name}</div>
              <div className="table-row ">{user.email}</div>
              <div className="table-row ">
                <br />
                <button
                  className="default-btn"
                  onClick={handleUserUpdate("Edit")}>
                  Edit
                </button>
                <br />

                <button
                  className="default-btn btn-red"
                  onClick={handleDeleteClick(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
          {/* <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={6}
            // onPageChange={handlePageClick}
            // containerClassName={"pagination"}
            // previousLinkClassName={"pagination__link"}
            // nextLinkClassName={"pagination__link"}
            // disabledClassName={"pagination__link--disabled"}
            // activeClassName={"pagination__link--active"}
          /> */}
        </div>
      ) : (
        <div>No content</div>
      )}

      <ReactModal
        isOpen={userModal.isOpen}
        contentLabel="Minimal Modal Example">
        <h2>User details</h2>
        <form onSubmit={userModal.type}>
          <div className="input-container">
            <input
              type="text"
              name="name"
              value={userModal.user.name}
              className="default-input input--width"
              required
              placeholder="Name"
              onChange={handleUserInput}
            />
          </div>

          <div className="input-container">
            <input
              name="job"
              type="text"
              className="default-input input--width"
              required
              value={userModal.user.job}
              placeholder="Job"
              onChange={handleUserInput}
            />
          </div>

          <button type="submit" className="default-btn input--width">
            {userModal.type}
          </button>
        </form>
        <button
          onClick={handleCancleClick}
          className="default-btn input--width cancel-btn">
          Cancel
        </button>
      </ReactModal>
    </Layout>
  );
};

export default Dashboard;
