import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import avatar from "../../assets/avatars/avatar_2.jpg";

import { useStateContext } from "../../context";

import { CustomButton, FormField, Loader } from "../../components";

const CreateBeneficiaryAccount = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //const [beneficiaryDetails, setBeneficiaryDetails] = useState(null);
  const {
    createBeneficiaryAccount,
    getBeneficiaryDetails,
    beneficiaryDetails,
  } = useStateContext();

  const [form, setForm] = useState({
    name: "",
    rescueInformation: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await createBeneficiaryAccount({ ...form });
    setIsLoading(false);
    navigate("/beneficiary-dashboard");
  };

  useEffect(() => {
    getBeneficiaryDetails();
  }, []);

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Beneficiary Profile
        </h1>
      </div>

      {beneficiaryDetails ? (
        <div >
          <div className="beneficiary-container m-5">
            <div className="card mb-3">
              <div className="flex">
                <div className="w-1/3">
                  <img src={avatar} className="rounded-full h-max w-max mx-auto" alt="..." />
                </div>
                <div className="w-2/3">
                  <div className="card-body text-[#808191] m-1 ">
                    <h4 className="card-title m-1 ">
                      <b className="text-[#1dc071]">Name :</b>
                      {beneficiaryDetails.name.toString()}
                    </h4>
                    <p className="card-text1 m-1">
                      <b className="text-[#1dc071]">BIO :</b>{" "}
                      {beneficiaryDetails.rescueInformation.toString()}
                    </p>
                    <p className="card-text2 m-1">
                      <b className="text-[#1dc071]">Address :</b> {beneficiaryDetails.Address.toString()}
                    </p>
                    <h3 className="card-text3 m-1">
                      <b className="text-[#1dc071]">Balance :</b> {beneficiaryDetails.balance.toString()}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="w-full mt-[65px] flex flex-col gap-[30px]"
        >
          <div className="flex flex-wrap gap-[40px]">
            <FormField
              labelName="Your Name *"
              placeholder="John Doe"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
            />
          </div>

          <FormField
            labelName="Rescue Information *"
            placeholder="Tell us something about yourself."
            isTextArea
            value={form.rescueInformation}
            handleChange={(e) => handleFormFieldChange("rescueInformation", e)}
          />
          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton
              btnType="submit"
              title="Create Profile"
              styles="bg-[#1dc071]"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateBeneficiaryAccount;