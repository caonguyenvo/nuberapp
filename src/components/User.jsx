import React,{useState, useEffect} from 'react';
import {Amplify,Storage} from 'aws-amplify';
import {AmplifyS3Album} from "@aws-amplify/ui-react/legacy";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";

const initialFormState = { name: '', description: '' }
function User({signOut}){
    const [fileData, setFileData] = useState();
    const [fileStatus, setFileStatus]= useState(false);
    const [output, setOutput]= useState();
    useEffect(()=>{
        console.log("fetching all data...");
        getAllPicture();
    },[fileData])
    const uploadFile= async()=>{
        const result= await Storage.put(fileData.name, fileData,{
            contentType:fileData.type,
        });
        setFileStatus(true);
        console.log(21,result);
    }
    const getAllPicture = async()=>{
        await Storage.list('')
            .then(result => {
                console.log(result[0].key)
                console.log(result[1].key)
                getPicture(result[1].key)
    })
            .catch(err => console.log(err));;
    }
    const getPicture = async(name) =>{
        await Storage.get(name)
        .then(result => console.log(result))
        .catch(err => console.log(err))
    }
    return(
      <div className="container">
             <div>
        <input type="file" onChange={(e) => setFileData(e.target.files[0])} />
      </div>
      <div>
        <button onClick={uploadFile}>Upload file</button>
      </div>
        
        {fileStatus ? "File uploaded successfully" : ""}
        <Button onClick={signOut}>Sign Out</Button>
        <div>
        <img alt="sth" src="https://nuberidstorage91939-staging.s3.us-east-1.amazonaws.com/public/nuber.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAXL5BFSE2CJ2YGZHV%2F20220901%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220901T030436Z&X-Amz-Expires=900&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIFjCg7NM20AT4WuNVSeqXQQZyIAvcbrRIvELuyrUYPlpAiEAusY93m8AkLMz10SPL9zjRHf3G9MkoGMQbyiMjs6%2FpaoqxAQIbBAAGgw1MDY2MDcyNzYzNDAiDLhvuQz0AYGVZfbBOyqhBCkpTDDVuL3DKQuzaFpL6hUDrjtTRKy3gSg8k67nDfC8ZPiS9da0rhwmtf7W26irZo1ENYIbqdUOuAPo9Hp31oD1HwkzRUeCwWOk29QXPCRbr0FJzxbPMDXZX0tYl1Q0FpQSSjA9NEoQz7KNoIcTuuwz9S8pM1JxRXeKKvtDQSFam%2FLW7wb3%2FmKtagfjG77H9cF%2FYdC2OY0TV2FqyvMBre1CPvNeOvTY7%2Fe5z%2BJCNL9u1mXjzJ63qtk2RLBeespf5ShDJq1Fk0cQCoucY5lLFRMAbQipuJpAA%2BGy7njFGvYLF0faH7Dnzj03hF1Vt8u3lIPTWimZueMKVkqss6zycqpoIwIy8wQ2z0PrVPcWFXvYXJuOyyLU9ZgXMnG8l4Qq3KfdFfw6Q3VNU3VsTbfwhZV8efImtLLYJCDLhnaALtrQKWJlOXP9NCtxe2CO1T%2BkJa26cXZQxKxv9D5Fd1iv8dk6d4Mk6LYUT1a8NNlMKTvtlrrSdo9u6x5xqpfasEKJTQUbtoD6MERMDdKBDBjddrn5uBswGViXw%2FW4enwg0FL%2FkMCa2v2h9MRpK%2BLhe2mi%2FYcm4uXVKU9yujXubGQvbSHrcc9DCX4lptwFCSNe9VR2DDQq9D8t03kx7oiPHbfz8rX56Ruwd%2FqRzQePGIN6D%2Fhn%2BZS2pHVZiIJjovpe0rXzk8gv0qRABkpLOfSW2Oz9OaYqHLl1WrHVZxwHYvOlhlHQMLDCwJgGOoUCELA5HFaUmsnEzZqQuAH0Co0tPXbVFr4UOPKtvNVp43zplrUM7wqSBSjRAr40su1AXaEpY9MLzXQYYF48Qn%2BqDj%2FCOc8x9lFsLf6JCewNGEEjSW5hn8y32ajCBjXqh%2Fc46GiJoX1GZnR%2B81jT%2Fv%2BHAxuLKXEhWqVAevv6EJLKUuJ%2BeGimTzyZz1kYArd52yyewVTnmCR6sxDvx3l9%2FCLOxG2ntkdeGMpASytiJVkK9v8S88M%2FoZVXihbxHQEJ85vTvQokRwlhmdDy6pzd7UzEqaAYMlp3WK2sDMeLGHV1km7O6Vzrkm7mT%2FA%2FhGOy5GlwGE3QP9sx98wFaSA6DcqfZZYErX4Y&X-Amz-Signature=f35fb1ae14a86040c1b3ecf2e6e79aa50c210da16462c7f9f6efd6ceab55ba3a&X-Amz-SignedHeaders=host&x-amz-user-agent=aws-sdk-js%2F3.6.1%20os%2FWindows%2FNT_10.0%20lang%2Fjs%20md%2Fbrowser%2FFirefox_104.0%20api%2Fs3%2F3.6.1%20aws-amplify%2F4.7.1_js&x-id=GetObject"></img>
        </div>
      </div>
    )
  }
  export default withAuthenticator(User);