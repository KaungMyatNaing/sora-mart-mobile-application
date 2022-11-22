import { TouchableOpacity,Image } from 'react-native'
function SwitchOn ({setValue}) {
    return (
      <TouchableOpacity onPress={()=>setValue(0)}>
        <Image alt="switch" resizeMode='contain' style={{width:30,height:30}} source={require('../../assets/image/png_icons/switchOn.png')}/>
      </TouchableOpacity>
    )
  }
function SwitchOff ({setValue}) {
    return (
      <TouchableOpacity onPress={()=>setValue(1)}>
        <Image alt='switch' resizeMode='contain' style={{width:30,height:30}} source={require('../../assets/image/png_icons/switchOff.png')}/>
      </TouchableOpacity>
    )
  }

  export {SwitchOff,SwitchOn}