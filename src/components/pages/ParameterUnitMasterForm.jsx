import { FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";
import SingleSelect from "../common/SingleSelect";

const ParameterUnitMasterForm = ({
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  // setFieldValue,
  handleSubmit,
}) => {
    ParameterUnitMasterForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

 //const itemtypeselect=["Capital/non consumeble instruments","other"]
 //const itemnameSelect=["Active","Not Active"]
 //const itemSelect=["Yes","No"]
 
 return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center"  sx={{ width: 320 }} >
        
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Unit  Name"
                    name="unitname"
                    type="text"
                    size="large"
                    value={values.unitname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.unitname && touched.unitname ? (
                        <span style={{ color: "red" }}>{errors.unitname}</span>
                      ) : null
                    }
                  />
                </Grid>
               
                
            
              </Grid>
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default ParameterUnitMasterForm;

  