import { useState } from "react";
import React from "react";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hook";
import "./index.css";
import { LoginActions } from "../../redux/reducers/User/login";
function Login() {
  const [details, setdetails] = useState({
    username: "",
    password: "",
  });

  const dispatch = useAppDispatch();

  let history = useHistory();

  const onFinish1 = (e: any) => {
    e.preventDefault();
    dispatch(
      LoginActions.LOGIN_REQUREST({
        data: details,

        cb: (res: any) => {
          if (res.isSuccess == true) {
            history.push("/");
            message.success("ĐĂNG NHẬP THÀNH CÔNG");
          }else if(res.error) {
            message.error(res.error.error);
          }
           else {
            message.error("ĐĂNG NHẬP THẤT BẠI");
          }
        },
      })
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    message.warning("Bạn đang nhập thiếu thông tin");
  };

  return (
    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-md-4 login-sec">
            <h2 className="text-center">Đăng Nhập</h2>
            <form className="login-form" onSubmit={onFinish1}>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setdetails({ ...details, username: e.target.value })
                  }
                  value={details.username}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Mật khẩu
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) =>
                    setdetails({ ...details, password: e.target.value })
                  }
                  value={details.password}
                />
              </div>
              <div className="form-check">
                <label className="form-check-label">
                  <input type="checkbox" className="form-check-input" />
                  <small>Remember Me</small>
                </label>
                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-login float-right"
                >
                  ĐĂNG NHẬP
                </button>
              </div>
            </form>

            <div className="copy-text">
              Created with <i className="fa fa-heart" /> by Kimitenla
            </div>
          </div>
          <div className="col-md-8 banner-sec"></div>
        </div>
      </div>
    </section>
  );
}
export default Login;
