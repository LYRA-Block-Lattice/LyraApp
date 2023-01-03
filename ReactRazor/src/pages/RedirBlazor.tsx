import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";

interface customWindow extends Window {
  rrComponent?: any;
  rrProxy?: any;
}
declare const window: customWindow;

const RedirBlazor = (props) => {
    let { id } = useParams(); 
    useEffect(() => {
      console.log(`Redirect to blazor route /${id}`);
      window.rrProxy.ReactRazor.Pages.Home.Interop.RedirAsync(window.rrComponent, `${id}`);
    });

    return (
        <div>
            Redirecting to Blazor...
        </div>
    );
};

export default RedirBlazor;