import React,{useState, useEffect} from 'react';
import {Amplify,Storage} from 'aws-amplify';
import {AmplifyS3Album} from "@aws-amplify/ui-react/legacy";
import {useNavigate} from 'react-router-dom';
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
function Driver({signOut,user}){
  const [fileData, setFileData] = useState();
  const [fileStatus, setFileStatus]= useState(false);
  const [output, setOutput]= useState(new Set());
  useEffect(()=>{
      console.log("fetching all data...");
      setOutput(new Set());
      getAllPicture();
  },[fileData])
  const uploadFile= async()=>{
      const result= await Storage.put(fileData.name, fileData,{
          contentType:fileData.type,
      });
      setFileStatus(true);
      console.log(21,result);
      setOutput(new Set());
      getAllPicture();
  }
  const getAllPicture = async()=>{
      await Storage.list('')
          .then(result => {
              //reset
              console.log("getAllpicture()");
              //setOutput(new Set());
              result.map(x => {
                              //setOutput(output.add(x.key))
                               getPicture(x.key);
                               return x;              
              })
              console.log(output);
  })
          .catch(err => console.log(err));;
  }
  const getPicture = async(name) =>{
      await Storage.get(name)
      .then(result => { console.log(result);
                        setOutput(output.add(result));
                        console.log(output)
      })
      .catch(err => console.log(err))
  }
  function renderPicture(){
    console.log("calling renderPics")
    if(output.size >0){
      const items=[];
      for (const i of output){
        items.push(<img className='rounded' alt="S3 pics" src={i} key={i}></img>)
      }
      return <div className='text-center'>{items}</div>
    }
  }
  const nav= useNavigate();
  async function handleLogout(){
    await signOut();
    nav('/');
  }
    return(
      <div className="container" >
      <Card>
        <Heading level={1}>You are now loggin on as a Driver!</Heading>
      </Card>
      <div>
        <p>Welcome user: {user.username}</p>
      </div>
      <div className='row'>
        <div className="input-group mb-3">
          <input className="form-control" type="file" onChange={(e) => setFileData(e.target.files[0])} />
          <button className="btn btn-outline-secondary" onClick={uploadFile} >Upload file</button>
        </div>
      </div>
      <div className='d-flex flex-row-reverse'>
      <Button className="p-3" onClick={handleLogout}>Sign Out</Button>
      </div>
      <div>
        {fileStatus ? "File uploaded successfully" : ""}
      </div>
      <div>
        {renderPicture()}
      </div>
      </div>
    )
  }
  export default withAuthenticator(Driver);