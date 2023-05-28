import React, { useContext, createContext, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../constants";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contractAddress = "0xdDEFedB132Fe6f745166aAD499Ece21d805cC6E4";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const address = provider.getSigner().getAddress();
  const connect = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log("Failed to connect to Metamask:", error);
    }
  };

  const [charityOrg, setCharityOrg] = useState(null);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);

  const createCharityProject = async (form) => {
    try {
      const data = await contract.createCharityProject(
        form.title,
        form.description,
        form.image,
        form.goalAmount
      );
      await data.wait();
      console.log("createCharityProject success", data);
    } catch (error) {
      console.log("createCharityProject failure", error);
    }
  };

  const createBeneficiaryAccount = async (form) => {
    console.log(form);
    try {
      const { name, rescueInformation } = form;
      const transaction = await contract.createBeneficiaryAccount(
        name,
        rescueInformation
      );
      await transaction.wait();

      console.log("createBeneficiaryAccount success");
    } catch (error) {
      console.log("createBeneficiaryAccount failure", error);
    }
  };

  const createOrganization = async (form) => {
    console.log(form);
    try {
      const { OrgName, Desc } = form;
      const transaction = await contract.createOrganization(OrgName, Desc);
      await transaction.wait();

      console.log("createOrganization success");
    } catch (error) {
      console.log("createOrganization failure", error);
    }
  };

  const approveBeneficiaryProject = async (projectId) => {
    try {
      const transaction = await contract.approveBeneficiaryProject(
        projectId,
        true
      );
      await transaction.wait();
      console.log(`${projectId}th project approved!`);
    } catch (error) {
      console.log("approveBeneficiaryProject failure", error);
    }
  };

  const getOrganization = async () => {
    try {
      const accountOrg = await contract.c();
      console.log(accountOrg);
      setCharityOrg(accountOrg);
    } catch (error) {
      console.log(error);
    }
  };

  const getBeneficiaryDetails = async () => {
    try {
      const data = await contract.getBeneficiaryDetails();
      const [name, rescueInformation, Address, balance] = data;

      console.log("getBeneficiaryDetails success");
      console.log("Name:", name);
      console.log("Rescue Information:", rescueInformation);
      console.log("Address:", Address);
      console.log("Balance:", balance.toString());

      setBeneficiaryDetails({
        name,
        rescueInformation,
        Address,
        balance,
      });
    } catch (error) {
      console.log("getBeneficiaryDetails failure", error);
    }
  };

  const getApprovedProjects = async () => {
    try {
      const data = await contract.getApprovedProjects();
      //console.log("Approved Projects:", data);
      const projectsData = data.map((projectArray) => ({
        beneficiary: projectArray[0],
        name: projectArray[1],
        title: projectArray[2],
        desc: projectArray[3],
        image: projectArray[4],
        goalAmount: projectArray[5],
        currentAmount: projectArray[6],
        isActive: projectArray[7],
      }));
      // projectsData.push(project);
      setApprovedProjects(projectsData);
    } catch (error) {
      console.log("getApprovedProjects failure", error);
    }
  };

  const getCharityProjects = async () => {
    try {
      const data = await contract.getCharityProjects();
      // console.log('All Projects:', data);

      const projectsData = data.map((projectArray) => ({
        beneficiary: projectArray[0],
        name: projectArray[1],
        title: projectArray[2],
        desc: projectArray[3],
        image: projectArray[4],
        goalAmount: projectArray[5],
        currentAmount: projectArray[6],
        isActive: projectArray[7],
      }));
      // projectsData.push(project);
      setAllProjects(projectsData);
      // console.log('allProjets', projectsData);
    } catch (error) {
      console.log("getCharityProjects failure", error);
    }
  };

  const getProjectStatus = async (projectId)=>{
    try {
      const data = await contract.getProjectStatus();
      console.log(data);
      // const [name, rescueInformation, Address, balance] = data;

      // console.log("getBeneficiaryDetails success");
      // console.log("Name:", name);
      // console.log("Rescue Information:", rescueInformation);
      // console.log("Address:", Address);
      // console.log("Balance:", balance.toString());

      // setBeneficiaryDetails({
      //   name,
      //   rescueInformation,
      //   Address,
      //   balance,
      // });
    } catch (error) {
      console.log("getProjectStaus failure", error);
    }
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCharityProject,
        createBeneficiaryAccount,
        createOrganization,
        getBeneficiaryDetails,
        getApprovedProjects,
        getCharityProjects,
        getOrganization,
        getProjectStatus,
        approveBeneficiaryProject,
        beneficiaryDetails,
        allProjects,
        approvedProjects,
        charityOrg,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
