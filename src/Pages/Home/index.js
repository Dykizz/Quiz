import { Button, Carousel } from "antd";
import './home.scss'
import { useNavigate } from "react-router-dom";
function PageHome() {
    const navigate = useNavigate();
    return (<>
        <h2 className="title">Chào mừng bạn đến với Quiz về các chủ đề lập trình</h2>
        <Carousel className="slider" autoplay>
            <div className="card">
                <img className="img"
                    src="https://4.bp.blogspot.com/-kfK99uzBX1g/VXRryoJgN4I/AAAAAAAAA0A/QkzlW-v0p1I/s1600/html5.jpg"
                    alt="HTML"
                />
            </div>
            <div className="card">
                <img className="img"
                    src="https://www.oxfordwebstudio.com/user/pages/06.da-li-znate/sta-je-css/sta-je-css.png"
                    alt="CSS"
                />
            </div>
            <div className="card">
                <img className="img"
                    src="https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/conoce-8-ventajas-de-usar-javascript.jpg"
                    alt="Javascript"
                />
            </div>
            <div className="card">
                <img className="img"
                    src="https://cdn.hashnode.com/res/hashnode/image/upload/v1625576291410/by9FKZ3ek.png"
                    alt="ReactJs"
                />
                    
            </div>
        </Carousel>
        <div className="inner-buttons">
            <Button onClick={()=>{navigate('/topic')}}>Các chủ đề luyện tập</Button>
            <Button onClick={()=>{navigate('/answers')}}>Các bài đã làm</Button>
        </div>
        
    </>)

}
export default PageHome;