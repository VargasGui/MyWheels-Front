import { useState, useEffect } from 'react';
import { MiniaturesService } from '../../Services/Miniatures.service';
import Card from '../../Components/Card';
import Modal from '../../Components/Modal';

function Miniatures() {
    const [miniatures, setMiniatures] = useState([]);
    const [loading, setLoading] = useState(true);

    const { GetAllMiniatures } = MiniaturesService();


    useEffect(() => {
        GetAllMiniatures()
            .then((data) => {
                setMiniatures(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to get miniatures:', error);
                setLoading(false);
            });
    }, []);
    

    if (loading) {
        return <h1>Carregando...</h1>
    }
    return (
        <div>
            <h1 className="text-black">2024</h1>
            <div>
                <Modal />
            </div>
            <div className='flex flex-row gap-4 flex-wrap'>
                {miniatures.map((car) => (
                    <Card key={car.Id} image={car.ImageUrl} name={car.Name} description={car.Description} collectionName={car.Collection.Name} batchName={car.Batch.Name} aquisitionDate={car.AcquisitionDate} isThunt={car.IsThunt} isSuper={car.IsSuperThunt} />
                ))}
            </div>


        </div>
    );
}

export default Miniatures;
