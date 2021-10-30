import React, { useState, useEffect } from "react";
import "./App.css";
import Form from "./form.js";

const VideoUpload = () => {
  const [values, setValues] = useState([
    {
      id: "",
      name: "",
      time: "",
      video: "",
      likes: "",
    },
  ]);
  const [editLow, setEditLow] = React.useState({
    id: "",
    name: "",
    time: "",
    video: "",
    likes: "",
  });
  const [isActive, setIsActive] = useState(true);
  const [keyWord, setKeyWord] = useState("");
  const [selectedState, setSelectedState] = useState(null);
  const blank = {
    id: "",
    name: "",
    time: "",
    video: "",
    likes: "",
  };

  ///////////////
  ///update data
  //////////////
  useEffect(() => {
    getInfo();
  }, []);

  //////////////////
  //// get data
  /////////////////
  const getInfo = async () => {
    const response = await fetch("https://khalid-construction.herokuapp.com/videos");
    const result = await response.json();
    // console.log(result);
    setValues(result);
  };

  ////////////////
  /// add new data
  //////////////
  const handleCreate = async (data) => {
    const response = await fetch(
      "https://khalid-construction.herokuapp.com/videos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(response)
    getInfo(); // Update the list
  };

  ////////////////
  ////Delete
  ///////////////
  const handleDelete = async (id) => {
    const response = await fetch(
      `https://khalid-construction.herokuapp.com/videos/${id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    getInfo(); // Update the list
  };

  ////////////////
  //edit
  ///////////////
  const handleSelect = async (data) => {
    setIsActive(false);
    setEditLow(data);
  };

  const handleEdit = async (data) => {
    setIsActive(true);
    const response = await fetch(
      `http://localhost:3002/videos/${data._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    console.log(data, response);
    getInfo();
  };

  /////////////
  //fillter
  ////////////
  const searchHandler = (e) => {
    setKeyWord(e.target.value);
  };

  const searchState = (keyWord) => {
    return (x) => {
      return x.name.toLowerCase().includes(keyWord.toLowerCase()) || !keyWord;
    };
  };
  return (
    <div className="container-fluid">
      <h1>Video Upload</h1>
      <nav>
        {isActive ? (
          <article>
            <div className="title">
              <h4>Add</h4>
            </div>
            <Form
              className="form"
              initial={blank}
              handleSubmit={handleCreate}
            ></Form>
          </article>
        ) : (
          <article>
            <h4>Edit</h4>
            <Form
              className="form"
              initial={editLow}
              handleSubmit={handleEdit}
            />
          </article>
        )}
      </nav>
      <hr />
      <h2>NKBL Video Upload List Board</h2>
      <span class="input">
        <input
          className="form-control form-control-lg"
          type="text"
          onChange={searchHandler}
          placeholder="Search by name..."
          value={keyWord}
        />
        <span></span>
      </span>
      <table>
        <thead>
          <tr className="table-headers">
            <th>ID</th>
            <th>State</th>
            <th>Time</th>
            <th>video</th>
            <th>linkes</th>
            <th>Button</th>
          </tr>
        </thead>
        {values.filter(searchState(keyWord)).map((item) => {
          console.log(item);
          const {
            id,
            name,
            time,
            video,
            likes,
           
          } = item;
          return (
            <tbody>
              <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{time}</td>
                <td>
                  <iframe src={video} width="300" height="300" title="myFrame" allow="autoplay"></iframe>
                </td>
                <td>{likes}</td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    DELETE
                  </button>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => {
                      handleSelect(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default VideoUpload;
