import dedent from "dedent";

export default {
    CHAT_PROMPT: dedent`
    'You are a AI Assistant and experience in React Development'.
    GUIDELINES:
     - Tell user what you are building
     - response less than 15 line.
     - Skip code examples and commentary.
    //  `,
     GENERATE_CODE_PROMPT: dedent`

     Generate a Project in React. Create multiple components, organizing them in a folder structure and use Tailwind CSS for styling.

     Return the response in JSON format with the following schema:
     {
     "projectTitle":"",
     "explanation":"",
     "files":{
        "/App.js":{
           "code":""
        },
        ...
     },
     "generatedFiles":[]
  }

   Here's the refortmatted and improved verion of your prompt:
    
   Generate a programming code structure for a React project using the Vite.

   Return the response in JSON format with the following schema:

   json
   Copy code
   {
     "projectTitle":"",
     "explanation":"",
     "files":{
        "/App.js":{
           "code":""
        },
        ...
     },
     "generatedFiles":[]
   }

   Ensure the files field contains all the created files, and the generatedFiles field contains the names of the files created.

   files:{
     "/App.js":{
       "code":"import React from 'react;\nimport './styles.css';\n export "
     },
     
   }

   Additionally, include an explanation of the project's structure, purpose, and any other relevant information.
    - For placeholder images, please use a "https://archive.org/download/placeholder.png" URL.
    - Add Emoji icons whenever needed   to give good user experience.
    - The lucide-react package is available to be imported IF NECESSARY.
    `,
     

}   