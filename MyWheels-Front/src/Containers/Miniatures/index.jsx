import { useState, useEffect } from 'react';
import { fetchMiniatures } from '../../Services/GetAllMiniatures';

function Miniatures() {
    const [miniatures, setMiniatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMiniatures()
            .then(data => {
                setMiniatures(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch miniatures:', error);
                setLoading(false);
            });
    }, []);


    if (loading) {
        return <h1>Carregando...</h1>

    }

    return (
        <div>
            <h1 className="text-black">Miniatures</h1>
            <ul>
                {miniatures.map((miniature) => (
                    <li key={miniature.id}>{miniature.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Miniatures;  