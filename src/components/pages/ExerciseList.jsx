import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
//import InjuryClassForm from './InjuryClassForm';
import ExerciseForm from './ExerciseForm';
import { useFormik } from "formik";
//import { InjuryPartValidationForm } from './Validationform';
// import axios from 'axios';
import PropTypes from "prop-types";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as Yup from 'yup';
const ExerciseNameValidation = Yup.object({
    exercisename: Yup.string().min(2).max(25).required("Please enter Exercise Name"),
   
       
  });

const ExerciseList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0)
    
    const [paginationPageSize, setPaginationPageSize] = useState(2);

    const initialValues = {
        exercisename : ""
    
      };

    
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
        validationSchema: ExerciseNameValidation,
        // onSubmit: (values, action) => {
        //     console.log(values);
        //     action.resetForm();
        //   },
        onSubmit: async (values, {resetForm}) => {
            console.log(values);
           try {
               const response = await axiosClientPrivate.post('/injury-parts', values);
               toast.success("Saved Successfully!",{
                   position:"top-center"
                }); 
                
                      // getting id(key,value) of last index
            //        const id = rowData[rowData.length-1].id;
            //        const obj = {
            //            id : id+1,
            //            ...values
            //        }
            //     console.log(obj);
            //     setRowData(rowData => [...rowData, obj]);

               console.log('Response:', response.data);
               setFetchTrigger(prev => prev+1);
               resetForm();
             } catch (error) {
               console.log(values);
               console.error('Error:', error);
             }
           },
      });



    // to delete a row
   const handleDeleteRow = async (id) => {
    alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/injury-parts/${id}`);
       setFetchTrigger(prev => prev+1);
    //    setRowData(prevData => prevData.filter(row => row.id !== id));
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

    // const pagination = true;
    // const paginationPageSize = 50;
    const pageSizeOptions = [50, 100, 200, 500];

    useEffect(() => {
        const controller = new AbortController();

        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get('http://localhost:8080/?page=0&size=20', { signal: controller.signal });
                const items = response.data.content;
                    // console.log(items);
                
                if (items.length > 0) {
                    const headerMappings = {
                        exercisename: "exercisename",
                      
                    };

                    const  columns = Object.keys(items[0]).map(key => ({
                        field: key,
                        headerexercisename: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                        filter: true,
                        floatingFilter: true,
                        sortable: true,
                        width: key === 'id' ? 100 : undefined,
                    }));

                    columns.unshift({
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

    const handleEdit = async (id) => {
        alert(id);
        try {
          const response = await axiosClientPrivate.get(`/injury-parts/${id}`);
            console.log(response.data);
            setFieldValue("id",response.data.id);
            setFieldValue("exercisename",response.data.exercisename);
            setFieldValue("lastModified", response.data.lastModified);
            setFieldValue("modifiedBy", response.data.modifiedBy);
            setId(id);
            setShowupdate(true);
            setOpenPopup(true);
        } catch (error) {
          console.error('Error fetching item for edit:', error);
        }
      };

      const handleUpdate = async (id)=> {
        alert(id);
        console.log(values);
        const update = values;
        try{
            //  console.log(values);
             await axiosClientPrivate.put(`/injury-parts/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             resetForm();
             setFetchTrigger(prev => prev+1);
            //  setRowData(rowData => [...rowData,values]);
        }
        catch(err){
            console.log("after:- ",values);
            console.log(err);
        }
      }

      const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [["Id","Exercise Name "]];
        const tableData = rowData.map(item => [
          item.id,
          item.exercisename,
        
          
          
        ]);
        doc.autoTable({
          head: header,
          body: tableData,
          startY: 20, 
          theme: 'grid', 
          margin: { top: 30 }, 
          styles: { fontSize: 5 },
          columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } }
      });
        doc.save("ExerciseForm.pdf");
    };


    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        
  
        const headerStyle = {
          alignment: { horizontal: 'center' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            id: 10,
            exercisename: 20,
           };
  
        sheet.columns = [
          { header: "Id", key: 'id', width: columnWidths.id, style: headerStyle },
          { header: "Exercise Name", key: 'exercisename', width: columnWidths.exercisename, style: headerStyle },
              
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                id: product.id,
                exercisename: product.exercisename,
              
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'ExerciseList.xlsx';
            anchor.click();
        })
    }


   
    return (
        <>
        <ToastContainer />
            <Box
                classexercisename="ag-theme-quartz" // applying the grid theme
                style={{ height: "110vh" }} // adjust width as necessary
            >

                <Stack sx={{ display: 'flex', flexDirection: 'row' }} marginY={1} paddingX={1}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }}>Add New</Button>
                        <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>
                    </ButtonGroup>

                </Stack>
                 {/*<AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    animateRows={true} // Optional: adds animation to row changes
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    Sx={{height:'100%',width: '100%'}}
                />*/}
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    animateRows={true} 
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={pageSizeOptions}
                    Sx={{height:'100%',width: '100%'}}
                    onPaginationChanged={(event) => {
                        setPaginationPageSize(event.api.paginationGetPageSize());
                        setIndex(event.api.paginationGetCurrentPage());
                    }}
                    
                    onFilterChanged={onFilterChanged}
                    // paginationNumberFormatter={paginationNumberFormatter}
                    // onGridReady={(params) => {
                    //     params.api.paginationGoToPage(currentPageIndex);
                    // }}
                    // paginationTotalRowCount = {200}
                    // paginationGetPageSize = {200}
                    
                />
            </Box>

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Master Exercise Form ">

                <ExerciseForm values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default ExerciseList;