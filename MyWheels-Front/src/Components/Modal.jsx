import { React, useRef, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
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
    const { openedModal, closedModal } = props;
    const useEffectExecuted = useRef(false);
    const { CreateMiniatures } = MiniaturesService();
    const { GetAllCollections } = CollectionsService();
    const { GetAllBatches } = BatchesService();

    const [collections, setCollections] = useState([]);
    const [batches, setBatches] = useState([]);
    useEffect(() => {
        if (useEffectExecuted.current) return;
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
    }, [])

    const SendDataToCreateMiniatures = (data) => {
        CreateMiniatures(data)
            .then(() => {
                alert('Miniatura criada com sucesso!');
            })
            .catch(error => {
                alert('Erro ao criar miniatura.\n' + error.message);
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

    // const [open, setOpen] = React.useState(false);
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    const handleClose = () => {
        setCollectionIdForm('');
        setLoteIdForm('');
        setThuntChecked(false);
        setSuperThuntChecked(false);
        closedModal();
    };

    return (
        <>
            {/* <div className='bg-blue-400  inline-block rounded-full'>
                <Button onClick={handleClickOpen}>
                    <AddIcon className='text-white' />
                </Button>
            </div> */}

            <Dialog
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
                        SendDataToCreateMiniatures(formJson);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Adicionar uma miniatura</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Preencha os campos abaixo para adicionar uma nova miniatura!
                    </DialogContentText>
                    <div className='flex flex-col'>
                        <TextField id="outlined-basic" label="Link da Imagem" variant="outlined" name='ImageUrl' helperText="Ex. https://i.ytimg.com/vi/ytj4SdZbzMw/maxresdefault.jpg" margin="dense" />
                        <TextField id="outlined-basic" label="Nome da miniatura" variant="outlined" name='Name' helperText="Ex. 87' Audi Quattro" margin="dense" required={true} />
                        <TextField id="outlined-basic" label="Descrição" variant="outlined" name='Description' helperText="Uma breve descrição dos detalhes. (Opcional)" margin="dense" />
                        <div>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Coleção</InputLabel>
                                <Select
                                    required={true}
                                    name='CollectionId'
                                    value={collectionIdForm}
                                    label="Coleção"
                                    onChange={handleChangeCollectionId}
                                >
                                    {collections.map((collection) => (
                                        <MenuItem key={collection.Id} value={collection.Id}>{collection.Name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <span className='pl-4 text-[13px] text-gray-500'>Selecione a coleção a que pertence</span>
                        </div>
                        <div>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Lote</InputLabel>
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
                            <span className='pl-4 text-[13px] text-gray-500'>Selecione a coleção a que pertence</span>
                        </div>
                        <div className='mt-2 '>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker format='YYYY-MM-DD' label="Data de aquisição" name='AcquisitionDate' />
                                </DemoContainer>
                            </LocalizationProvider>
                            <span className='pl-4 text-[13px] text-gray-500'>A data em que você o adquiriu</span>
                        </div>


                        <div className='flex flex-row items-center'>
                            <span>T-Hunt: </span>
                            <Switch
                                checked={ThuntChecked}
                                value={ThuntChecked}
                                onChange={handleChangeThunt}
                                name='IsThunt'
                            />
                            <span className='text-gray-500 text-[13px]'>(Selecione se a sua miniatura for do tipo T-Hunt)</span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <span>Super T-Hunt: </span>
                            <Switch
                                checked={SuperThuntChecked}
                                value={SuperThuntChecked}
                                onChange={handleChangeSuperThunt}
                                name='IsSuperThunt'
                            />
                            <span className='text-gray-500 text-[13px]'>(Selecione se a sua miniatura for do tipo Super T-Hunt)</span>
                        </div>

                    </div>

                </DialogContent>
                <DialogActions className='text-white'>
                    <div className='bg-red-400 p-2 rounded-full cursor-pointer'>
                        <a onClick={handleClose}>Cancelar</a>
                    </div>
                    <div className='bg-blue-400 p-2 rounded-full'>
                        <button type='submit' className='text-white'>Adicionar</button>
                    </div>
                </DialogActions>
            </Dialog>
        </>
    );
}

CreateMiniatureModal.propTypes = {
    openedModal: PropTypes.bool,
    closedModal: PropTypes.func,
}

export default CreateMiniatureModal;


