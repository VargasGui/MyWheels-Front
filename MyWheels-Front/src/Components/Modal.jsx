import * as React from 'react';
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

const CreateMiniatureModal = () => {
    const [collectionIdForm, setCollectionIdForm] = React.useState('');
    const handleChangeCollectionId = (event) => {
        setCollectionIdForm(event.target.value);
    };
    const [loteIdForm, setLoteIdForm] = React.useState('');
    const handleChangeLoteId = (event) => {
        setLoteIdForm(event.target.value);
    };

    const [ThuntChecked, setThuntChecked] = React.useState(false);
    const handleChangeThunt = (event) => {
        setThuntChecked(event.target.checked);
    };

    const [SuperThuntChecked, setSuperThuntChecked] = React.useState(false);
    const handleChangeSuperThunt = (event) => {
        setSuperThuntChecked(event.target.checked);
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <div className='bg-blue-400  inline-block rounded-full'>
                <Button onClick={handleClickOpen}>
                    <AddIcon className='text-white' />
                </Button>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        console.log(formJson);
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
                        <TextField id="outlined-basic" label="Nome da miniatura" variant="outlined" name='Name' helperText="Ex. 87' Audi Quattro" margin="dense" />
                        <TextField id="outlined-basic" label="Descrição" variant="outlined" name='Description' helperText="Uma breve descrição dos detalhes. (Opcional)" margin="dense" />
                        <div>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Coleção</InputLabel>
                                <Select
                                    name='CollectionId'
                                    value={collectionIdForm}
                                    label="Coleção"
                                    onChange={handleChangeCollectionId}
                                >
                                    <MenuItem value={'10'}>Col 1</MenuItem>
                                    <MenuItem value={'20'}>Col 2</MenuItem>
                                    <MenuItem value={'30'}>Col 3</MenuItem>
                                </Select>
                            </FormControl>
                            <span className='pl-4 text-[13px] text-gray-500'>Selecione a coleção a que pertence</span>
                        </div>
                        <div>
                            <FormControl fullWidth margin="dense">
                                <InputLabel>Lote</InputLabel>
                                <Select
                                    name='LoteId'
                                    value={loteIdForm}
                                    label="Lote"
                                    onChange={handleChangeLoteId}
                                >
                                    <MenuItem value={'10'}>Lote 1</MenuItem>
                                    <MenuItem value={'20'}>Lote 2</MenuItem>
                                    <MenuItem value={'30'}>Lote 3</MenuItem>
                                </Select>
                            </FormControl>
                            <span className='pl-4 text-[13px] text-gray-500'>Selecione a coleção a que pertence</span>
                        </div>
                        <div className='mt-2 '>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker format='YYYY-MM-DD' label="Data de aquisição" name='AcquisitionDate' onChange={(newValue) => console.log(newValue)} />
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
                                inputProps={{ 'aria-label': 'controlled' }}
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
                                inputProps={{ 'aria-label': 'controlled' }}
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
        </React.Fragment>
    );
}

export default CreateMiniatureModal;
