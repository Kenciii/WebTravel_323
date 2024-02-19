import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTravel = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageURL: "",
    description: "",
  });

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/travels/${id}`);
        setFormData({
          title: response.data[0].title,
          imageURL: response.data[0].imageURL,
          description: response.data[0].description,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]); // Samo id u dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8081/travels/${id}`, formData);
    history("/home");
  };

  return (
    <div className="container w-50 mt-5">
      <form onSubmit={submitForm}>
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="form5Example1">
            Title
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="form5Example2">
            Image URL
          </label>
        </div>

        <div className="form-outline mb-4">
          <textarea
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label className="form-label" htmlFor="form5Example2">
            Description
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTravel;
