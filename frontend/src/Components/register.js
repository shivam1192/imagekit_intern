import React , {useState, useEffect} from 'react';
import Axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";
const Register=()=>{
    const [data,setData] = useState()
    const [load,setLoad] = useState(false)
    const [done,setDone] = useState(false)
    const [count,setCount] = useState(0)
    const [verify,setVerify] = useState(false)
    const [human,setHuman] = useState(true)

    useEffect(()=>{
        Axios.get("https://api.ipify.org").then((res)=>{
            Axios.post("http://localhost:3333/count",{
                ip:res.data,
            }).then((res)=>{
                setCount(res.data.count)
            })
      })
    },[data])

    useEffect(()=>{
         setverify()
    })

    var tempDate = new Date();
    var date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate();
   
   const  submitform=(event)=>{
       if(human){
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
                 Axios.get("https://api.ipify.org").then((res)=>{
                       Axios.post("http://localhost:3333/submit",{
                           ip:res.data,
                           date:date
                       }).then((res)=>{
                           console.log("ip database done")
                       })
                 })
            }else{         
                 setDone(false)
            }
            setData(res.data)
            setLoad(false)
        }).catch((err)=>{
            console.log(err)
        })}
        else{
            alert("you are not human")
        }
    }
 
    const setverify = () =>{
        if(count>=3){
              setVerify(true)
              setHuman(false)
        }else{
              setVerify(false)
        }
    }

    const hello = () =>{
        setHuman(true)
    }

   return(
       <div>
          { load?
          <div>Loading...</div>
          :
          <div><h1>Registeration form</h1><br/><form onSubmit={submitform}>
          <input type="text" name="username" placeholder="username"/><br/>
          <input type="text" name="useremail" placeholder="email"/><br/>
          <input type="password" name="password" placeholder="password"/><br/>
           <input type="submit"/>           
          </form>
          {done?<div>Congratulation your data is entered in database</div>:<div>{data}</div>}
          </div>
          }
          {verify? <ReCAPTCHA
                sitekey="6LcMJuIUAAAAAPcf7jluWYwZ7E-ep3_Mq654sdUp"
                onChange={hello}
                onExpired={()=>{setHuman(false)}}
            /> : null}
          
           </div>
   )
}

export default Register