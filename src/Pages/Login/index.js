import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Login } from '../../Actions/account';
import { userLogin } from '../../Services/userService';
import { setCookie } from '../../helpers/cookie';
import {UserOutlined, LockOutlined} from '@ant-design/icons'
function PageLogin() {
    
    const rules = [{
        required: true,
        message: 'Bắt buộc nhập phần này!',
    },]
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.accountReducer);
    const [isModalOpen, setIsModalOpen] = useState(true);
    useEffect(()=>{
        if (user.status) setIsModalOpen(false);
    },[])
    const handleSubmit =async (account)=>{
        const result = await userLogin(account.username,account.password);
        if (result.length > 0 && result[0].username === account.username && result[0].password === account.password ){
            dispatch(Login());
            setCookie("username",account.username,0.05);
            setCookie("email",result[0].email,0.05);
            setCookie("token",result[0].token,0.05);
            navigate("/home")
        }else{
            console.log("Đăng nhập không thành công!");
        }
    }
    return (<>
        <Modal 
            title='Đăng nhập' 
            open={isModalOpen} 
            footer={null} 
            onCancel={() => { setIsModalOpen(false) }} 
            style={{display: 'flex', justifyContent : 'center'}}>
            <Form name='formLogin' autoComplete='off' onFinish={handleSubmit} style={{ width: 360 }}>
                <Form.Item  
                    name='username'
                    rules={rules}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username"/>
                </Form.Item>
                <Form.Item
                    name= 'password'
                    rules={rules}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password"  />
                </Form.Item>
                <Form.Item name='buttonSubmit' style={{display: "flex", justifyContent: 'center'}}>
                    <Button type='primary' htmlType='submit'>Đăng nhập</Button>
                </Form.Item>
                <NavLink to = '/register'>Đăng kí tài khoản</NavLink>
            </Form>
        </Modal>
    </>);
}
export default PageLogin;