import { useState, useEffect } from 'react';
import { GetAll } from '../../Services/Miniatures.service';
import Card from '../../Components/Card';

function Miniatures() {
    const [miniatures, setMiniatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        GetAll()
            .then(data => {
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
            <div className='flex flex-row gap-4'>
                {miniatures.map((car) => (
                    <Card key={car.Id} image={car.ImageUrl} name={car.Name} description={car.Description} collectionName={car.Collection.Name} batchName={car.Batch.Name} aquisitionDate={car.AcquisitionDate} isThunt={car.IsThunt} isSuper={car.IsSuperThunt} />
                ))}
            </div>


        </div>
    );
}

export default Miniatures;

// {miniatures.map((miniature) => (
//     <li key={miniature.id}>{miniature.Name} - {miniature.Batch.Id}</li>
// ))}