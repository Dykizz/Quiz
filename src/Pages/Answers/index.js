import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { get } from "../../utils/request";
import { getCookie } from "../../helpers/cookie";
import { getAnswersByIdUser } from "../../Services/answerService";
import { Table } from "antd";
import { Link } from "react-router-dom";
function Answers() {
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        const getAnswers = async () => {
            const userId = getCookie("userId");
            const result = await getAnswersByIdUser(userId);
            setAnswers(result);
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
        <>
            <h2>Lịch sử làm bài</h2>
            <Table rowKey="id" dataSource={answers} columns={colums}></Table>
        </>
    );
}
export default Answers;