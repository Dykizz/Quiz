import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookie";
import { getAnswersByIdUser } from "../../Services/answerService";
import { Table } from "antd";
import { Link } from "react-router-dom";
import './Answers.scss'
function Answers() {
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        const getAnswers = async () => {
            const userId = getCookie("userId");
            const result = await getAnswersByIdUser(userId);
            setAnswers(result.reverse());
        }
        getAnswers();
    }, []);
    const colums = [{
        title: "ID bài làm",
        dataIndex: "id",
        key: "id"
    }, {
        title: "Tên chủ đề",
        dataIndex: "nameTopic",
        key: "nameTopic"
    },{
        title : "Thời gian",
        dataIndex: "timesubmit",
        key: "timesubmit"
    }
        , {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
            <>
                <Link to={`/answers/${record.id}`} > Xem chi tiết</Link>
            </>
        )
    }]
    return (
        <div className="layout-answers">
            <h2>Lịch sử làm bài</h2>
            <Table className="layout-answers_table" rowKey="id" dataSource={answers} columns={colums}></Table>
        </div>
    );
}
export default Answers;