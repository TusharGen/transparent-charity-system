import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import avatar from "../../assets/avatars/avatar_14.jpg";

import { useStateContext } from "../../context";

import { CustomButton, FormField, Loader } from "../../components";

const CreateCooperativeStore = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const {
    createCooperativeStore,
    getCooperativeStoreDetails,
    cooperativeStore
  } = useStateContext();

  const [form, setForm] = useState({
    storeName: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await createCooperativeStore({ ...form });
    setIsLoading(false);
    navigate("/store-dashboard/projects");
  };

  useEffect(() => {
    getCooperativeStoreDetails();
  }, []);

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
          Cooperative Store Profile
        </h1>
      </div>

      {cooperativeStore && cooperativeStore.storeName !== '' ? (
        <div >
          <div className="beneficiary-container m-5">
            <div className="card mb-3 bg-[#1c1c24] border-0">
              <div className="flex">
                <div className="w-1/3">
                  <img src={avatar} className="rounded-full h-max w-max mx-auto" alt="..." />
                </div>
                <div className="w-2/3">
                  <div className="card-body text-[#808191] m-1 ">
                    <h4 className="card-title m-1 ">
                      <b className="text-[#1dc071]">Store Name :</b>
                      {cooperativeStore.storeName.toString()}
                    </h4>
                    <p className="card-text2 m-1">
                      <b className="text-[#1dc071]">Address :</b> {cooperativeStore.storeOwner.toString()}
                    </p>
                    <h3 className="card-text3 m-1">
                      <b className="text-[#1dc071]">Balance :</b> {cooperativeStore.balance.toString()}
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
              placeholder="Enter name of your store."
              inputType="text"
              value={form.storeName}
              handleChange={(e) => handleFormFieldChange("storeName", e)}
            />
          </div>
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

export default CreateCooperativeStore;
