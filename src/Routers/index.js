import LayoutDefault from '../Components/LayoutDefault';
import PageHome from '../Pages/Home';
import PageLogin from '../Pages/Login';
import PageRegister from '../Pages/Register';
import PageTopic from '../Pages/Topic';
import NotFound from '../Pages/NotFound'
import { useSelector } from 'react-redux';
import { getCookie } from '../helpers/cookie';
import Quiz from '../Pages/Quiz';
import Answers from '../Pages/Answers';
import ResultDetail from '../Pages/ResultDetail';
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
                    { path: '/topic/:id', element: <Quiz/>},
                    { path: '/answers/:id', element: <ResultDetail/>},
                    { path: '/answers', element: <Answers/>},
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