import {Divider, HStack, Image,ScrollView,Text, VStack,Slider} from 'native-base';
import { useState } from 'react';
import {TouchableOpacity,Modal} from 'react-native';
import { styles } from '../../assets/css/layouts/searchAndFilterStyle';
import {Collapse, CollapseHeader, CollapseBody} from "accordion-collapse-react-native";
import { useIsFocused } from '@react-navigation/native' // for re-render
import Toast from 'react-native-toast-message';

function SearchAndFilter(){
    const [modalVisible, setModalVisible] = useState(true);
    const [trainLineExp, setTrainLineExp] = useState(true);
    const [trainStationExp, setTrainStationExp] = useState(true);
    const [rentalPriceExp, setRentalPriceExp] = useState(true);
    const [roomTypeExp, setRoomTypeExp] = useState(true);    

   return (
        <HStack w={20} justifyContent='space-between' alignItems='center' p={1} m={5}>
            <TouchableOpacity>
                <Image                
                    source = {require('../../assets/image/Blog/SearchIcon3x.png')}
                    w={6} h={6}
                />            
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>setModalVisible(true)}>
                <Image                
                    source = {require('../../assets/image/Blog/FilterIcon3x.png')}
                    w={6} h={6}
                />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}
            >
                <VStack h='90%' style={styles.modalBox} justifyContent='flex-start' p={5}>
                    <MyCloseBtn modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                    <Divider my={2}/>
                    <ScrollView>
                    <MyTrainLineCollapse expanded={trainLineExp} setExpanded={setTrainLineExp} collapseHeader='Train Line'/>
                    <Divider my={2}/>
                    <MyTrainStationCollapse expanded={trainStationExp} setExpanded={setTrainStationExp} collapseHeader='Train Station'/>
                    <Divider my={2}/>
                    <MyRentalPriceCollapse expanded={rentalPriceExp} setExpanded={setRentalPriceExp} collapseHeader='Rental Price'/>
                    <Divider my={2}/>
                    <MyRoomTypeCollapse expanded={roomTypeExp} setExpanded={setRoomTypeExp} collapseHeader='Room Type'/>
                    <Divider my={2}/>
                    <MyBtnGp/>
                    </ScrollView> 
                </VStack>                               
            </Modal>
        </HStack>        
    );
}

function MyCloseBtn({modalVisible,setModalVisible}){
    return(
        <HStack justifyContent='flex-end' alignItems='center' h={5} mb={5}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.closeBtn}>Close</Text>
            </TouchableOpacity>                    
        </HStack>
    )
}

function MyTrainLineCollapse({expanded,setExpanded,isExpanded,collapseHeader}){    
    return (
        <Collapse isExpanded={expanded} onToggle={(isExpanded)=>setExpanded(isExpanded)} style={styles.mainCollapse}>
            <CollapseHeader>
                <MyCollapseHeader collapseHeader={collapseHeader} isExpanded={isExpanded}/>
            </CollapseHeader>
            <CollapseBody>
            <MyTrainLineCollpseBody/>
            </CollapseBody>
        </Collapse>
    )
}

function MyTrainStationCollapse({expanded,setExpanded,isExpanded,collapseHeader}){    
    return (
        <Collapse isExpanded={expanded} onToggle={(isExpanded)=>setExpanded(isExpanded)} style={styles.mainCollapse}>
            <CollapseHeader>
                <MyCollapseHeader collapseHeader={collapseHeader} isExpanded={isExpanded}/>
            </CollapseHeader>
            <CollapseBody>
            <MyTrainStationCollpseBody/>
            </CollapseBody>
        </Collapse>
    )
}

function MyRoomTypeCollapse({expanded,setExpanded,isExpanded,collapseHeader}){    
    return (
        <Collapse isExpanded={expanded} onToggle={(isExpanded)=>setExpanded(isExpanded)} style={styles.mainCollapse}>
            <CollapseHeader>
                <MyCollapseHeader collapseHeader={collapseHeader} isExpanded={isExpanded}/>
            </CollapseHeader>
            <CollapseBody>
            <MyRoomTypeCollpseBody/>
            </CollapseBody>
        </Collapse>
    )
}

function MyRentalPriceCollapse({expanded,setExpanded,isExpanded,collapseHeader}){
    return(
        <Collapse isExpanded={expanded} onToggle={(isExpanded)=>setExpanded(isExpanded)} style={styles.mainCollapse}>
            <CollapseHeader>
                <MyCollapseHeader collapseHeader={collapseHeader} isExpanded={isExpanded}/>
            </CollapseHeader>
            <CollapseBody>
            <MyRentalPriceCollapseBody/>
            </CollapseBody>
        </Collapse>
    )
}

