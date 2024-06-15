
import { FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";
import SingleSelect from "../common/SingleSelect";


const ComplaintForm = ({
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  // setFieldValue,
  handleSubmit,
}) => {
  ComplaintForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  const active = ["Yes", "No"];
  

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{width:300}}>
        
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Enter the Complaint"
                    name="complaint"
                    type="text"
                    size="large"
                    value={values.complaint}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.complaint && touched.complaint ? (
                        <span style={{ color: "red" }}>{errors.complaint}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Enter the Complaint Details"
                    name="complaintDesc"
                    type="text"
                    size="large"
                    value={values.complaintDesc}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.complaintDesc && touched.complaintDesc ? (
                        <span style={{ color: "red" }}>
                          {errors.complaintDesc}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
              
      
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <SingleSelect
                    arr={active}
                    label="Is Active"
                    name="isActive"
                    value={values.isActive}
                    onChange={(event, newValue) => {
                      const syntheticEvent = {
                        target: {
                          name: "isActive",
                          value: newValue,
                        },
                      };
                      handleChange(syntheticEvent);
                    }}
                    onBlur={handleBlur}
                    type="text"
                    helperText={
                      errors.isActive && touched.isActive ? (
                        <span style={{ color: "red" }}>{errors.isActive}</span>
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

export default ComplaintForm;

