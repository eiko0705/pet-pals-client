import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../slicers/userSlice";
import { petDataStore } from "../slicers/petSlice";
import { submitPic, submitPicForPet } from "../util/uploadImage";
import QuestionForm from "../components/owners/QuestionForm";

export default function Step5() {
  const dispatch = useDispatch();
  const userSignUpInfo = useSelector((state) => state.user);
  const petSignUpInfo = useSelector((state) => state.pet.info);
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const updateQuestions = (newQuestions) => {
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userProfilePic = await submitPic(userSignUpInfo.profile_picture);
    const submitAction = await dispatch(
      signUp({
        username: userSignUpInfo.username,
        email: userSignUpInfo.email,
        password: userSignUpInfo.password,
        description: userSignUpInfo.description,
        profile_picture: userProfilePic,
        type: userSignUpInfo.type,
      })
    );
    const petPic = await submitPicForPet(petSignUpInfo.pet_pictures);

    const questionPayload = {
      questionnaire: questions.map((obj) => obj.text),
    };

    console.log(questionPayload);

    const petDataStoreAction = await dispatch(
      petDataStore({
        type: petSignUpInfo.type,
        name: petSignUpInfo.name,
        owner_id: submitAction.payload.user._id,
        description: petSignUpInfo.description,
        pet_pictures: petPic,
        questionnaire: questionPayload.questionnaire,
      })
    );

    if (submitAction.payload.user && petDataStoreAction.payload.name) {
      navigate("/");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} style={{ marginTop: 200 }}>
          <h2>Questionnaire</h2>
          <QuestionForm
            questions={questions}
            updateQuestions={updateQuestions}
          />
          <button>Submit</button>
        </form>
      </div>
      <Link to="/step4">Back</Link>
    </>
  );
}
