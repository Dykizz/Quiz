import LayoutDefault from '../Components/LayoutDefault';
import PageHome from '../Pages/Home';
import PageLogin from '../Pages/Login';
import PageRegister from '../Pages/Register';
import PageTopic from '../Pages/Topic';
import NotFound from '../Pages/NotFound'
import { useSelector } from 'react-redux';
import { getCookie } from '../helpers/cookie';
import DoExam from '../Pages/Topic/DoExam';
export const Routers =()=>{
    const user = useSelector(state => state.accountReducer);
    const token = getCookie("token");
    const routes = [
        {
            path: '/',
            element: <LayoutDefault />,
            children: token
                ? [
                    { path: 'home', element: <PageHome /> },
                    { path: 'topic', element: <PageTopic /> },
                    { path: 'quiz', element: <DoExam/>},
                    { path: '*', element: <NotFound/>},
                  ]
                : [
                    { path: 'login', element: <PageLogin /> },
                    { path: 'register', element: <PageRegister /> },
                    { path: '*', element: <NotFound/>},
                  ],
        },
    ];

    return routes;
} 