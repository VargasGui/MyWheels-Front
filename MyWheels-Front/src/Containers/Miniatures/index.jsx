import { useState, useEffect, useRef } from 'react';
import { MiniaturesService } from '../../Services/Miniatures.service';
import Card from '../../Components/Card';
import Modal from '../../Components/Modal';
import AddIcon from '@mui/icons-material/Add';
import FilterIcon from '@mui/icons-material/FilterAltOutlined';
import SwapVertIcon from '@mui/icons-material/SwapVert';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

    const [order, setOrder] = useState('');

    const handleChangeOrder = (event) => {
        setOrder(event.target.value);
    };


    if (loading) {
        return <h1>Carregando...</h1>
    }
    return (
        <div className=''>
            <div className='flex justify-between items-center w-[95%]'>
                <div className='flex justify-start items-center p-4 gap-2'>
                    <button className='bg-[#4169E1] shadow-2xl rounded-lg p-2 flex items-center justify-center hover:bg-[#0000CD] transition ease-in-out' onClick={HandleOpenModal}>
                        <AddIcon className='text-black' sx={{ fontSize: 20 }} />
                        <span className='px-2 font-semibold text-md'>Adicionar</span>
                    </button>
                    <button className='bg-[#A9A9A9] shadow-2xl rounded-lg p-2 flex items-center justify-center hover:bg-[#575961] transition ease-in-out'>
                        <FilterIcon className='text-black' sx={{ fontSize: 20 }} />
                        <span className='px-2 font-semibold text-md'>Filtrar</span>
                    </button>
                </div>
                <div className='p-2 flex items-center justify-center'>
                    <SwapVertIcon className='text-black' sx={{ fontSize: 20 }} />
                    <span className='px-2 font-semibold text-md cursor-default'>Ordenar:</span>
                    <FormControl variant="standard" sx={{ minWidth: 120, marginTop: -2 }}>
                        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
                        <Select
                            id="selectOrdenation"
                            value={order}
                            onChange={handleChangeOrder}
                        >
                            <MenuItem value={10}>Data de criação</MenuItem>
                            <MenuItem value={30}>Data de aquisição</MenuItem>
                            <MenuItem value={30}>Data de lançamento</MenuItem>
                            <MenuItem value={20}>Número</MenuItem>
                            <MenuItem value={30}>Raridade</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className='flex flex-row justify-start gap-8 flex-wrap w-full pb-6 pl-4'>

                {miniatures.length === 0 ?

                    <div className='flex w-full justify-center h-[50vh] m-0 items-center '>
                        <span className='font-bold text-3xl italic'>Começe adicionando seus carrinhos!</span>
                    </div>

                    : miniatures.map((car) => (
                        <Card key={car.Id} id={car.Id} number={car.Number} image={car.ImageUrl} name={car.Name} displayName={car.DisplayName} description={car.Description} collectionName={car.Collection.Name} batch={car.Batch} aquisitionDate={car.AcquisitionDate} isThunt={car.IsThunt} isSuper={car.IsSuperThunt} />

                    ))}

            </div>


            <Modal openedModal={openedModal} closedModal={HandleCloseModal} toUpdate={false} />
        </div>
    );
}

export default Miniatures;
