import { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { MiniaturesService } from '../Services/Miniatures.service';
import CreateMiniatureModal from './Modal';
import Typography from '@mui/material/Typography';

import SettingsIcon from '@mui/icons-material/Settings';

export default function CustomizedDialogs(props) {
    const useEffectExecuted = useRef(false);
    const { openedModal, closedModal, miniaturesInfo } = props;
    const close = () => {
        closedModal();
        setDeleteConfirmation(false);
    }

    useEffect(() => {
        if (useEffectExecuted.current) return;
        formatDate(miniaturesInfo.aquisitionDate);
        useEffectExecuted.current = true;
    }, [])

    const { DeleteMiniatures } = MiniaturesService();
    function DeleteCar(carId) {
        DeleteMiniatures(carId)
            .then(() => {
                alert('Miniature deleted successfully');
                close();
            })
            .catch((error) => {
                alert('Error deleting miniature:' + error);
            })
    }
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const handleDeleteConfirmation = () => {
        setDeleteConfirmation(true);
    }
    const cancelDeleteConfirmation = () => {
        setDeleteConfirmation(false);
    }
    const [openedEditModal, setOpenedEditModal] = useState(false);
    const openEditModal = () => {
        setOpenedEditModal(true);
    }
    const closeEditModal = () => {
        setOpenedEditModal(false);
    }

    const [openSettings, setOpenSettings] = useState(false);
    const handleOpenSettings = () => {
        setOpenSettings(!openSettings);
        setDeleteConfirmation(false);
    }
    const [formattedDate, setFormattedDate] = useState('');
    const formatDate = (date) => {
        const originalDate = new Date(date);
        originalDate.setDate(originalDate.getDate() + 1);
        const formatted = originalDate.toLocaleDateString('pt-BR');
        setFormattedDate(formatted);
    }

    const headerColor = miniaturesInfo.isSuper ? 'bg-gradient-to-r from-[#E6C719] to-[#806F0E]' : miniaturesInfo.isThunt ? 'bg-gradient-to-r from-[#8A2BE3] to-[#4C187D]' : 'bg-gradient-to-r from-[#838383] to-[#464343]';
    const contentColor = miniaturesInfo.isSuper ? '#ECDD88' : miniaturesInfo.isThunt ? '#AE73E6' : '#ADADAD';
    const rarity = miniaturesInfo.isThunt ? 'T-Hunt' : miniaturesInfo.isSuper ? 'Super T-Hunt' : 'Comum';

    return (
        <>

            <Dialog
                onClose={close}
                open={openedModal}
                fullWidth={false}
                maxWidth='md'
            >

                <DialogTitle sx={{ }} className={headerColor}>
                    <span className='text-2xl font-black italic uppercase'>{miniaturesInfo.name}</span>
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={close}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <IconButton
                    aria-label="options"
                    onClick={handleOpenSettings}
                    sx={{
                        position: 'absolute',
                        right: 50,
                        top: 11,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <SettingsIcon />
                </IconButton>
                <DialogContent sx={{ backgroundColor: contentColor }} dividers className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-between w-full'>
                        <div className='flex flex-col'>
                            <span className='font-bold text-lg'>Número da miniatura</span>
                            <span>{miniaturesInfo.number}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold text-lg'>Coleção</span>
                            <span>{miniaturesInfo.collectionName}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold text-lg'>Lote</span>
                            <span>{miniaturesInfo.batch.Name}/{miniaturesInfo.batch.ReleaseYear}</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-bold text-lg'>Raridade</span>
                            <span className={rarity == 'Super T-Hunt' ? 'bg-gradient-to-r from-[#E6C719] to-[#806F0E] bg-clip-text text-transparent font-black' : rarity == 'T-Hunt' ? 'bg-gradient-to-r from-[#8A2BE3] to-[#4C187D] bg-clip-text text-transparent font-black' : 'bg-gradient-to-r from-[#838383] to-[#464343] bg-clip-text text-transparent font-black'}>{rarity}</span>
                        </div>
                    </div>
                    <Typography sx={{ maxWidth: 600, minWidth: 600 }}>
                        {miniaturesInfo.description}
                    </Typography>
                    <div className='flex gap-2 items-center justify-end'>
                        <span className='font-bold'>Adquirido em</span>
                        <span className='text-md'>{formattedDate}</span>
                    </div>
                </DialogContent>
                {
                    openSettings && <DialogActions className={headerColor}>
                        <div className='flex flex-row bg-[#4169e0] p-3 rounded-full text-white text-sm hover:bg-gray-400 transition ease-in-out'>
                            <button onClick={openEditModal}>
                                <EditIcon />
                            </button>
                        </div>
                        <div className='flex flex-row bg-red-500 p-3 rounded-full text-white text-sm hover:bg-red-600 transition ease-in-out'>
                            <button onClick={handleDeleteConfirmation}>
                                <DeleteIcon />
                            </button>
                        </div>
                    </DialogActions>
                }

                {deleteConfirmation ?
                    <div className='pl-6 pb-2 pt-2 flex flex-row items-center gap-2 pr-3 justify-center bg-rose-100'>
                        <span className='font-semibold text-md'>
                            Deseja realmente excluir essa miniatura?
                        </span>
                        <div className='flex flex-row gap-1'>
                            <button className='flex items-center bg-red-500 p-2 rounded-full' onClick={cancelDeleteConfirmation}>
                                <CloseIcon />
                            </button>
                            <button className='flex items-center bg-green-500 p-2 rounded-full' onClick={() => DeleteCar(miniaturesInfo.id)}>
                                <CheckIcon />
                            </button>
                        </div>
                    </div> : null
                }
            </Dialog>
            <CreateMiniatureModal openedModal={openedEditModal} closedModal={closeEditModal} toUpdate={true} dataToEdit={props.miniaturesInfo} />
        </>
    );
}

CustomizedDialogs.propTypes = {
    openedModal: PropTypes.bool.isRequired,
    closedModal: PropTypes.func.isRequired,
    miniaturesInfo: PropTypes.object.isRequired,
};

