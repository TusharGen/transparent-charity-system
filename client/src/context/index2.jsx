import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0x1fC511Eec6Dd28D245B4bb1D693bbDaB9dD21258');
  const { mutateAsync: createCharityProject } = useContractWrite(contract, 'createCharityProject');

  const address = useAddress();
  const connect = useMetamask();

  const publishCharityProject = async (form) => {
    try {
      const data = await createCharityProject([
        address, // owner
        form.title, // title
        form.description, // description
        form.image,
        form.goalAmount,
        new Date(form.deadline).getTime(), // deadline,
        
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCharityProjects = async () => {
    const charityProjects = await contract.call('getApprovedProjects');

    const parsedCharityProjects = charityProjects.map((charityProject, i) => ({
      beneficiary: charityProject.beneficiary,
      name: charityProject.name,
      title: charityProject.title,
      description: charityProject.desc,
      image: charityProject.image,
      goalAmount: ethers.utils.formatEther(charityProject.goalAmount.toString()),
      currentAmount: ethers.utils.formatEther(charityProject.currentAmount.toString()),
      deadline: charityProject.deadline.toNumber(),
      projectId: i
    }));

    return parsedCharityProjects;
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCharityProjects();

    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

    return filteredCampaigns;
  }

  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCharityProject: publishCharityProject,
        getCharityProjects,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);