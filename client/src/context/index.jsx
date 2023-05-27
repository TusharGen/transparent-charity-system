// import React, { useContext, createContext } from 'react';

// import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
// import { abi } from '../constants';

// const StateContext = createContext();

// export const StateContextProvider = ({ children }) => {
//   const { contract } = useContract('0xdDEFedB132Fe6f745166aAD499Ece21d805cC6E4', abi);
  
//   //const { write: createCharityProject } = useContractWrite(contract, 'createCharityProject');
//   const { mutateAsync: createBeneficiaryAccount } = useContractWrite(contract, 'createBeneficiaryAccount');

//   const  address = useAddress();
//   const  connect = useMetamask();

//   // const publishCharityProject = async (form) => {
//   //   try {
//   //     const data = await createCharityProject([
//   //       form.title,
//   //       form.description,
//   //       form.image,
//   //       form.goalAmount
//   //     ]);

//   //     console.log('publishCharityProject success', data);
//   //   } catch (error) {
//   //     console.log('publishCharityProject failure', error);
//   //   }
//   // };

//   const publishBeneficiaryAccount = async (form) => {
//     console.log(form);
//     try {
//       const {name, rescueInformation} =form;
//       const data = await createBeneficiaryAccount([name, rescueInformation]);

//       console.log('createBeneficiaryAccount success', data);
//     } catch (error) {
//       console.log('createBeneficiaryAccount failure', error);
//     }
//   };

//   return (
//     <StateContext.Provider
//       value={{
//         address,
//         contract,
//         connect,
//         //createCharityProject: publishCharityProject,
//         createBeneficiaryAccount: publishBeneficiaryAccount,
//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// export const useStateContext = () => useContext(StateContext);
import React, { useContext, createContext, useState } from 'react';
import { ethers } from 'ethers';
import { abi } from '../constants';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const contractAddress = '0xdDEFedB132Fe6f745166aAD499Ece21d805cC6E4';
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const address = provider.getSigner().getAddress();
  const connect = async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log('Failed to connect to Metamask:', error);
    }
  };

  const [charityOrg, setCharityOrg] = useState(null);
  const [beneficiaryDetails, setBeneficiaryDetails] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  

  const createCharityProject = async (form) => {
    try {
      const data = await contract.createCharityProject(
        form.title,
        form.description,
        form.image,
        form.goalAmount
      );
      await data.wait();
      console.log('createCharityProject success', data);
    } catch (error) {
      console.log('createCharityProject failure', error);
    }
  };

  const createBeneficiaryAccount = async (form) => {
    console.log(form);
    try {
      const { name, rescueInformation } = form;
      const transaction = await contract.createBeneficiaryAccount(name, rescueInformation);
      await transaction.wait();

      console.log('createBeneficiaryAccount success');
    } catch (error) {
      console.log('createBeneficiaryAccount failure', error);
    }
  };

  const createOrganization = async (form) => {
    console.log(form);
    try {
      const { OrgName, Desc } = form;
      const transaction = await contract.createOrganization( OrgName, Desc);
      await transaction.wait();

      console.log('createOrganization success');
    } catch (error) {
      console.log('createOrganization failure', error);
    }
  };

  const getOrganization = async ()=>{
    try{
      const accountOrg = await contract.c();
      console.log(accountOrg);
      setCharityOrg(accountOrg);
    }catch(error){
      console.log(error);
    }
  }

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
        balance
      });
    } catch (error) {
      console.log("getBeneficiaryDetails failure", error);
    }
  };

  const getApprovedProjects = async () => {
    try {
      const approvedProjects = await contract.getApprovedProjects();
      console.log('Approved Projects:', approvedProjects);

    } catch (error) {
      console.log("getBeneficiaryDetails failure", error);
    }
  };

  const getCharityProjects = async () => {
    try {
      const data = await contract.getCharityProjects();
      // console.log('All Projects:', data);

      const projectsData = data.map(projectArray => ({
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

    }catch (error) {
      console.log("getCharityProjects failure", error);
    }
  };
  

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCharityProject,
        createBeneficiaryAccount,
        getBeneficiaryDetails,
        getApprovedProjects,
        getCharityProjects,
        createOrganization,
        getOrganization,
        beneficiaryDetails,
        allProjects,
        charityOrg
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
