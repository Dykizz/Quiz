import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getAnswerById } from "../../Services/answerService";
import { getQuestionsById } from "../../Services/questionService";
import { Form, Radio, Space, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons"
import './ResultDetail.scss'
function ResultDetail() {
    const { id } = useParams();
    const [answerRecord, setAnswerRecord] = useState([]);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        const getAnswer = async () => {
            const result = await getAnswerById(id);
            setAnswerRecord(result);
            console.log(result);
            const resultTopic = await getQuestionsById(result.topicId);
            setQuestions(resultTopic);
            console.log(resultTopic);
        }
        getAnswer();
    }, []);
    const checkAns = (defaultans, correct, ans) => {
        if (defaultans == correct) return ' correctAns';
        if (defaultans == ans) {
            if (correct == ans) return 'correctAns';
            return 'errorAns';
        }
        return '';
    }
    return (
        <>
            {id}
            <Form name="formResult" initialValues={answerRecord}>
                {
                    questions.map((question, index) => {
                        const correctAns = question.correctAnswer;
                        const ans = answerRecord.answers[index].answer;
                        console.log(answerRecord.answers[index].answer, question.correctAnswer)
                        return <Form.Item
                            key={question.id}
                            name={`answer${index + 1}`}
                            initialValue={answerRecord.answers[index].answer}
                        >
                            <div className="layout-default">

                                <div style={{ display: 'flex' }}>{`Câu ${index + 1}: ${question.question}`}
                                    <div style={{ marginLeft: 10 }}>
                                        {
                                            correctAns == ans ?
                                                <Tag icon={<CheckCircleOutlined />} color="success">Đúng</Tag> :
                                                <Tag icon={<CloseCircleOutlined />} color="error">Sai</Tag>
                                        }
                                    </div>
                                </div>


                                <Radio.Group value={answerRecord.answers[index].answer} >
                                    <Space direction="vertical">
                                        <Radio value='1' className={checkAns(1, correctAns, ans)}>{`A. ${question.answers[0]}`}</Radio>
                                        <Radio value='2' className={checkAns(2, correctAns, ans)}>{`B. ${question.answers[1]}`}</Radio>
                                        <Radio value='3' className={checkAns(3, correctAns, ans)}>{`C. ${question.answers[2]}`}</Radio>
                                        {question.answers[3] && (
                                            <Radio value='4' className={checkAns(4, correctAns, ans)}>{`D. ${question.answers[3]}`}</Radio>
                                        )}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                    })
                }
            </Form>
        </>
    );
}
export default ResultDetail;