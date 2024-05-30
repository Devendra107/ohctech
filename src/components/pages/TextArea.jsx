import {TextField} from '@mui/material'
import PropTypes from 'prop-types';

 const TextArea = ({type,onBlur,onChange,value,helperText,label,name,size}) => {

  TextArea.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']).isRequired,
    values: PropTypes.object,
    touched: PropTypes.object,
    errors: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    setFieldValue: PropTypes.func,
    handleSubmit: PropTypes.func,
    label:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    value:PropTypes.oneOfType([PropTypes.string,PropTypes.number]),
    type:PropTypes.node.isRequired,
    helperText: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.oneOf([null])
    ]),
  }

  return (
    <TextField
     sx={{ width: "250px" }}
     id="outlined-basic"
     label={label}
     name={name}
     type={type}
     size={size}
     variant="outlined"
     value={value}
     onChange={onChange}
     onBlur={onBlur}
     helperText={helperText}
     multiline
    minRows={2}
    maxRows={Infinity}
    />
  )
}

//  const TextArea = ()=> {
//   return (
//     <TextField
//   placeholder="Enter TextArea"
//   multiline
//   minRows={2}
//   maxRows={Infinity}
// />
//   )
// }

export default TextArea;