function MyChooseBtn({lbl,active}){
    return(
        <TouchableOpacity m={5}>
            <Text style={styles.activeStyle}>{lbl}</Text>
        </TouchableOpacity>
    )
}

function MyUnChooseBtn({lbl}){
    return(
        <TouchableOpacity m={5}>
            <Text style={styles.inActiveStyle}>{lbl}</Text>
        </TouchableOpacity>
    )
}

function MyTrainLineCollpseBody(){
    return(
        <HStack justifyContent='flex-start'>
              <MyChooseBtn lbl='Yamanote Line'/>
              <MyUnChooseBtn lbl='Keihin–Tōhoku Line'/>
          </HStack>
    )
}
function MyTrainStationCollpseBody(){
    return(
        <>
            <HStack justifyContent='flex-start'>
                <MyUnChooseBtn lbl='Yamanote Takadanobaba'/>
                <MyChooseBtn lbl='Shin-Ōkubo'/>
                <MyUnChooseBtn lbl='Shibuya'/>              
            </HStack>
            <HStack>
                <MyUnChooseBtn lbl='Komagome'/>
                <MyUnChooseBtn lbl='Shinagawa'/>
            </HStack>
        </>
    )
}

function MyRoomTypeCollpseBody(){
    return(
        <>
            <HStack justifyContent='flex-start'>
                <MyUnChooseBtn lbl='1 Room'/>
                <MyChooseBtn lbl='1K'/>
                <MyUnChooseBtn lbl='1DK'/> 
                <MyUnChooseBtn lbl='Sharehoue'/>             
            </HStack>
            <HStack>
                <MyUnChooseBtn lbl='2k / 2DK'/>
            </HStack>
        </>
    )
}
function MyCollapseHeader({collapseHeader,isExpanded}){
    return (
        <HStack alignItems="center" justifyContent="space-between">
          <Text style={styles.collpseHeader}>{collapseHeader}</Text>
            {!isExpanded ? (
                <Image source={require('../../assets/image/png_icons/UpArrow3x.png')} alt="up Arrow" w={6} h={6}/>
            ) : (
                <Image source={require('../../assets/image/png_icons/UpArrow3x.png')} alt="up Arrow" w={6} h={6}/>
            )}
        </HStack>
    )
}

function MyBtnGp(){
    return (
        <HStack justifyContent='space-between' alignItems='center' mt={5} mb={5}>
            <TouchableOpacity style={styles.clearFilterBtn}>
                <Text style={styles.clearLbl}>Clear Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.showResultBtn}>
                <Text style={styles.showResultLbl}>Show 100 Results</Text>
            </TouchableOpacity>
        </HStack>        
    )
}

function MyRentalPriceCollapseBody(){
    const [onChangeStartValue, setOnChangeStartValue] = useState(300000);
    const [onChangeEndValue, setOnChangeEndValue] = useState(400000);
    return (
        <VStack mt={5} justifyContent='center' alignItems='flex-start'>
            <Text pb={5} style={styles.price}>MMK {onChangeStartValue} - MMK {onChangeEndValue}</Text>                
            <HStack w="100%" justifyContent='flex-start' alignItems='flex-start'>
                <Slider w="40%" 
                defaultValue={300000} 
                minValue={0} 
                maxValue={1000000}
                accessibilityLabel="Minimum Price" 
                onChangeEnd={v => {v && setOnChangeStartValue(Math.floor(v));}}>
                    <Slider.Track bgColor='coolGray.500'>
                    <Slider.FilledTrack bgColor='coolGray.500'/>
                    </Slider.Track >
                    <Slider.Thumb>
                        <Image source={require('../../assets/image/png_icons/sliderThumb.png')} w={6} h={6} alt='slider thumb' resizeMode='contain'/>
                    </Slider.Thumb>
                </Slider>
                <Slider w='40%'
                defaultValue={400000} 
                minValue={0} 
                maxValue={1000000}
                accessibilityLabel="Maximun Price" 
                onChangeEnd={v => { v && setOnChangeEndValue(Math.floor(v));}}>
                    <Slider.Track bgColor='coolGray.500'>
                        <Slider.FilledTrack bgColor='coolGray.500' />
                    </Slider.Track>
                    <Slider.Thumb>
                        <Image source={require('../../assets/image/png_icons/sliderThumb.png')} w={6} h={6} alt='slider thumb' resizeMode='contain'/>
                    </Slider.Thumb>
                </Slider>
            </HStack>
        </VStack>
    )
}

export {SearchAndFilter,
    MyCloseBtn,
    MyTrainLineCollapse,
    MyChooseBtn,
    MyUnChooseBtn,
    MyCollapseHeader,
    MyTrainLineCollpseBody,
    MyTrainStationCollpseBody,
    MyRentalPriceCollapseBody,
};