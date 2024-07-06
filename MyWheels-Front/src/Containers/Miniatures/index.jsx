import { useState, useEffect, useRef } from 'react';
import { MiniaturesService } from '../../Services/Miniatures.service';
import Card from '../../Components/Card';
import Modal from '../../Components/Modal';
import AddIcon from '@mui/icons-material/Add';

function Miniatures() {
    const useEffectExecuted = useRef(false);
    const [openedModal, setOpenedModal] = useState(false);
    const [miniatures, setMiniatures] = useState([]);
    const [loading, setLoading] = useState(true);


    const { GetAllMiniatures, miniaturesList } = MiniaturesService();

    useEffect(() => {
        if (useEffectExecuted.current) return;
        GetAllMiniatures()
            .then(() => {
                setLoading(false)
                // setMiniatures(data);
            })
            .catch(error => {
                console.error('Failed to get miniatures:', error);
                setLoading(false);
            });
        useEffectExecuted.current = true;
    }, []);

    useEffect(() => {
        console.log("Mudou o valor")
        setMiniatures(miniaturesList);
    }, [miniaturesList])


    const HandleOpenModal = () => {
        setOpenedModal(true);
    }
    const HandleCloseModal = () => {
        setOpenedModal(false);
    }


    if (loading) {
        return <h1>Carregando...</h1>
    }
    return (
        <div>
            <div className='flex justify-end p-4'>
                <button className='bg-[#00c3ff] border-[1.5px] border-white rounded-full p-2 flex items-center justify-center hover:bg-blue-500 transition ease-in-out' onClick={HandleOpenModal}>
                    <AddIcon className='text-white' sx={{fontSize: 40}} />
                </button>
            </div>
            <div className='flex flex-row gap-4 flex-wrap'>
                {miniatures.length === 0 ?


                    <div className='flex w-full justify-center h-[50vh] m-0 items-center '>
                        <span className='font-bold text-3xl italic'>Começe adicionando seus carrinhos!</span>
                    </div>



                    : miniatures.map((car) => (
                        <Card key={car.Id} id={car.Id} image={car.ImageUrl} name={car.Name} description={car.Description} collectionName={car.Collection.Name} batchName={car.Batch.Name} aquisitionDate={car.AcquisitionDate} isThunt={car.IsThunt} isSuper={car.IsSuperThunt} />
                    ))}
            </div>


            <Modal openedModal={openedModal} closedModal={HandleCloseModal} toUpdate={false} />
        </div>
    );
}

export default Miniatures;
