import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const goToMiniaturesPage = () => {
        navigate('/miniatures');
    }
    return (
        <div className="bg-home bg-center h-[88vh] bg-cover flex items-center">
            <div className="text-white border-r-[1px] border-white w-[50%] h-[80%]">
                <div className="mt-[16.5%] ml-[6%]">
                    <h1 className="text-5xl pb-[2%] font-semibold italic">Bem vindo,</h1>
                    <div className="w-[80%]">
                        <span className="italic font-medium">
                            Aqui você encontra a sua coleção on-line focada nas miniaturas mais queridas do Brasil.
                            Adicone, remova e se divirta! Salve a sua coleção física no digital, no futuro!
                        </span>
                    </div>
                    <div className="flex items-center text-center text-white mt-[5%] bg-[#545454] text-semibold w-[32%] p-1 rounded-full hover:text-blue-400">
                        <button onClick={goToMiniaturesPage} className="text-center w-full h-full  italic font-medium">Minha coleção</button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center w-[50%]">
                <div className="ml-[-30px]">
                    <img src="../../../public/Logo.png" width={200} height={200} />
                </div>
                <div>
                    <h1 className="text-5xl text-white italic font-semibold">MyWheels</h1>
                </div>
            </div>

        </div>
    );
}


export default Home;