import { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/pt-br';

import { MiniaturesService } from '../Services/Miniatures.service';
import { CollectionsService } from '../Services/Collections.service';
import { BatchesService } from '../Services/Batches.service';
import PropTypes from 'prop-types';

const CreateMiniatureModal = (props) => {
    const { openedModal, closedModal, toUpdate, dataToEdit } = props;

    const useEffectExecuted = useRef(false);
    const { CreateMiniatures, UpdateMiniatures } = MiniaturesService();
    const { GetAllCollections } = CollectionsService();
    const { GetAllBatches } = BatchesService();

    const [collections, setCollections] = useState([]);
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        if (useEffectExecuted.current) return;
        console.log(openedModal)
        if (openedModal == true) {
            console.log(dataToEdit)

            GetAllCollections()
                .then((data) => {
                    setCollections(data);
                })
                .catch(error => {
                    console.error('Failed to get collections:', error);
                });
            GetAllBatches()
                .then((data) => {
                    setBatches(data);
                })
                .catch(error => {
                    console.error('Failed to get batches:', error);
                });
            useEffectExecuted.current = true;
            if (dataToEdit != undefined) {
                setThuntChecked(dataToEdit.isThunt)
                setSuperThuntChecked(dataToEdit.isSuper)
            }
        }


    }, [openedModal])


    const SendData = (data) => {
        console.log(data)
        if (!toUpdate) {
            CreateMiniatures(data)
                .then(() => {
                    alert('Miniatura criada com sucesso!');
                })
                .catch(error => {
                    alert('Erro ao criar miniatura.\n' + error.message);
                });
            return;
        }
        UpdateMiniatures(data, dataToEdit.id)
            .then(() => {
                alert('Miniatura atualizada com sucesso!');
            })
            .catch(error => {
                alert('Erro ao atualizar miniatura.\n' + error.message);
            });

    }

    const [collectionIdForm, setCollectionIdForm] = useState('');
    const handleChangeCollectionId = (event) => {
        setCollectionIdForm(event.target.value);
    };
    const [loteIdForm, setLoteIdForm] = useState('');
    const handleChangeLoteId = (event) => {
        setLoteIdForm(event.target.value);
    };

    const [ThuntChecked, setThuntChecked] = useState(false);
    const handleChangeThunt = (event) => {
        setThuntChecked(event.target.checked);
    };

    const [SuperThuntChecked, setSuperThuntChecked] = useState(false);
    const handleChangeSuperThunt = (event) => {
        setSuperThuntChecked(event.target.checked);
    };

    const handleClose = () => {
        setCollectionIdForm('');
        setLoteIdForm('');
        setThuntChecked(false);
        setSuperThuntChecked(false);
        closedModal();
    };

    return (
        <>
            <Dialog
                sx={{ '& .MuiDialog-paper': { backgroundColor: '#545454', color: 'white' } }}
                open={openedModal}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        if (formJson.AcquisitionDate == '') {
                            alert('Preencha a data de aquisição');
                            return;
                        }
                        SendData(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle className='flex items-center justify-center'>
                    <span className='font-bold italic text-2xl'>Adicionar uma miniatura</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className='flex justify-center'>
                        <span className='text-white font-semibold pb-2'>
                            Preencha os campos abaixo para adicionar uma nova miniatura!
                        </span>
                    </DialogContentText>
                    <div className='flex flex-col'>
                        <TextField id="outlined-basic" label="Link da Imagem" variant="outlined" defaultValue={dataToEdit != undefined ? dataToEdit.image : ""} name='ImageUrl' helperText="Ex. https://i.ytimg.com/vi/ytj4SdZbzMw/maxresdefault.jpg" margin="dense" InputProps={{
                            style: { color: 'black' }
                        }} InputLabelProps={{ style: { color: 'white' } }} />

                        <TextField id="outlined-basic" label="Nome da miniatura" variant="outlined" defaultValue={dataToEdit != undefined ? dataToEdit.name : ""} name='Name' helperText="Ex. 87' Audi Quattro" margin="dense" required={true} InputProps={{
                            style: { color: 'black' }
                        }} InputLabelProps={{ style: { color: 'white' } }} />

                        <TextField id="outlined-basic" label="Descrição" variant="outlined" defaultValue={dataToEdit != undefined ? dataToEdit.description : ""} name='Description' helperText="Uma breve descrição dos detalhes (Opcional)." margin="dense" InputProps={{
                            style: { color: 'black' }, inputProps: { maxLength: 350 }
                        }} InputLabelProps={{ style: { color: 'white' } }} />
                        <div>
                            <FormControl fullWidth margin="dense" >
                                <InputLabel sx={{ color: 'white' }}>{
                                    dataToEdit != undefined ? dataToEdit.collectionName : 'Coleção'
                                }</InputLabel>
                                <Select
                                    required={true}
                                    name='CollectionId'
                                    defaultValue='9'
                                    value={collectionIdForm}
                                    label="Coleção"
                                    onChange={handleChangeCollectionId}
                                >
                                    {collections.map((collection) => (
                                        <MenuItem key={collection.Id} value={collection.Id}>{collection.Name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <span className='pl-4 text-[13px] text-[#262626]'>Selecione a coleção a que pertence</span>
                        </div>
                        <div>
                            <FormControl fullWidth margin="dense">
                                <InputLabel sx={{ color: 'white' }}>{
                                    dataToEdit != undefined ? dataToEdit.batchName : 'Lote'
                                }</InputLabel>
                                <Select
                                    required={true}
                                    name='BatchId'
                                    value={loteIdForm}
                                    label="Lote"
                                    onChange={handleChangeLoteId}
                                >
                                    {batches.map((batch) => (
                                        <MenuItem key={batch.Id} value={batch.Id}>{batch.Name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <span className='pl-4 text-[13px] text-[#262626]'>Selecione o lote a que pertence</span>
                        </div>
                        <div className='mt-2'>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <DatePicker className='w-full' format='YYYY-MM-DD' label={dataToEdit !== undefined ? dataToEdit.aquisitionDate : 'Data de Aquisição'} name='AcquisitionDate'
                                />
                            </LocalizationProvider>
                            <span className='pl-4 text-[13px] text-[#262626]'>A data em que você o adquiriu</span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span>T-Hunt: </span>
                            <Switch
                                checked={ThuntChecked}
                                value={ThuntChecked}
                                onChange={handleChangeThunt}
                                name='IsThunt'
                            />
                            <span className='text-[#262626] text-[13px]'>(Selecione se a sua miniatura for do tipo T-Hunt)</span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span>Super T-Hunt: </span>
                            <Switch
                                defaultChecked={dataToEdit != undefined ? dataToEdit.isSuper : SuperThuntChecked}
                                value={SuperThuntChecked}
                                onChange={handleChangeSuperThunt}
                                name='IsSuperThunt'
                            />
                            <span className='text-[#262626] text-[13px]'>(Selecione se a sua miniatura for do tipo Super T-Hunt)</span>
                        </div>

                    </div>

                </DialogContent>
                <DialogActions className='text-white'>
                    <div className='bg-red-400 p-2 rounded-full cursor-pointer'>
                        <a onClick={handleClose}>Cancelar</a>
                    </div>
                    <div className='bg-blue-400 p-2 rounded-full'>
                        <button type='submit' className='text-white'>{dataToEdit != undefined ? 'Atualizar' : 'Adicionar'}</button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

CreateMiniatureModal.propTypes = {
    openedModal: PropTypes.bool,
    closedModal: PropTypes.func,
    toUpdate: PropTypes.bool,
    dataToEdit: PropTypes.object,
}

export default CreateMiniatureModal;


