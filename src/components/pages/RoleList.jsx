import {AgGridReact} from 'ag-grid-react';
import { Box, Button, Stack, ButtonGroup } from "@mui/material";
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import  {roleValidationForm}  from './Validationform';
import Popup from "./Popup";
import RoleForm from './RoleForm';
import { useFormik } from "formik";
import { useState,useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from "prop-types";

const RoleList = () => {

    const [id,setId] = useState(1);
    const [showupdate,setShowupdate] = useState(false);
    const [fetchTrigger, setFetchTrigger] = useState(0);


  const initialValues = {
    id:"",
    roleName: "",
    roleDescription: "",
    roleHomePage: "",
    roleCode: "",
    iconColor: "",
    iconText: "",

    // lastModified: "",
    // modifiedBy: ""
  };


  const axiosClientPrivate = useAxiosPrivate();

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    // validationSchema: roleValidationForm,
    // onSubmit: (values, action) => {
    //   console.log(values);
    //   action.resetForm();
    // },
    onSubmit: async (values, {resetForm}) => {
      try {
           await axiosClientPrivate.post('/roles', values);
          toast.success("Saved Successfully!",{
            position:"top-center"
         });
          // setRowData(prevRowData => [...prevRowData, values]);
          setFetchTrigger(prev => prev+1);

          resetForm();
        } catch (error) {
          console.log(values);
          console.error('Error:', error);
        }
      },


  });

  

  const [rowData, setRowData] = useState([]);

  const [colDefs, setColDefs] = useState([]);

  const [openPopup, setOpenPopup] = useState(false);


  const handleEdit = async (id) => {
    alert(id);
    try {
      const response = await axiosClientPrivate.get(`/roles/${id}`);
        // console.log(response.data);
        // console.log(response.data.id);
        setFieldValue("id",response.data.id);
        setFieldValue("roleName",response.data.roleName);
        setFieldValue("roleDescription",response.data.roleDescription);
        setFieldValue("roleHomePage",response.data.roleHomePage);
        setFieldValue("roleCode", response.data.roleCode);
        setFieldValue( "iconColor", response.data.iconColor);
        setFieldValue("iconText", response.data.iconText);
        // console.log(values.id);
      setId(id);
      setShowupdate(true);
      setOpenPopup(true);
    } catch (error) {
      console.error('Error fetching item for edit:', error);
    }
  };


  const handleUpdate = async (id)=> {
    alert(id);
    // const update = values;
    try{
         console.log(values);
        //  setFieldValue("id",id);
         await axiosClientPrivate.put(`/roles/${id}`,values);
         toast.success("Updated Successfully!",{
          position:"top-center",
          autoClose: 3000,
       });
        
         resetForm();
         setFetchTrigger(prev => prev+1);

    }
    catch(err){
        console.log(err);
    }
  }


  //   // to fetch data
  //   useEffect(() => {
  //     const controller = new AbortController();

  //     const getAllOhc = async () => {
  //         try {
  //             const response = await axiosClientPrivate.get('roles', { signal: controller.signal });
  //             const items = response.data;
  //                 console.log(items);
              
  //             if (items.length > 0) {
  //                 // columns.push({
  //                 //     // field: "Actions", cellRenderer: CustomActionComponent
  //                 //     field: "Actions", cellRenderer:  (params) =>{
  //                 //         const id = params.data.id;
  //                 //         return <CustomActionComponent id={id} />
  //                 //     }
  //                 // });

  //                 const columns = Object.keys(items[0]).map(key => ({
  //                     field: key,
  //                     headerName: key.charAt(0).toUpperCase() + key.slice(1),
  //                     filter: true,
  //                     floatingFilter: true,
  //                     sortable: true
  //                 }));

  //                 columns.unshift({
  //                     // field: "Actions", cellRenderer: CustomActionComponent
  //                     field: "Actions", cellRenderer:  (params) =>{
  //                         const id = params.data.id;
  //                         return <CustomActionComponent id={id} />
  //                     }
  //                 });

  //                 setColDefs(columns);
  //             }

  //             setRowData(items);

  //         } catch (err) {
  //             console.error("Failed to fetch data: ", err);
  //             setRowData([]);
  //         }
  //     };

  //     getAllOhc();

  //     return () => {
  //         controller.abort();
  //     };

  // }, []);


    //  to delete a row
     const handleDeleteRow = async (id) => {
      alert(id)
     if(window.confirm('Are you sure you want to delete this data?')){
     try {
         await axiosClientPrivate.delete(`/roles/${id}`);
        //  setRowData(prevData => prevData.filter(row => row.id !== id));
        setFetchTrigger(prev => prev+1);

     } catch (error) {
         console.error('Error deleting row:', error);
     }
 }
 };



  
 const CustomActionComponent = ({id}) => {
  CustomActionComponent.propTypes = {
      id: PropTypes.number.isRequired,
    };
  return <div> <Button onClick={() =>  handleEdit(id)} > <EditNoteRoundedIcon /></Button>
     <Button color="error" onClick={() => handleDeleteRow(id)}> <DeleteSweepRoundedIcon /> </Button> </div>

};

const pagination = true;
const paginationPageSize = 50;
const paginationPageSizeSelector = [50, 100, 200, 500];

useEffect(() => {
    const controller = new AbortController();

    const getAllOhc = async () => {
        try {
            const response = await axiosClientPrivate.get('roles', { signal: controller.signal });
            const items = response.data.content;

            if (items.length > 0) {

                const headerMappings = {
                        id: "id",
                        roleName : "roleName",
                        roleDescription : "roleDescription",
                        roleHomePage : "roleHomePage",
                        roleCode : "roleCode",
                        iconColor : "iconColor",
                        iconText : "iconText",
                    };

                   const  columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                        filter: true,
                        floatingFilter: true,
                        sortable: true,
                        width: key === 'id' ? 100 : undefined,
                    }));

                columns.unshift({
                  // field: "Actions", cellRenderer: CustomActionComponent
                  field: "Actions", cellRenderer:  (params) =>{
                      const id = params.data.id;
                      return <CustomActionComponent id={id} />
                  }
              });

                setColDefs(columns);
            }

            setRowData(items);

        } catch (err) {
            console.error("Failed to fetch data: ", err);
            setRowData([]);
        }
    };

    getAllOhc();

    return () => {
        controller.abort();
    };

}, [fetchTrigger]);

  return (
    <>
    <ToastContainer />
      <Box
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // adjust width as necessary
      >
        <Stack
          sx={{ display: "flex", flexDirection: "row" }}
          marginY={1}
          paddingX={1}
        >
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button
              variant="contained"
              endIcon={<AddCircleOutlineRoundedIcon />}
              onClick={() => {
                setOpenPopup(true);
              }}
            >
              Add New
            </Button>
            <Button
              variant="contained"
              color="success"
              endIcon={<ImportExportRoundedIcon />}
            >
              Export Data
            </Button>
          </ButtonGroup>
        </Stack>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            animateRows={true} // Optional: adds animation to row changes
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
       />
      </Box>

      <Popup
        handleUpdate = {handleUpdate}
        id= {id}
        setShowupdate={setShowupdate}
        showupdate={showupdate}
        resetForm={resetForm}
        handleSubmit={handleSubmit}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Fill The Details To Add New Role"
      >
        <RoleForm
          values={values}
          touched={touched}
          errors={errors}
          handleBlur={handleBlur}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
        />
      </Popup>
    </>
  );
};

export default RoleList;
