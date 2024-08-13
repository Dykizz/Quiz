import { Button, Form, Input, Modal, notification } from 'antd'
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { checkAccountExist, createAccount, randomToken, userLogin } from '../../Services/userService';
import { NavLink } from 'react-router-dom';
function PageRegister() {
    const rule = {
        required: true,
        message: 'Bắt buộc nhập phần này!',
    }
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const errorNotification = (message) => {
        api.open({
          message: 'Tạo tài khoản không thành công!',
          type: 'error',
          description:
            message,
          duration: 2,
        });
    };
    const successNotification = (message) => {
        api.open({
          message: 'Tạo tài khoản thành công!',
          type: 'success',
          description:
            message,
          duration: 2,
        });
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(true);
    const handleSubmit = async (account) => {
        if (account.password !== account.repassword){
            errorNotification("Hai mật khẩu không trùng nhau!");
            return;
        }
        const checkExist = await checkAccountExist(account.email,account.username);
        if (checkExist){
            errorNotification("Username hoặc Email đã được đăng kí!");
            form.resetFields();
            return;
        }
        const newToken = randomToken();
        account = {...account,token : newToken};
        const result = await createAccount(account);
        if (result){
            successNotification("Bạn đã tạo tài khoản thành công!");
            form.resetFields();
            setIsModalOpen(false);
            setTimeout(()=>{
                navigate('/login');
            },1000);
        }else{
            errorNotification("Quá trình tạo tài khoản trục trặc!");
        }
    }
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 6 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 14 },
        },
    };
    return (<>
        {contextHolder}
        <Modal title='Form Đăng kí' open={isModalOpen} footer={null} onCancel={() => { setIsModalOpen(false) }}>
            <Form
                {...formItemLayout}
                form={form}
                name='formLogin'
                autoComplete='off'
                onFinish={handleSubmit}
                style={{ maxWidth: 600 }}>
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[{ type: 'email', message: 'Email không hợp lệ!' }, rule]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Tài khoản'
                    name='username'
                    rules={[rule,
                        { min: 5, message: 'Username phải có ít nhất 5 ký tự!' },
                        { max: 20, message: 'Username không được vượt quá 20 ký tự!' }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label='Mật khẩu lần 1 '
                    name='password'
                    rules={[rule,
                        { min: 7, message: 'Password phải có ít nhất 7 ký tự!' },
                        { max: 15, message: 'Password không được vượt quá 15 ký tự!' }
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label='Mật khẩu lần 2'
                    name='repassword'
                    rules={[rule]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item style={{ display: "flex", justifyContent: 'center' }}>
                    <Button type='primary' htmlType='submit'>Đăng kí</Button>
                </Form.Item>
                <NavLink to='/login'>Đăng nhập tài khoản</NavLink>
            </Form>
        </Modal>
    </>);
}
export default PageRegister;