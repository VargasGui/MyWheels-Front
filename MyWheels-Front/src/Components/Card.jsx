import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';

const MiniatureCard = (props) => {
    return (
        <Card sx={{ maxWidth: 280, backgroundColor: '#e0e0e0', borderRadius: '0.5 rem'}}>
            <CardActionArea>
                <div className='w-full flex items-center justify-center'>
                    <div className='w-[80%] mt-3'>
                        <CardMedia className='rounded-lg'
                            component="img"
                            height="140"
                            image= {props.image}
                            alt=""
                        />
                    </div>

                </div>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        <span>Desc: {props.description}</span>
                        <span>CollecName: {props.collectionName}</span>
                        <span>BatchName: {props.batchName}</span>
                        <span>AqcDate: {props.aquisitionDate}</span>
                        <span>Thunt: {props.isThunt ? "true" : "false"}</span>
                        <span>Super: {props.isSuper ? "true" : "false"}</span>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default MiniatureCard;

MiniatureCard.propTypes = {
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    collectionName: PropTypes.string.isRequired,
    batchName: PropTypes.string.isRequired,
    aquisitionDate: PropTypes.string.isRequired,
    isThunt: PropTypes.bool.isRequired,
    isSuper: PropTypes.bool.isRequired,
  };