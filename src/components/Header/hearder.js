import {
    Box,
} from "./HeaderStyles";

import logo from './../../assets/images/logo-transparent.png';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
export default function Header(){
    return(
       <Box>
         <img style={{objectFit: 'contain'}} src={logo} alt="logo" width={180} height={60}/>
         <HelpOutlineOutlinedIcon  style={{padding: '0px 70px', fontSize: '30px', color: '#3085C3'}}/>
       </Box>
    );
}