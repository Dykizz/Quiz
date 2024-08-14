import { NavLink, Outlet, useNavigate,Link } from 'react-router-dom'
import './layout-default.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../helpers/cookie';
import {Button, notification} from 'antd'
import {Logout} from '../../Actions/account.js'
import { useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons'
function LayoutDefault() {
    const linkActive = (e) => {
        return e.isActive ? 'link link-box link-active' : 'link link-box';
    }
    const token = getCookie("token").length === 24;
    const user = useSelector(state => state.accountReducer) ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        dispatch(Logout());
        navigate('/');
    }
    const [api, contextHolder] = notification.useNotification();
    const successNotification = (message) => {
        api.open({
          message: 'Đăng nhập thành công!',
          type: 'success',
          description:
            message,
          duration: 2,
        });
    };
    useEffect(()=>{
        if (user.status){
            successNotification("Chúc mừng bạn đăng nhập thành công!");
        }
    },[user.status])
    return (
        <div className='layout-default'>
            {contextHolder}
            <header className="layout-default__header">
                <div className="layout-default__logo">
                    <Link to={token ? '/home' : '/login'} className= 'link link-box'>Logo</Link>
                </div>
                {
                    token && (<div className="layout-default__items ">
                        <NavLink className={linkActive} to='/home' >Home</NavLink>
                        <NavLink className={linkActive} to='/topic' >Topic</NavLink>
                        <NavLink className={linkActive} to= '/answers'>Answers</NavLink>
                    </div>)
                }

                <div className='layout-default__actions'>
                    {
                        token ? 
                        (<Button 
                            danger onClick={handleLogout} 
                            icon = {<LogoutOutlined style={{color : 'red', fontSize: 20}}
                            />}
                            style={{fontSize: 16, fontWeight: 500}}
                        >Đăng xuất</Button>) : 
                        (<>
                            <NavLink className={linkActive} to='/login' >Login</NavLink>
                            <NavLink className={linkActive} to='/register' >Register</NavLink>
                        </>)
                    }

        </div>
            </header >
        <main className='layout-default__main' >
            {!token && <h2>Hiện tại bạn chưa đăng nhập. Hãy đăng nhập để có thể truy cập vào Quiz!</h2> }
            <Outlet /> 

        </main>
        </div >
    );
}
export default LayoutDefault;