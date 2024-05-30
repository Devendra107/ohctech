import { FormControl, Grid } from "@mui/material";
import PropTypes from "prop-types";
import Input from "../common/Input";

const InjuryPartForm = ({
  values,
  touched,
  handleBlur,
  errors,
  handleChange,
  // setFieldValue,
  handleSubmit,
}) => {

  InjuryPartForm.propTypes = {
    values: PropTypes.object.isRequired,
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}    justifyContent="center" alignItems="center" sx={{width:300}}>
          
          <Grid item xs={12}  justifyContent="center" alignItems="center">
            <FormControl fullWidth>
              <Grid container spacing={2}  justifyContent="center" alignItems="center">
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Enter Injury part Name"
                    name="name"
                    type="text"
                    size="large"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.name && touched.name? (
                        <span style={{ color: "red" }}>{errors.name}</span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Enter Injury part Description"
                    name="description"
                    type="text"
                    size="large"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.description && touched.description ? (
                        <span style={{ color: "red" }}>
                          {errors.description}
                        </span>
                      ) : null
                    }
                  />
                </Grid>
                <Grid item xs={12}  container spacing={1} justifyContent="center" alignItems="center">
                  <Input
                    label="Enter Injury part Code"
                    name="code"
                    type="text"
                    size="large"
                    value={values.code}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.code && touched.code ? (
                        <span style={{ color: "red" }}>{errors.code}</span>
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

export default InjuryPartForm;

