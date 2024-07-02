import { Box, Button, ButtonGroup, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import useAxiosPrivate from '../../utils/useAxiosPrivate';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
// import ImportExportRoundedIcon from '@mui/icons-material/ImportExportRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Popup from './Popup';
//import { sectionForm } from './Validationform';
import { useFormik } from "formik";
// import { WidthFull } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import ExcelJS from 'exceljs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import PropTypes from "prop-types";
// import * as Yup from 'yup';
import FoodNutritionMappingForm from './FoodNutritionMappingForm';
 

  // const validationSchema = Yup.object().shape(
  //   FoodNutrients.reduce((schema, item) => {
  //     schema[item.name] = Yup.string().required(`Please enter ${item.name}`);
  //     return schema;
  //   }, {})
  // );

const FoodNutritionMappingList = () => {

    const [rowData, setRowData] = useState([]);

    const [colDefs, setColDefs] = useState([]);

    const [openPopup, setOpenPopup] = useState(false);

    const axiosClientPrivate = useAxiosPrivate();

    const [id,setId] = useState(1);

    const [showupdate,setShowupdate] = useState(false);

    const [fetchTrigger, setFetchTrigger] = useState(0);

    const [foodname,setFoodname] = useState([{}]);

    const [nutrient,setNutrient] = useState([{}]);

    const [nutrientmap,setNutrientmap] = useState({});

    const [nutrientpair,setNutrientpair] = useState({});

    // const [initialvalues,setInitialvalues]  = useState({});

        // console.log("intit",nutrient);
    const initialValues = nutrient.reduce((values, item) => {
      values[item.label] = "";
        return values;
      }, { 
       foodMaster : "",
       modifiedBy: "",
    });

    // console.log("initialiatvalues",initialValues);

      // initialValues = {
      //     foodMasterId : "",
      //     lastModified: "",
      //     modifiedBy: ""
      // }
      

      // console.log("is empty ",values);
      
      
      const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        setFieldValue,
        handleSubmit,
        resetForm
      } = useFormik({
        initialValues: initialValues,
        // validationSchema: validationSchema,
        // onSubmit: (values) => {

        

        //     const fooddish = foodname.find(item => item.label === values.foodMaster);
        //     const dishid = fooddish ? fooddish.value : null;
        //     values['foodMasterId'] = values.foodMaster;
        //     delete values.foodMaster;
        //     values.foodMasterId = dishid;

        // //   console.log("values",values);
            
        //         const nutrientVal = {};

        //         for (const key in values) {
        //         if(nutrientmap[key]){
        //             nutrientVal[nutrientmap[key]] = values[key];
        //         }
        //         }




        //     for (const key in values) {
        //         if (key !== "foodMasterId" && key !== "modifiedBy") {
        //           delete values[key];
        //         }
        //       }

              
        //     values['nutrientValues'] = nutrientVal;
        //     values.nutrientValues = nutrientVal;
        //     console.log("nutiren mapping",nutrientVal);
        //     console.log("values",values);
          
            
        //   },
          onSubmit: async (values, {resetForm}) => {
            //  console.log(values);

            const fooddish = foodname.find(item => item.label === values.foodMaster);
            const dishid = fooddish ? fooddish.value : null;
            values['foodMasterId'] = values.foodMaster;
            delete values.foodMaster;
            values.foodMasterId = dishid;

        //   console.log("values",values);
            
                const nutrientVal = {};

                for (const key in values) {
                if(nutrientmap[key]){
                    nutrientVal[nutrientmap[key]] = values[key];
                }
                }




            for (const key in values) {
                if (key !== "foodMasterId" && key !== "modifiedBy") {
                  delete values[key];
                }
              }

              
            values['nutrientValues'] = nutrientVal;
            values.nutrientValues = nutrientVal;
            console.log("nutiren mapping",nutrientVal);
            console.log("values",values);

             resetForm();
            try {
                const response = await axiosClientPrivate.post('/nutrients', values);
                toast.success("Saved Successfully!",{
                    position:"top-center"
                 });  
                       // getting id(key,value) of last index
                //     const id = rowData[rowData.length-1].buId;
                //     const obj = {
                //         buId : id+1,
                //         ...values
                //     }
                //  console.log(obj);
                //  setRowData(rowData => [...rowData, obj]);
                setFetchTrigger(prev => prev+1);

                console.log('Response:', response.data);
                resetForm();
              } catch (error) {
                console.log(values);
                console.error('Error:', error);
              }
            },
      });

      // console.log("is empty1 ",values);

      useEffect(() => {
        const controller = new AbortController();
    
        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get('http://localhost:8080/foods', { signal: controller.signal });
                const items = response.data.content;
                    console.log("food name :-",items);
    
                    // const newDiagnosisMap = new Map();
                    // items.forEach(item => newDiagnosisMap.set(item.ailmentSysName, item.id));
                    // setBodysystem(newDiagnosisMap);
    
                    // console.log(diagnosisMap.size);
                    // const ailment = items.map((item)=>{
                    //   // diagnosisMap.set(item.id,item.ailmentSysName);
                    //   return item.ailmentSysName;
                    // });
    
                    const foodName = items.map((item)=>{
                      return {label : item.foodName,value : item.id};
                    });
    
                    setFoodname(foodName);
                    // console.log(ailment);
    
            } catch (err) {
                console.error("Failed to fetch data: ", err);
            }
        };
    
        getAllOhc();
    
        return () => {
            controller.abort();
        };
    
    }, []);

      useEffect(() => {
        const controller = new AbortController();
    
        const getAllOhc = async () => {
            try {
                const response = await axiosClientPrivate.get('http://localhost:8080/nutrient-masters', { signal: controller.signal });
                const items = response.data.content;
                    // console.log("food name :-",items);

                      // this for dynamic header (1 : protein)
                      const nutrient = {};
                      items.forEach(item => {
                        nutrient[item.id] = item.nutrientName;
                      });

                      setNutrientpair(nutrient);



                    const nutrientMap = {};
                      items.forEach(item => {
                        nutrientMap[item.nutrientName] = item.id;
                      });

                    // console.log("checkkkk",nutrientMap);
                    setNutrientmap(nutrientMap);



    
                    const options = items.map((item)=>{
                      return {label : item.nutrientName,value : item.id};
                    });
    
                    
                    setNutrient(options);
                    // console.log(ailment);
    
            } catch (err) {
                console.error("Failed to fetch data: ", err);
            }
        };
    
        getAllOhc();
    
        return () => {
            controller.abort();
        };
    
    }, []);


   // to delete a row
   const handleDeleteRow = async (id) => {
    alert(id)
   if(window.confirm('Are you sure you want to delete this data?')){
   try {
       await axiosClientPrivate.delete(`/nutrients/${id}`);
    //    setRowData(prevData => prevData.filter(row => row.id !== id));
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
                const response = await axiosClientPrivate.get(`http://localhost:8080/nutrients?page=${0}&size=${22}`, { signal: controller.signal });
                const items = response.data.content;
                    console.log("before ",items);
                    
                       // to make arr in key value pair
                    const flattenNutrientValues = (items) => {
                      return items.map(item => {
                          const nutrientValues = item.nutrientValues;
                          const flatNutrientValues = {};
                  
                          Object.keys(nutrientValues).forEach(key => {
                              flatNutrientValues[key] = nutrientValues[key];
                          });
                  
                          return {
                              ...item,
                              ...flatNutrientValues,
                          };
                      });
                  };

                  const flattenedItems = flattenNutrientValues(items);
                  // const initialNutrientKeys = Object.keys(initialItems[0].nutrientValues);
                  console.log("after ",flattenedItems);

                    // helful for dynamically header
                //   const findIndexWithMostNutrientPairs = (items) => {
                //     let maxPairs = 0;
                //     let maxIndex = -1;
                //     items.forEach((item, index) => {
                //         const numPairs = Object.keys(item.nutrientValues).length;
                //         if (numPairs > maxPairs) {
                //             maxPairs = numPairs;
                //             maxIndex = index;
                //         }
                //     });
                //     return maxIndex;
                // };
                const findIndexWithMostNutrientPairs = (items) => {
                  return items.reduce((maxIndex, item, index) => {
                      const numPairs = Object.keys(item.nutrientValues).length;
                      return numPairs > (items[maxIndex]?.nutrientValues?.length || 0) ? index : maxIndex;
                  }, 0);
              };

                const max  = findIndexWithMostNutrientPairs(flattenedItems);

                const initialNutrientKeys = Object.keys(flattenedItems[max].nutrientValues);  //generating key value pair dynamically

                // food name
                 
                if(foodname.length>0){
                  // items.forEach(obj => {
                  //     obj.unitId = unit.find(item => item.value == parseInt(obj.unitId)).label;
                  //   });
                  flattenedItems.forEach(obj => {
                      const foundItem = foodname.find(item => item.value == parseInt(obj.foodMasterId));
                      if (foundItem) {
                          obj.foodMasterId = foundItem.label;
                      } 
                  });
              }
              else{
                  console.log("Not found!");
              }
              
                
                if (items.length > 0) {

                    const headerMappings = {
                      foodMasterId: 'Food name',
                      id: 'Id',
                      modifiedBy: 'Modified By',
                      ...Object.fromEntries(initialNutrientKeys.map(key => [key, nutrientpair[key]]))
                      
                    };

                    console.log("checking header",headerMappings);
                    // old code
                    // const  columns = Object.keys(flattenedItems[0]).map(key => ({
                    //     field: key,
                    //     headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                    //     filter: true,
                    //     floatingFilter: true,
                    //     sortable: true,
                    //     width: key === 'id' ? 100 : undefined,
                    // }));

                    const columns = [
                      { field: 'id', headerName: headerMappings['id'], filter: true, floatingFilter: true, sortable: true, width: 100 },
                      { field: 'foodMasterId', headerName: headerMappings['foodMasterId'], filter: true, floatingFilter: true, sortable: true, width: 150 },
                      ...Object.keys(flattenedItems[max])
                          .filter(key => key !== 'id' && key !== 'foodMasterId')
                          .map(key => ({
                              field: key,
                              headerName: headerMappings[key] || key.charAt(0).toUpperCase() + key.slice(1),
                              filter: true,
                              floatingFilter: true,
                              sortable: true,
                          }))
                  ];

                    columns.unshift({
                        field: "Actions", cellRenderer:  (params) =>{
                            const id = params.data.id;
                            return <CustomActionComponent id={id} />
                        }
                    });

                    setColDefs(columns);
                }

                setRowData(flattenedItems);

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
          const response = await axiosClientPrivate.get(`/nutrients/${id}`);
            console.log("for update",response.data);

            values.id = response.data.id;
            const updateDish = foodname.find(item => item.value == parseInt(response.data.foodMasterId)).label;
            values.foodMaster = String(updateDish);

                setFieldValue('id', response.data.id);
                setFieldValue('foodMaster',  String(updateDish));
                setFieldValue('modifiedBy', response.data.modifiedBy);

                // Set nutrient values dynamically
                Object.entries(response.data.nutrientValues).forEach(([key, value]) => {
                  const fieldName = nutrientpair[key];
                  if (fieldName) {
                      setFieldValue(fieldName, value);
                  }
                });
              // console.log("check values",values);

            setId(id);
            setShowupdate(true);
            setOpenPopup(true);
        } catch (error) {
          console.error('Error fetching item for edit:', error);
        }
      };


      const handleUpdate = async (id)=> {
        alert(id);
        // console.log(values);

        values.foodMasterId = foodname.find(item => item.label == String(values.foodMaster)).value;
        delete values.foodMaster;
        delete values.undefined;
        const update = values;
        try{
            //  console.log(values);
             await axiosClientPrivate.put(`/nutrients/${id}`,update);
             toast.success("Updated Successfully!",{
                position:"top-center",
                autoClose: 3000,
             });
             resetForm();
            //  setRowData(rowData => [...rowData,values]);
            setFetchTrigger(prev => prev+1);

        }
        catch(err){
            console.log("after:- ",values);
            console.log(err);
        }
      }


    const exportpdf = async () => {
        
        const doc = new jsPDF();
        const header = [["Bussiness Unit","Department Id",'Section Name',"Section Head","Section Head Email"]];
        const tableData = rowData.map(item => [
          item.buId,
          item.deptId,
          item.sectionName,
          item.sectionHeadName,
          item.sectionHeadEmail,
          
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
        doc.save("BussinessList.pdf");
    };


    const exportExcelfile = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('My Sheet');
        
  
        const headerStyle = {
          alignment: { horizontal: 'center' }
          
      };
  
      sheet.getRow(1).font = { bold: true };
        
        const columnWidths = {
            buId: 20,
            deptId: 20,
            sectionName: 15,
            sectionHeadName: 25,
               sectionHeadEmail : 25
        };
  
        sheet.columns = [
          { header: "Bussiness Unit", key: 'buId', width: columnWidths.buId, style: headerStyle },
          { header: "Department Id", key: 'deptId', width: columnWidths.deptId, style: headerStyle },
          { header: "Section Name", key: 'sectionName', width: columnWidths.sectionName, style: headerStyle },
          { header: "Section Head", key: 'sectionHeadName', width: columnWidths.sectionHeadName, style: headerStyle },
          { header: "Section Head Email", key: 'sectionHeadEmail', width: columnWidths.sectionHeadEmail, style: headerStyle },
          
      ];
  
        rowData.map(product =>{
            sheet.addRow({
                buId: product.buId,
                deptId: product.deptId,
                sectionName: product.sectionName,
                sectionHeadName: product.sectionHeadName,
                sectionHeadEmail: product.sectionHeadEmail,
            })
        });
  
        workbook.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet",
            });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = 'download.xlsx';
            anchor.click();
        })
    }

    return (
        <>
        <ToastContainer />
            <Box
                className="ag-theme-quartz" 
                style={{ height: 500 }}
            >

                <Stack sx={{ display: 'flex', flexDirection: 'row' }} marginY={1} paddingX={1}>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" endIcon={<AddCircleOutlineRoundedIcon />} onClick={() => { setOpenPopup(true) }}>Add New</Button>
                        <Button variant="contained" onClick={exportpdf} color="success" endIcon={<PictureAsPdfIcon/>}>PDF</Button>
                        <Button variant="contained" onClick={()=> exportExcelfile()}  color="success" endIcon={<DownloadIcon/>}>Excel</Button>
                    </ButtonGroup>

                </Stack>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    animateRows={true} 
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </Box>

            <Popup showupdate={showupdate} id= {id} handleUpdate={handleUpdate} setShowupdate={setShowupdate} resetForm={resetForm} handleSubmit={handleSubmit}  openPopup={openPopup} setOpenPopup={setOpenPopup} title="Food Nutrition mapping for 100g">

                <FoodNutritionMappingForm nutrient={nutrient} foodname={foodname}  values={values} touched={touched} errors={errors} handleBlur={handleBlur} handleChange={handleChange} setFieldValue={setFieldValue} handleSubmit={handleSubmit} />
                
            </Popup>
        </>
    );
};

export default FoodNutritionMappingList;
