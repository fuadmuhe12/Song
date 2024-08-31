import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/error-page";
import Home from "../pages/home";
import RootLayout from "../layout/root-layout";
import AddSong from "../pages/AddSong";
import UpdateSong from "../components/update";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/add-Song",
                element: <AddSong />,
            },
            {
                path: "/updated-song/:id",
                element: <UpdateSong />
            }

        ],

    },
]);