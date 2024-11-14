import { Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
    const isAuthenticated = false;

    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ) : (
                <section className="flex flex-col xl:flex-row h-screen">
                    {/* Content Area - Left Side */}
                    <div className="flex flex-1 justify-center items-center flex-col ">
                        <div className="max-w-md w-full">
                            <Outlet />
                        </div>
                    </div>

                    {/* Image Area - Right Side */}
                    <div className="hidden xl:flex xl:w-1/2">
                        <img 
                            src="/1.jpg"
                            alt="logo" 
                            className="h-full w-full object-cover"
                        />
                    </div>
                </section>
            )}
        </>
    )
}

export default AuthLayout;