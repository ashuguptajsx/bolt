"use client";

import React, { use } from 'react'
import { useContext } from 'react';
import { AuthenticationContext } from '../../Context/AuthenticationContext';
import { useConvex } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useEffect, useState } from 'react';
import Link from 'next/link'; 


function WorkspaceHistory() {
    const{authentication, setAuthentication} = useContext(AuthenticationContext);
    const convex = useConvex();

    const[workspaceList, setWorkspaceList] = useState();


    useEffect(() => {
        authentication && GetAllWorkspace();  
    }, [authentication])

    const GetAllWorkspace =async() =>{
      const result = await convex.query(api.workspace.GetAllWorkspace,{
        userId: authentication?._id
      });
      setWorkspaceList(result);

      console.log(result);
    }
  return (
    <div>
        <h2 className='font-medium text-lg'>
            Previous Chats
        </h2>
        {workspaceList && workspaceList?.map((workspace, index) => (
          <Link href={"/workspace/"+workspace._id } key = {index}>
          <h2  className='text-sm text-gray-500 mt-2 font-light hover:text-gray-400 cursor-pointer'>
            {workspace.messages[0]?.content}
          </h2>
          </Link>
        ))}
    </div>
  )
}

export default WorkspaceHistory