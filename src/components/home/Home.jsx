import React from 'react'
import classes from './Home.module.css'
import { useState } from 'react'
import noris from './../../assets/noris.png'
let state = [['Email addresses','IP addresses','Names','Passwords'],['Good news — no pwnage found ! No breached accounts and no pastes !!!']]
const Home = ({someSites}) => {
    let finded = 'green';
    let [inputValue,setInputValue] = useState('')
    const [account,setAccount] = useState([])
    function getAnswer (e) {
      
        e.preventDefault()
        let emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if(emailReg.test(inputValue)===false)  {
            alert("That's not real account")
            throw Error("That's not real account")
        } else {
            // fetch(`https://haveibeenpwned.com/api/v3/breachedaccount/${account}`).then((res)=>res.json()).then(res=>setAccount(res))
            //Т.к через апи нужен ключ , сделал как сказано в первом пункте, захардкодил и рандомно вывожу, найдены украденные данные или нет
           setAccount(state[Math.ceil(Math.random()*2)-1]) 
        }
        
    }

    return (
        <div className={classes.main}> 
            <div className={classes.head}><h1>';--have i been pwned?</h1></div>
            <p>Check if your email or phone is in a data breach</p>
        <div className={classes.container}>
        <form className={classes.form}>
    <input className = {classes.container__input} value = {inputValue} onChange = {(e)=>setInputValue(e.target.value)} placeholder='Enter Your Valid E-mail '/>
     <button className = {classes.container__button} type="button" onClick={(e)=>{getAnswer(e)}} >pwned?</button>
    </form>
     </div>
     <div className={classes.output} style={{backgroundColor:account.length===0 ? 'white':account.length>1? 'red':"green"}}>
        {account.length ===0 ? null : account.length === 1? account.map((e,i)=><div className={classes.flexCenter} key ={i}><p>{e}</p><img src ={noris}></img></div>):<div  className={classes.redOutput}><img src = {someSites.LogoPath}/><p>{someSites.Name}</p><p dangerouslySetInnerHTML={{ __html: someSites.Description }}></p>Data: {state[0].map((e)=><span>{e}</span>)}</div>}</div>
     </div>
      )
}

export default Home