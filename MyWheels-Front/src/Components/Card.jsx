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

    const color = props.isSuper ? 'bg-gradient-to-r from-[#E6C719] to-[#806F0E]' : props.isThunt ? 'bg-gradient-to-r from-[#8A2BE3] to-[#4C187D]' : 'bg-gradient-to-r from-[#838383] to-[#464343]';

    return (
        <div className='relative z-0'>
            <div className='z-10 bg-[#575961] w-[50px] min-h-[50px] absolute top-[-20px] right-[-20px] rounded-full flex items-center justify-center'>
                <span className='font-black text-lg text-white'>{props.number}</span>
            </div>
            {
                props.isSuper && <div className='absolute z-10 p-2'>
                    <img src="../../public/SuperThuntLogo.png" alt="" width={30} />
                </div>
            }
            {
                props.isThunt && <div className='absolute z-10 p-2'>
                    <img src="../../public/ThuntLogo.png" alt="" width={30} />
                </div>
            }

            <Card sx={{ maxWidth: 280, minWidth: 280, borderRadius: '0.6rem', position: 'relative', maxHeight: 240}} className={color}>
                <CardActionArea onClick={handleOpenModal}>
                    <div className='w-full flex items-center justify-center'>
                        <CardMedia
                            component="img"
                            sx={{ maxHeight: 160, minHeight: 160, objectFit: 'cover', objectPosition: 'center' }}
                            image={props.image ? props.image : '../../public/testeImagePPP.jpg'}
                            alt=""
                        />
                    </div>

                    <CardContent sx={{ padding: 0}}>
                        <Typography className=''>
                            <div className='flex items-center justify-center shadow-xl'>
                                <h1 className='text-xl font-black text-center uppercase p-2'>{props.displayName}</h1>
                            </div>
                        </Typography>
                        <Typography className='flex flex-row justify-center items-end pt-2' sx={{ paddingBottom: 0.5 }}>
                            <div className='flex w-[90%] justify-between'>
                                <h2 className='font-bold text-sm italic'>
                                    {props.collectionName}
                                </h2>
                                <h2 className='font-bold text-sm uppercase italic'>
                                    {props.batch.Name}/{props.batch.ReleaseYear.slice(2, 4)}
                                </h2>
                            </div>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CustomizedDialogs openedModal={openModal} closedModal={handleCloseModal} miniaturesInfo={props} />
            </Card>
        </div>
    );
}
export default MiniatureCard;

MiniatureCard.propTypes = {
    number: PropTypes.number.isRequired,
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