import React from "react";
import "./App.css";



export default (props) => {
  const [formData, setFormData] = React.useState(props.initial);

  React.useEffect(() => {
    setFormData(props.initial);
  }, [props.initial]);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div id="form_login">
        <div className="form-group w-50 " id="parent">
          <input
            type="text"
            name="id"
            value={formData.id}
            placeholder="ID"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="time"
            value={formData.time}
            placeholder="Time"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="text"
            name="video"
            value={formData.video}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group w-50">
          <input
            type="number"
            name="likes"
            value={formData.likes}
            placeholder="likes"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button
                class="btn btn-secondary"
                onClick={() => {
                    props.handleSubmit(formData);
                    setFormData(props.initial);
                }}
            >
                SUBMIT
            </button>
      </div>
    </>
  );
};
