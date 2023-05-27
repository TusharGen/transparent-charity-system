import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context'

const AllProjects = () => {
  const [isLoading, setIsLoading] = useState(false); 
  const [charityProjects, setCharityProjects] = useState([]);

  const { address, contract, getApprovedProjects } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getApprovedProjects();
    setCharityProjects(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="Approved Charity Projects"
      isLoading={isLoading}
      charityProjects={charityProjects}
    />
  )
}

export default AllProjects