import { useState, useEffect, useRef } from 'react';
import { MiniaturesService } from '../../Services/Miniatures.service';
import Card from '../../Components/Card';
import Modal from '../../Components/Modal';

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
            <h1 className="text-black">2024</h1>
            <div className='bg-blue-200 p-6'>
                <button className='bg-black p-8' onClick={HandleOpenModal}>

                </button>
            </div>
            <div className='flex flex-row gap-4 flex-wrap'>
                {miniatures.map((car) => (
                    <Card key={car.Id} id={car.Id} image={car.ImageUrl} name={car.Name} description={car.Description} collectionName={car.Collection.Name} batchName={car.Batch.Name} aquisitionDate={car.AcquisitionDate} isThunt={car.IsThunt} isSuper={car.IsSuperThunt} />
                ))}
            </div>


            <Modal openedModal={openedModal} closedModal={HandleCloseModal} toUpdate={false}/>
        </div>
    );
}

export default Miniatures;
