import { useEffect, useState } from "react";
import {QRCodeSVG} from 'qrcode.react';
import css from "./login.module.scss";

function Login() {
  const [url, setUrl] = useState("");
  const [loginkey, setLoginkey] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");


  useEffect(() => {
    let func = () =>{
      if(userId != "") return;
      if(userName != "") return;
      fetch("http://localhost:3000/sso/e9getLoginForm").then(res =>{
        res.json().then(data => {
          setUrl(data.qrcode.text);
          setLoginkey(new URL(data.qrcode.text).searchParams.get('loginkey'));
        })
      })
    }

    func();
    let iid = setInterval(()=>{
      func()
    }, 25 *1000);
    return () => {
      clearInterval(iid);
    }
  }, [userId,userName]);


  useEffect(() => {
    let iid = setInterval(()=>{
      fetch("http://localhost:3000/sso/e9getQCLoginStatus"+ "?loginkey=" + loginkey).then(res =>{
        res.json().then(data => {
          console.log("qrcode scan data", data)
          if(data.cookies && data.cookies.length > 0 && data.cookies.find(e => String(e).includes("loginidweaver"))){
            clearInterval(iid)
          }
          data.cookies.forEach(v =>{
            let userNameOrID = v.split("; ")[0].split("=")[1]
            if( Number.isInteger(Number(userNameOrID))){
              setUserId(userNameOrID)
            }else{
              setUserName(userNameOrID)
            }
          })
        })
      })
    }, 3000);

    return () => {
      clearInterval(iid);
    }

  }, [loginkey]);

  return (
    <div>
      { url && (!userId) ?  
          <div style={{textAlign:"center"}}>
            <QRCodeSVG className={css.qr} value={url} /> 
          </div>
          : null }
      {
        (userId!=0) && <p className={css.p}>userId: {userId}</p>
      }
      {
        userName && <p className={css.p}>userName: {userName}</p>
      }
    </div>
  );
}

export default Login