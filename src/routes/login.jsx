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
    fetch("http://localhost:3000/sso/e9getQCLoginStatus").then(res =>{
      res.json().then(data => {
        setUrl(data.qrcode.text);
      })
    })
  }, [loginkey]);

  return (
    <div>
      { url ?  <QRCodeSVG value={url} /> : null }
      <h1>Login</h1>
    </div>
  );
}

export default Login