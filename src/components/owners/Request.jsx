import axios from "axios";
import React, { useRef, useState, useEffect } from "react";
import sampleImg from "../../assets/sample.jpg";
import AnswerForm from "./AnswerForm";
import moment from "moment";
const { REACT_APP_SERVER_URL } = process.env;

const Request = () => {
  const answerFormRef = useRef();
  const [requests, setRequests] = useState([]);
  const [currentRequest, setCurrentRequest] = useState({});
  const getRequests = async () => {
    try {
      //get all request of the user
      const request = await axios.get(
        `${REACT_APP_SERVER_URL}/requests/Pending`,
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(request.data);

      setRequests(request.data);
    } catch (error) {}
  };
  useEffect(() => {
    getRequests();
  }, []);

  const openAnswerForm = (req) => {
    setCurrentRequest(req);
    answerFormRef.current.classList.add("showAnswerForm");
  };

  return (
    <section className="requestSection">
      <h1>Requests</h1>
      <div className="gridRequest">
        {requests.map((req) => (
          <div className="request">
            <img src={sampleImg} alt="img" />
            <div className="requestInfo">
              <h3>{req.username}</h3>
              <p>Request for max</p>
              <p>
                <span>from: </span>{" "}
                {moment(req.request.start).format("MMM-DD-yyyy")}
              </p>
              <p>
                <span>to:</span> {moment(req.request.end).format("MMM-DD-yyyy")}
              </p>
              <button onClick={() => openAnswerForm(req)}>Review</button>
            </div>
          </div>
        ))}
      </div>
      <AnswerForm
        answerFormRef={answerFormRef}
        setCurrentRequest={setCurrentRequest}
        currentRequest={currentRequest}
        getRequests={getRequests}
      />
    </section>
  );
};

export default Request;
