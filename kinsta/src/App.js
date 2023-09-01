import ListHeader from './components/ListHeader'
import {useEffect, useState} from 'react'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'

//const serverUrl = process.env.REACT_APP_SERVERURL;

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const authToken = cookies.AuthToken;
  const userEmail = cookies.Email;      //'filip@test.com';
  const [tasks , setTask] = useState(null);

  //const authToken = false;

  const getData = async () => {
    
    try{
     const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`);
     const json = await response.json();
     setTask(json);
     //console.log({serverUrl}); restart after changing .env

    }catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (authToken) {
    getData();
   }
    }, []);
  
  //console.log(tasks);

  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date) );

  return (
    <div className="app">
      {!authToken && <Auth/>}
      {authToken &&
      <>
      <ListHeader listName={'Holiday tick list'} getData={getData} />
      <p>tu budz {userEmail}   </p>
      {sortedTasks?.map((task) => <ListItem key={task.id} task = {task} getData={getData}/>)}
      </>}
      <p>FilipoMasters</p>
    </div>
  );
};

export default App;
