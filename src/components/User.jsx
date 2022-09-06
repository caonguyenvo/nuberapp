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

function User({signOut,user}){
    
    const nav= useNavigate();
    async function handleLogout(){
      await signOut();
      nav('/');
    }
    return(
      <div className="container">
        <Card>
        <Heading level={1}>You are now loggin on as a User!</Heading>
        </Card>
        <p>Welcome user: {user.username}</p>
        <Button onClick={handleLogout}>Sign Out</Button>
      </div>
    )
  }
  export default withAuthenticator(User);