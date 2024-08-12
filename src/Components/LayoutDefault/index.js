import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './layout-default.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '../../helpers/cookie';
import {Button} from 'antd'
import {Logout} from '../../Actions/account.js'
function LayoutDefault() {
    const linkActive = (e) => {
        return e.isActive ? 'link link-box link-active' : 'link link-box';
    }
    const token = getCookie("token");
    const user = useSelector(state => state.accountReducer) ;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = ()=>{
        dispatch(Logout());
        navigate('/');
    }
    return (
        <div className='layout-default'>
            <header className="layout-default__header">
                <div className="layout-default__logo">
                    Logo
                </div>
                {
                    token && (<div className="layout-default__items ">
                        <NavLink className={linkActive} to='/home' >Home</NavLink>
                        <NavLink className={linkActive} to='/topic' >Topic</NavLink>
                    </div>)
                }

                <div className='layout-default__actions'>
                    {
                        token ? 
                        (<Button danger onClick={handleLogout}>Đăng xuất</Button>) : 
                        (<>
                            <NavLink className={linkActive} to='/login' >Login</NavLink>
                            <NavLink className={linkActive} to='/register' >Register</NavLink>
                        </>)
                    }

        </div>
            </header >
        <main>
            <Outlet /> 

        </main>
        </div >
    );
}
export default LayoutDefault;