import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import CustomizedDialogs from './ModalDetails';

const MiniatureCard = (props) => {
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <>
            <Card sx={{ maxWidth: 280, minWidth: 280, backgroundColor: '#d9d9d9', borderRadius: '0.6rem', position: 'relative'}}>
                <CardActionArea onClick={handleOpenModal}>
                    <div className='w-full flex items-center justify-center'>
                        <CardMedia
                            component="img"
                            sx={{ maxHeight: 160, objectFit: 'cover', objectPosition: 'center' }}
                            image={props.image}
                            alt=""
                        />
                    </div>

                    <CardContent sx={{ padding: 0 }}>
                        <Typography className=''>
                            <div className='flex items-center justify-center'>
                                <h1 className='text-xl font-bold text-center uppercase p-2'>{props.displayName}</h1>
                            </div>
                        </Typography>
                        <Typography className='flex flex-row justify-center' sx={{ paddingBottom: 0.5 }}>
                            <div className='flex w-[90%] justify-between'>
                                <h2 className='font-semibold text-sm italic'>
                                    {props.collectionName}
                                </h2>
                                <h2 className='font-semibold text-sm uppercase italic'>
                                    {props.batch.Name}/{props.batch.ReleaseYear.slice(2, 4)}
                                </h2>
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CustomizedDialogs openedModal={openModal} closedModal={handleCloseModal} miniaturesInfo={props} />
            </Card>
        </>
    );
}
export default MiniatureCard;

MiniatureCard.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    description: PropTypes.string,
    collectionName: PropTypes.string.isRequired,
    batch: PropTypes.object.isRequired,
    aquisitionDate: PropTypes.string.isRequired,
    isThunt: PropTypes.bool.isRequired,
    isSuper: PropTypes.bool.isRequired,
};