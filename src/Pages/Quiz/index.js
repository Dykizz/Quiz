import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionsById } from "../../Services/questionService";
import { useEffect, useState } from "react";
import { getNameTopicById } from "../../Services/topicService";
import { Button, Form, Radio, Space } from "antd";
import { getCookie } from "../../helpers/cookie";
import { addAnswers } from "../../Services/answerService";
import { notification } from "antd";
import './Quiz.scss'
function Quiz() {
    const { id } = useParams();
    const [questions, setQuestions] = useState([]);
    const [nameTopic, setNameTopic] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const successNotification = (message) => {
        api.open({
          message: 'Nộp bài thành công!',
          type: 'success',
          description:
            message,
          duration: 2,
        });
    };
    const errorNotification = (message) => {
        api.open({
          message: 'Nộp bài không thành công!',
          type: 'error',
          description:
            message,
          duration: 2,
        });
    };
    const rules = [{
        required: true,
        message: 'Bắt buộc trả lời câu hỏi này!',
    },]
    useEffect(() => {
        const getQuestions = async () => {
            const result = await getQuestionsById(id);
            setQuestions(result);
            const name = await getNameTopicById(id);
            setNameTopic(name);
        }
        getQuestions();
    }, []);
    const handleSubmit = async (listAnswer) => {
        console.log(listAnswer);
        const curentTime = new Date();
        const answers = {
            topicId: id,
            nameTopic: nameTopic,
            username: getCookie("username"),
            userId: getCookie("userId"),
            timesubmit : curentTime.toLocaleString(),
            answers : questions.map((item,index)=>{
                return {
                    questionId: item.id,
                    answer : listAnswer[`answer${index + 1}`]
                }
            })
        }
        const result = await addAnswers(answers);
        if (result){
            successNotification("Chúc mừng bạn đã làm xong bài. Quay trở lại trang topic và làm tiếp nào!")
            setTimeout(()=>{
                navigate('/topic')
            },1500)
        }else{
            errorNotification("Lỗi trục trặc khi nộp bài. Hãy kiểm tra lại bài!")
        }


    }
    return (
        <div className="layout-exam">
            {contextHolder}
            <h1 className="layout-exam__title">Bài Quiz chủ đề: {nameTopic}</h1>
            <Form className="layout-exam__form" name="Answers" onFinish={handleSubmit}>
                {
                    questions.map((question, index) => {
                        return <Form.Item
                            key={question.id}
                            name={`answer${index + 1}`}
                            rules={rules}
                        >
                            <div className="layout-exm__QA">
                                <div>{`Câu ${index + 1}: ${question.question}`}</div>
                                <Radio.Group >
                                    <Space direction="vertical">
                                        <Radio className="layout-exam__ans" value={1}>{`A. ${question.answers[0]}`}</Radio>
                                        <Radio className="layout-exam__ans" value={2}>{`B. ${question.answers[1]}`}</Radio>
                                        <Radio className="layout-exam__ans" value={3}>{`C. ${question.answers[2]}`}</Radio>
                                        {question.answers[3] && (
                                            <Radio className="layout-exam__ans" value={4}>{`D. ${question.answers[3]}`}</Radio>
                                        )}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                    })
                }
                {
                    questions.length > 0 ? 
                    <div>
                        <Button type="primary" htmlType="submit">Nộp bài</Button>
                    </div> :
                    <div>
                        <h3>Hiện chưa có câu hỏi để làm bài!</h3>
                        <Link to= '/topic'>Quay trở về</Link>
                    </div>
                }
                
            </Form>
        </div>
    );
}
export default Quiz;