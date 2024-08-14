import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { getAnswerById } from "../../Services/answerService";
import { getQuestionsById } from "../../Services/questionService";
import { Button, Form, Radio, Space, Tag } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined, ArrowLeftOutlined, FrownOutlined, SmileOutlined } from "@ant-design/icons"
import './ResultDetail.scss'
function ResultDetail() {
    const { id } = useParams();
    const [answerRecord, setAnswerRecord] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [resultRecord,setResultRecord] = useState({});
    const navigate = useNavigate();
    const handleGrading = (record,ans)=>{
        let totalCorrect = ans.reduce((totalCorrect, element, index) => {
            return totalCorrect + (element.correctAnswer == record.answers[index].answer ? 1 : 0);
        }, 0);
        let totalQuestion = ans.length;
        let totalUncorrect = totalQuestion - totalCorrect;
        let rate = (totalCorrect / totalQuestion * 100).toFixed(2) ;
        setResultRecord({
            totalQuestion : totalQuestion,
            totalCorrect : totalCorrect,
            totalUncorrect : totalUncorrect,
            rate : rate
        })
    }
    useEffect(() => {
        const getAnswer = async () => {
            const resultUser = await getAnswerById(id);
            setAnswerRecord(resultUser);
            const resultTopic = await getQuestionsById(resultUser.topicId);
            setQuestions(resultTopic);
            handleGrading(resultUser,resultTopic)
            
        }
        getAnswer();
    }, []);
    const checkAns = (defaultans, correct, ans) => {
        if (defaultans == correct) return 'layout-result__ans layout-result__ans-correctAns';
        if (defaultans === ans && correct != ans) 
            return 'layout-result__ans layout-result__ans-errorAns';
        return 'layout-result__ans';
    }
    return (
        <>
        <Button 
            className="button-goback" 
            type="primary" 
            onClick={()=>{navigate(-1)}}
            icon = {<ArrowLeftOutlined />}
        >Quay lại</Button>
        <div className="layout-result">
            <div className="layout-result__title">
                <h2>Kết quả chủ đề : {answerRecord.nameTopic}</h2>
                <div className="layout-result__infor">
                Đúng : <strong>{resultRecord.totalCorrect}</strong>  | 
                 Sai : <strong>{resultRecord.totalUncorrect}</strong> |
                 Tổng số câu : <strong>{resultRecord.totalQuestion}</strong> |
                 Tỷ lệ đúng : <strong>{resultRecord.rate}%</strong> |
                 Nhận xét : { resultRecord.totalCorrect > resultRecord.totalUncorrect ?
                 <span style={{color: 'green'}}>Bạn làm khá tốt! <SmileOutlined /></span>
                : <span style={{color: 'yellowgreen'}} >Bạn cần cố gắng nhiều hơn! <FrownOutlined /></span> }
                </div>
            </div>
            <Form name="formResult" initialValues={answerRecord} className="layout-result__form">
                {
                    questions.map((question, index) => {
                        const correctAns = question.correctAnswer;
                        const ans = answerRecord.answers[index].answer;
                        return <Form.Item
                            key={question.id}
                            name={`answer${index + 1}`}
                            initialValue={answerRecord.answers[index].answer}
                        >
                            <div className="layout-result__QA">
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
                                        <Radio value='1' className={checkAns('1', correctAns, ans)}>{`A. ${question.answers[0]}`}</Radio>
                                        <Radio value='2' className={checkAns('2', correctAns, ans)}>{`B. ${question.answers[1]}`}</Radio>
                                        <Radio value='3' className={checkAns('3', correctAns, ans)}>{`C. ${question.answers[2]}`}</Radio>
                                        {question.answers[3] && (
                                            <Radio value='4' className={checkAns('4', correctAns, ans)}>{`D. ${question.answers[3]}`}</Radio>
                                        )}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                    })
                }
            </Form>
        </div>
    </>
    );
}
export default ResultDetail;