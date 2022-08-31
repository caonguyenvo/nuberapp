import React,{useState, useEffect} from 'react';

import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
function User({signOut}){
    return(
      <div className="container">
        <Card>
        <Heading level={1}>You are now loggin on as a User!</Heading>
        </Card>
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    )
  }
  export default withAuthenticator(User);