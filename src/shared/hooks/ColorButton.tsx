import { styled as muiStyled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import Button from '@mui/material/Button';
const ColorButton = muiStyled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: "#344e41",
    borderRadius: '25px',
    color:"white",
    height:50,
    width: 300,
    '&:hover': {
      backgroundColor: "#a3b18a",
    },
    '&:active': {
      backgroundColor: '#2c3e33', 
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#a3b18a', 
    },
  }));

  export default ColorButton;