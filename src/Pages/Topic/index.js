import {  Table } from 'antd'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from '../../utils/request';
import './topic.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Actions/topic';
import CreateQuestionForm from './CreateQuestionForm.js';
import CreateTopic from './CreateTopic.js';
function PageTopic() {
    const topics = useSelector(state => state.topicsReducer);
    const dispatch = useDispatch();
    const colums = [{
        title: "Id",
        dataIndex: "id",
        key: "id"
    }, {
        title: "Tên chủ đề",
        dataIndex: "name",
        key: "name"
    }
        , {
        title: "Hành động",
        key: "action",
        render: (_, record) => (
            <>
                <Link to={`/topic/${record.id}`} > Làm bài</Link>
            </>
        )
    }]
    const getTopics = async () => {
        const result = await get("topics");
        dispatch(getData(result));
    }
    useEffect(() => {
        getTopics();
    }, [])

    return (<>
        <div className='layout-topic' >
            <h1> Danh sách chủ để ôn luyện</h1>
            <CreateQuestionForm topics = {topics}/>
            <CreateTopic/>
            <div className='layout-topic_table' >
                <Table rowKey="id" dataSource={topics} columns={colums}></Table>
            </div>

        </div>

    </>);
}
export default PageTopic;