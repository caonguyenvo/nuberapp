import React,{useState, useEffect} from 'react';
function Home(){
    const [fetchTime,setTime]= useState([]);
    useEffect(() => {
      const interval= setInterval(() =>{
        setTime(new Date().toLocaleTimeString())
      },1000)
      return () => clearInterval(interval)
    })
    function renderTime(){
       if(fetchTime.length>0){
        return(
          <div>Time: {fetchTime}</div>
        )
       }
       else{
        return <div>Time: 0:00:00 AM</div>
       }
    }
    return(
      <div className="container">
        <h1>Home Page</h1>
        <div>{renderTime()}</div>
        <div>Please sign in as a user or a driver to start</div>
      </div>
    )
  }
  export default Home;