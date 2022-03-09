
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  let total=0;
  const [data,setdata]=useState([]);
  const [update,setupdate]=useState(false);
  const [todo,settodo]=useState([]);
  const [done,setdone]=useState([]);
  const [showInput,setshowInput]=useState(false)
  const [newtodo,setnewtodo]=useState("")
  const [addintodo,setaddintodo]=useState(false)
  
  useEffect(()=>{
    console.log("rendered",data)
    setupdate(!update)
    fetch("https://jsonplaceholder.typicode.com/users/1/todos").then(res=>res.json()).then((res)=>{
     // console.log(res)
      setdata(res);
      //console.log(data);
    }).catch((e)=>{
      console.log(e)
    })
    settodo(data.filter((item)=>{
      if(item.completed==false){
        total++;
        console.log(total);
       //console.log(“true item”,item)
        return true
      }
     }))
     setdone(data.filter((item)=>{
      if(item.completed==true){
       total++;
       console.log(total)
      //  console.log(“true item”,item)
        return true;
      }
     }))
      
  },[])
  useEffect(()=>{
    settodo(data.filter((item)=>{
      if(item.completed==false){
        total++;
        console.log(total);
       //console.log(“true item”,item)
        return true
      }
     }))
     setdone(data.filter((item)=>{
      if(item.completed==true){
       total++;
       console.log(total)
      //  console.log(“true item”,item)
        return true;
      }
     }))
     
  },[data])
  
 // console.log(“data is “,data)data.filter((item)=>{
   function handleItem(){
    setshowInput(!showInput );
    setaddintodo(!addintodo)
    if(newtodo!=="" && addintodo){
      
      const object ={
        "userId": 1,
    "id": 1,
    "title": newtodo,
    "completed": false
      }
      console.log(object);
      setdata([...data,object])
      console.log(data)
      console.log("hello i am here")
     
      setnewtodo("")
    }
   }
  
  return (
    <div style={{display:'flex' , flexDirection:'row' ,padding:'20px'}}>
    <div style={{margin:'20px', border: '1px solid black',padding:'5px'}}>
      <h1>Todo List</h1>
      {
        todo.map((item,index)=>{
         return <div>
         <p>{index+1}. {item.title}</p>
        <button onClick={()=>{
          item.completed=true;
          setdone([...done,item])
          console.log(index+1)
          todo.splice(index,1)
          console.log('todo is',todo)
          settodo(todo)
          setupdate(!update)
        }}>Done</button>
        <button onClick={()=>{
          console.log(index+1)
         todo.splice(index,1)
         console.log("todo is",todo)
         settodo(todo)
         setupdate(!update)
         total--;
        }}>Delete</button>
        <br/>
        </div>
      })
      }
      <br/>
      <br/>
      <button onClick={()=>{
        
        handleItem();
      }}>+Item</button><br/>
     {showInput ? <input placeholder='Enter the todo' onChange={(e)=>{
       setnewtodo(e.target.value);
       console.log(newtodo)
     }}/>:null}
    </div>
    <div style={{margin:'20px', border: '1px solid black',padding:'5px'}}>
      <h1>Done List</h1>
    { done.map((item,index)=>{
        return <>
        <p>{index+1}. {item.title}</p>
        <button onClick={()=>{
          item.completed=false;
         settodo([...todo,item]);
         console.log(index+1)
         done.splice(index,1)
         console.log("todo is",todo)
         setdone(done)
         setupdate(!update)
        }}>Todo</button>
       <button onClick={()=>{
          console.log(index+1)
         done.splice(index,1)
         console.log("todo is",todo)
         setdone(done)
         setupdate(!update)
         total--;
        }}>Delete</button>
        </>
      })
      }
    </div>
    </div>
  );
}
export default App;