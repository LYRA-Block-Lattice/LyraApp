import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";

interface customWindow extends Window {
    lyraSetProxy?: any;
    lyraProxy?: any;
}

declare const window: customWindow;

const RedirBlazor = (props) => {
    let { id } = useParams(); 
    useEffect(() => {
        console.log(`Redirect to blazor route /${id}`);
        window.lyraProxy.invokeMethodAsync("Redir", `${id}`);
        //DotNet.invokeMethodAsync<string>("BusinessLayer", "Redir", `${id}`);
    });

    return (
        <div>
            Redirecting to Blazor...
        </div>
    );
};

export default RedirBlazor;