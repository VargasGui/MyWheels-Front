import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { MiniaturesService } from '../Services/Miniatures.service';
import CreateMiniatureModal from './Modal';


export default function CustomizedDialogs(props) {

    const { openedModal, closedModal, miniaturesInfo } = props;
    const close = () => {
        closedModal();
        setDeleteConfirmation(false);
    }

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
    const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);

    const handleDeleteConfirmation = () => {
        setDeleteConfirmation(true);
    }
    const cancelDeleteConfirmation = () => {
        setDeleteConfirmation(false);
    }
    const [openedEditModal, setOpenedEditModal] = React.useState(false);
    const openEditModal = () => {
        setOpenedEditModal(true);
    }
    const closeEditModal = () => {
        setOpenedEditModal(false);
    }



    return (
        <React.Fragment>

            <Dialog
                onClose={close}
                open={openedModal}
            >
                <DialogTitle className=''>
                    <span className='text-xl font-bold italic'>{miniaturesInfo.name}</span>
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
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <div className='flex flex-row bg-blue-400 p-3 rounded-full text-white text-sm hover:bg-gray-400 transition ease-in-out'>
                        <button onClick={openEditModal}>
                            <EditIcon />
                        </button>
                    </div>
                    <div className='flex flex-row bg-blue-400 p-3 rounded-full text-white text-sm hover:bg-gray-400 transition ease-in-out'>
                        <button onClick={handleDeleteConfirmation}>
                            <DeleteIcon />
                        </button>
                    </div>
                </DialogActions>
                {deleteConfirmation ?
                    <div className='pl-6 pb-2 pt-2 flex flex-row items-center gap-2 pr-3 justify-center bg-gray-200'>
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
            <CreateMiniatureModal openedModal={openedEditModal} closedModal={closeEditModal} toUpdate={true} dataToEdit={props.miniaturesInfo}/>
        </React.Fragment>
    );
}

CustomizedDialogs.propTypes = {
    openedModal: PropTypes.bool.isRequired,
    closedModal: PropTypes.func.isRequired,
    miniaturesInfo: PropTypes.object.isRequired,
};

