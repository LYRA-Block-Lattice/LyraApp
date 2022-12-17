import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";

const RedirBlazor = (props) => {
    let { id } = useParams(); 
    useEffect(() => {
        console.log(`Redirect to blazor route /${id}`);
        DotNet.invokeMethodAsync<string>("BusinessLayer", "Redir", `${id}`);
    });

    return (
        <div>
            Redirecting to Blazor...
        </div>
    );
};

export default RedirBlazor;