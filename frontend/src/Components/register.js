import React , {useState} from 'react';
import Axios from 'axios';

const Register=()=>{
    const [data,setData] = useState()
    const [load,setLoad] = useState(false)
    const [done,setDone] = useState(false)
   const  submitform=(event)=>{
       event.preventDefault()
       setLoad(true)
       Axios.post('http://localhost:3333/',{
           username:event.target.username.value,
           useremail:event.target.useremail.value,
           password:event.target.password.value
       }).then((res)=>{
           console.log(res.data.indexOf(' '))
           if(res.data.indexOf(' ')===-1){
                setDone(true)
               console.log(done)

           }else{
                setDone(false)
               console.log(done)

           }
           setData(res.data)
           setLoad(false)
       }).catch((err)=>{
           console.log(err)
       })
    }
   return(
       <div>
          { load?
          <div>Loading...</div>
          :
          <div><form onSubmit={submitform}>
          <input type="text" name="username"/>
          <input type="text" name="useremail"/>
          <input type="password" name="password"/>
           <input type="submit"/>           
          </form>
          {done?<div>Congratulation your data is entered in database</div>:<div>{data}</div>}
          </div>
          }
           </div>
   )
}

export default Register