import { styled as muiStyled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
const ColorButton = muiStyled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "#2959a5",
    borderRadius: '25px',
    color:"white",
    height:50,
    width: 300,
    '&:hover': {
      backgroundColor: "#a3b18a",
    },
    '&:active': {
      backgroundColor: '#7ac297', 
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#7ac297', 
    },
  }));

  export default ColorButton;