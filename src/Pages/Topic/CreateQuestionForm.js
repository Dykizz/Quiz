import { Button, Form, Input, InputNumber, Modal, Select, notification } from 'antd'
import { useState } from 'react';
import { addQuestion } from '../../Services/questionService';
import { useForm } from 'antd/es/form/Form';
function CreateQuestionForm(props){
    const {topics} = props;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [options, setOptions] = useState([]);
    const [form] = useForm();
    const rules = [{
        required: true,
        message: 'Bắt buộc nhập phần này!',
    },]
    const successNotification = (message) => {
        api.open({
          message: 'Tạo câu hỏi thành công!',
          type: 'success',
          description:
            message,
          duration: 2,
        });
    };
    const errorNotification = (message) => {
        api.open({
          message: 'Tạo câu hỏi không thành công!',
          type: 'error',
          description:
            message,
          duration: 2,
        });
    };
    const handleOpen = async () => {
        const listOptions = topics.map((item) => {
            return {
                value: item.id,
                label: item.name
            }
        })
        setOptions(listOptions);
        setIsModalOpen(true);
    }
    const handleClose = () =>{
        form.resetFields();
        setIsModalOpen(false); 
    }
    const handleSubmit = async (e) => {
        const inforNewQuestion = {
            topicId : e.topicId,
            question: e.question,
            answers : [e.answer1,e.answer2,e.answer3,e.answer3],
            correctAnswer : e.correctAnswer
        }
        const result =await addQuestion(inforNewQuestion);
        if (result){
            successNotification("Chúc mừng bạn tạo câu hỏi thành công!")
            form.resetFields();
        }else{
            errorNotification("Lỗi tạo câu hỏi !")
        }
    }
    return (
        <>
            <Button type='primary' onClick={handleOpen}>Thêm câu hỏi</Button>
            {contextHolder}
            <Modal title="Thêm câu hỏi"
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}

            >
                <Form form={form} name='createQuestionForm' onFinish={handleSubmit}>
                    <Form.Item
                        name='question'
                        rules={rules}
                    >
                        <Input placeholder=' Nhập câu hỏi tại đây' max={200} autoComplete='off' />
                    </Form.Item>
                    <h3>Chọn chủ đề:</h3>
                    <Form.Item name='topicId' rules={rules} >
                        <Select options={options}  >

                        </Select>
                    </Form.Item>
                    <h3>Nhập các đáp án :</h3>
                    <Form.Item name="answer1" label="Đáp án 1" rules={rules}>
                        <Input autoComplete='off' />
                    </Form.Item>
                    <Form.Item name="answer2" label="Đáp án 2" rules={rules}>
                        <Input autoComplete='off' />
                    </Form.Item>
                    <Form.Item name="answer3" label="Đáp án 3" rules={rules}>
                        <Input autoComplete='off' />
                    </Form.Item>
                    <Form.Item name="answer4" label="Đáp án 4" rules={rules}>
                        <Input autoComplete='off' />
                    </Form.Item>
                    <Form.Item name="correctAnswer" label="Đáp án đúng" rules={rules}>
                        <InputNumber min={1} max={4} />
                    </Form.Item>
                    <div name='buttonSubmit' style={{ display: "flex", justifyContent: 'center' }}>
                        <Button type='primary' htmlType='submit'>Tạo</Button>
                    </div>

                </Form>

            </Modal>
        </>
    );
}
export default CreateQuestionForm;