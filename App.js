import React, { useEffect } from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
   StyleSheet, 
   Text, 
   View, 
   Button,
   FlatList,   
   TouchableOpacity,
   SafeAreaView, 
   ScrollView
  } from 'react-native';  
import axios from 'axios';

export default function App() {                       
  const [dataToShow, addData] = useState([{title:'data1'}]);
  const [otherDataToShow, addOtherData] = useState([{title:'otherData1'}]);
  const [num, setNum] = useState(2);
  const [otherNum, setOtherNum] = useState(2);
  const [listType, setListType] = useState("mainView");
  const [dropDownActivate, setDropDownActivate] = useState(true);

  function getData()
  {
    if (listType=="mainView"){
      return dataToShow;
    }else{
      return otherDataToShow;
    }
  }
  function removeButtonPressed(){      
    setNum(num -1);
    
    if (listType=="mainView"){
      dataToShow.pop();
      addData([...dataToShow]);
    }else{
      otherDataToShow.pop();
      addOtherData([...otherDataToShow]);
    }            
  };

  function addButtonPressed(){        
    if (listType=="mainView"){
      setNum(num + 1);
      addData([...dataToShow, {title:'data'+num.toString()}]);
    }else{
      setOtherNum(otherNum + 1);
      addOtherData([...otherDataToShow, {title:'otherData'+otherNum.toString()}]);
    }    
  };

  function changeTypeButtonPressed(){
    setDropDownActivate(!dropDownActivate);
  };

  function functionRenderItem({item}){  
    return(    
      <View style={styles.listItem}>

      <TouchableOpacity style={styles.buttonOfToDo} onPress={addButtonPressed}>
        <Text style={{textAlign: 'center',  top:2, right:1}}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonOfRemove} onPress={removeButtonPressed}>
        <Text style={{textAlign: 'center',  top:2, right:1}}>Remove</Text>
      </TouchableOpacity>

      <Text style={styles.item}>{item.title}</Text>     
    </View>
    );
  };
  
  function getList()
  {
    return(
      <FlatList style={styles.listContainer} data={getData()} renderItem={functionRenderItem}/>
    );    
  };
    
  function changeMainView(){
    setListType("mainView");
  }
  function changeDifferentView(){
    setListType("differentView");
  }

  function getDropDown()
  {
    if (!dropDownActivate){
      const dropDown= <View style={styles.dropDownViewStyle}>
                    <ScrollView>

                      <TouchableOpacity style={{backgroundColor: 'white'}} onPress={changeMainView}>
                        <Text>Main View</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{backgroundColor: 'white'}} onPress={changeDifferentView}>
                        <Text>Different View</Text>
                      </TouchableOpacity>                      

                    </ScrollView>
                  </View>;
    return dropDown;
    }    
  }
  
  const defaultView = <SafeAreaView style={styles.viewContainer}>    

                        <View style={styles.viewForListContainer}>      

                          {getDropDown()}
                          <TouchableOpacity style={{backgroundColor: 'white', transform: [{translateX:125}], borderRadius: 2, padding:1}} onPress={changeTypeButtonPressed}>
                            <Text>Change Type</Text>
                          </TouchableOpacity>                          
                          <Text style={styles.textContainer}>Tasks</Text>
                          {getList()}                          

                        </View>      

                      </SafeAreaView>;

  return defaultView;                        
}

const styles = StyleSheet.create({
  dropDownViewStyle:{    
    height: 50,
    width: 110,
    backgroundColor: 'white',
    transform:[{translateX:125}],    
    position: 'absolute',
    top: 20,
    zIndex:1
  },
  listItem:{
    borderWidth:3,
    borderColor: '#3498db',
    borderRadius: 10,
    padding: 10,
    margin: 5
  },
  buttonChangeType:{
    backgroundColor: 'red',
    top:50,
    right: 100
  },
  buttonOfToDo:{
    position: 'absolute',   
    top: 5,
    right: 75,     
    backgroundColor: '#3498db',   
    height: 27,
    width: 60,
    borderRadius: 10
  },
  buttonOfRemove:{
    position: 'absolute',   
    top: 5,
    right: 10,     
    backgroundColor: '#3498db',   
    height: 27,
    width: 60,
    borderRadius: 10
  },
  textContainer:{
    fontSize: 10,
    fontWeight: 'bold'
  },
  viewContainer: {    
    backgroundColor: 'dodgerblue',    
    alignItems:'center',    
    width: '100%',
    height: '100%',    
    display:'flex'
  },
  viewForListContainer:{    
    alignItems: 'center',    
    width: '90%',
    height: '50%',    
    top: "20%",    
  },
  listContainer:
  {   
    position: 'absolute',
    height: "100%",
    top:40,
    width: '100%',
    backgroundColor: 'white',               
  }  
});
