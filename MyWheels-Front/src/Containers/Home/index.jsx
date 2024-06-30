function Home() {
    return (
        <div className="bg-home bg-center h-[88vh] bg-cover flex items-center">
            <div className="text-white border-r-[1px] border-white w-[50%] h-[80%]">
                <h1 className="text-5xl">Bem vindo,</h1>
                <div>
                    <span>
                        Adicional...
                    </span>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[50%]">
                <div className="ml-[-30px]">
                    <img src="../../../public/Logo.png" width={200} height={200} />
                </div>
                <div>
                    <h1 className="text-5xl text-white">MyWheels</h1>
                </div>
            </div>

        </div>
    );
}
export default Home;