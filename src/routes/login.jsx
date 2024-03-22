import { useEffect, useState } from "react";
import {QRCodeSVG} from 'qrcode.react';

function Login() {
  const [url, setUrl] = useState("");
  const [loginkey, setLoginkey] = useState("");
  const [qrStatus, setQrStatus] = useState("");
;

  useEffect(() => {
    fetch("http://localhost:3000/sso/e9getLoginForm").then(res =>{
      res.json().then(data => {
        setUrl(data.qrcode.text);
        setLoginkey(new URL(data.qrcode.text).searchParams.get('loginkey'));
      })
    })
  }, []);


  useEffect(() => {
    let iid = setInterval(()=>{
      fetch("http://localhost:3000/sso/e9getQCLoginStatus"+ "?loginkey=" + loginkey).then(res =>{
        res.json().then(data => {
          console.log("qrcode scan data", data)
          if(data.cookies && data.cookies.length > 0 && data.cookies.find(e => String(e).includes("loginidweaver"))){
            clearInterval(iid)
          }
        })
      })
    }, 3000);

    return () => {
      clearInterval(iid);
    }

  }, [loginkey]);

  return (
    <div>
      { url ?  <QRCodeSVG value={url} /> : null }
      <h1>Login</h1>
    </div>
  );
}

export default Login