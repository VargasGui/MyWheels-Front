import DirectionsCarIcon from '@mui/icons-material/DirectionsCarOutlined';
import GroupWorkIcon from '@mui/icons-material/GroupWorkOutlined';
import InventoryIcon from '@mui/icons-material/Inventory2Outlined';
import HelpIcon from '@mui/icons-material/HelpOutline';
import { CommonMenu } from '../../Components/Menu';


function Navbar() {
    return (
        <div className="bg-[#545454] h-[12vh] border-b-2 border-black flex justify-between">
            <div className="flex items-center pl-4 w-[62%]">
                <div className="pr-2">
                    <img src="../../../public/Logo.png" width={60} height={60} />
                </div>
                <p className="text-3xl font-semibold text-white italic font-sans cursor-default">MyWheels</p>
            </div>
            <div className="w-[38%] flex items-center">
                <ul className="flex">
                    <li className="text-white text-md italic font-semibold px-4 flex items-center gap-1 hover:text-blue-400">
                        <DirectionsCarIcon fontSize='small' />
                        <a href='/miniatures'>Miniaturas</a>
                    </li>
                    <li className="text-white text-md italic font-semibold px-4 flex items-center gap-1 hover:text-blue-400">
                        <GroupWorkIcon fontSize='small' />
                        <a href='#'>Coleções</a>
                    </li>
                    <li className="text-white text-md italic font-semibold px-4 flex items-center gap-1 hover:text-blue-400">
                        <InventoryIcon fontSize='small' />
                        <a href='#' className=''>Lotes</a>
                    </li>
                    <li className="text-white text-md italic font-semibold px-4 flex items-center gap-1 pl-10">
                        <HelpIcon fontSize='small' />
                        <div className='ml-[-7px] pt-[2px] flex items-center '>
                            <CommonMenu title={"Infos"} item1={"-- O que é uma miniatura T-Hunt ou Super T-Hunt?"} item2={"-- Tudo que você precisa saber para uma boa coleção"} item3={"-- Sobre nós"}/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;



{/* <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ backgroundColor: 'transparent', color: 'white', fontStyle: 'italic', fontFamily: 'sans-serif', fontWeight: 600}}
                            >
                                Infos
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                style={{ padding: 0}}
                            >
                                <MenuItem onClick={handleClose}>-- O que é uma miniatura T-Hunt ou Super T-Hunt?</MenuItem>
                                <MenuItem onClick={handleClose}>-- Tudo que você precisa saber para uma boa coleção</MenuItem>
                                <MenuItem onClick={handleClose}>-- Sobre nós</MenuItem>
                            </Menu> */}