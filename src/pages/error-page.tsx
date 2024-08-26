import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as { statusText?: string; message?: string };


    return (
        <div id="error-page" className="flex flex-col justify-center items-center gap-y-6 min-h-screen">
            <h1 className="text-4xl">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-400">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}