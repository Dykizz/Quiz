import { useRoutes } from "react-router-dom"
import { Routers } from "../../Routers"

function AllRouters (){
    const elements = useRoutes(Routers());
    return (
        <>
            {elements}
        </>
    );
}
export default AllRouters;