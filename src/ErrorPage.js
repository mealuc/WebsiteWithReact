import React from "react";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>Hata!</h1>
            <p>Üzgünüz, beklenmedik bir hata meydana geldi.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

export default ErrorPage = React.memo(ErrorPage);