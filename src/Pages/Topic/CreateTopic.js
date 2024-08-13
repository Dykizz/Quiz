import { Button, Form, Input, Modal, notification } from 'antd'
import { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import { addTopic, checkTopic } from '../../Services/topicService';
import { useDispatch } from 'react-redux';
import { addData } from '../../Actions/topic';
function CreateTopic() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [form] = useForm();
    const dispatch = useDispatch();
    const rules = [{
        required: true,
        message: 'Bắt buộc nhập phần này!',
    },]
    const successNotification = (message) => {
        api.open({
            message: 'Tạo chủ đề thành công!',
            type: 'success',
            description:
                message,
            duration: 2,
        });
    };
    const errorNotification = (message) => {
        api.open({
            message: 'Tạo chủ đề không thành công!',
            type: 'error',
            description:
                message,
            duration: 2,
        });
    };
    const handleOpen = () => {
        setIsModalOpen(true);
    }
    const handleClose = () =>{
        form.resetFields();
        setIsModalOpen(false); 
    }
    const handleSubmit = async (topic) => {
        const checkTopicExist = await checkTopic(topic);
        if (checkTopicExist.length > 0) {
            errorNotification("Chủ đề đã tồn tại!");
            return;
        }
        const result = await addTopic(topic);
        if (result){
            dispatch(addData(result));
            successNotification("Chúc mừng bạn tạo chủ đề thành công!");
            form.resetFields();
        }else{
            errorNotification("Lỗi tạo chủ đề !");
        }
    }
    return (
        <>
            <Button type='primary' onClick={handleOpen}>Thêm chủ đề</Button>
            {contextHolder}
            <Modal title="Thêm chủ đề"
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
            >
                <Form form={form} name='createTopicForm' onFinish={handleSubmit}>
                    <Form.Item name='name' rules={rules}>
                        <Input placeholder='Nhập tên chủ đề' autoComplete='off'/>
                    </Form.Item>
                    <div style={{ display: "flex", justifyContent: 'center' }}>
                        <Button type='primary' htmlType='submit' >Tạo</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
}
export default CreateTopic;