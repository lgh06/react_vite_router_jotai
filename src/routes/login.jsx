import { useEffect, useRef, useState } from "react";
// import {QRCodeSVG} from 'qrcode.react';
import { QRCode } from 'antd';

import css from "./login.module.scss";
import { useAtom } from 'jotai'
import { userNameAtom,loginKeyAtom, userIdAtom, urlAtom } from "../store/user.js";
import { Button } from "antd";

function Login() {
  const [url, setUrl] = useAtom(urlAtom);
  const [loginKey, setLoginKey] = useAtom(loginKeyAtom);
  const [userId, setUserId] = useAtom(userIdAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const [time, setTime] = useState(28);
  const timeRef = useRef(28);

  let server = "http://172.24.1.55:3000";



  useEffect(() => {
    let func = () =>{
      if(userId !== 0) return;
      if(userName !== "") return;
      fetch(`${server}/sso/e9getLoginForm`).then(res =>{
        res.json().then(data => {
          setUrl(data.qrcode.text);
          setLoginKey(new URL(data.qrcode.text).searchParams.get('loginkey'));
        })
      })
    }

    func();
    let iid = setInterval(()=>{
      func()
    }, 28 *1000);
    return () => {
      clearInterval(iid);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId,userName]);


  useEffect(() => {
    let iid = setInterval(()=>{
      if(userId) return;
      if(loginKey === "") return;

      fetch(`${server}/sso/e9getQCLoginStatus`+ "?loginkey=" + loginKey).then(res =>{
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
    }, 1200);

    return () => {
      clearInterval(iid);
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginKey]);

  useEffect(()=>{
    console.log("triggered use effect timeRef", url, time, timeRef.current)
    if(url == "") return;
    setTime(28);
    let iid = setInterval(()=>{
      if(timeRef.current == 0){
        timeRef.current = 27;
      }else{
        timeRef.current -= 1;
      }
      setTime(timeRef.current)
    }, 1000);
    return ()=> {
      clearInterval(iid)
      timeRef.current = 0;
      console.log("destroy use effect timeRef")
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return (
    <div>
      { url && (!userId) ?  
          <div>
            {/* <QRCodeSVG className={css.qr} value={url} />  */}
            <QRCode
              errorLevel="M"
              className={css.qr}
              size={400}
              // iconSize={size / 4}
              value={url}
              bordered={true}
              // icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
          </div>
          : null }
      {
        userId == 0 && <>
          <p style={{textAlign:"center", fontSize:"1.5em"}}>请尽快扫码、尽快点击确认<br/>
          二维码刷新后，请：重新扫码，重新点击确认</p>
        
        </>
      }
      {
        userId == 0 && <>
          <p style={{textAlign:"center", fontSize:"1.5em"}}>{time}秒后刷新</p>
        </>
      }
      {
        (userId!=0) && <p className={css.p}>userId: {userId}</p>
      }
      {
        userName && <p className={css.p}>userName: {userName}</p>
      }

      {
        (userId!=0) && <div>
          <a className={css.a} href={`${server}/knex/1`} target="_blank">
            接口示例1&nbsp;&nbsp;Oracle&nbsp;&nbsp;CRM_CustomerInfo表
          </a> <br />
          <a className={css.a} href={`${server}/knex/2`} target="_blank">
            接口示例2&nbsp;&nbsp;SQLServer&nbsp;&nbsp;CusDeliverAdd表
          </a> <br />
          <a className={css.a} href={`${server}/knex/3`} target="_blank">
            接口示例3&nbsp;&nbsp;一个接口返回两个数据库的数据
          </a>
        </div>
      }

      {
        (userId!=0) && (<>
          <br />
          <Button onClick={()=>{
            setUserId(0)
            setUserName("")
          }}>
            退出
          </Button>
        </>)
      }
    </div>
  );
}

export default Login