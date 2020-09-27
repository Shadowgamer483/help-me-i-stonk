
import React from 'react';

import { StyleSheet, Text, TouchableHighlightBase, View ,FlatList} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import db from '../config';

export default class Search_Screen extends React.Component{
    constructor(props){

super(props)
this.state={
alltransactioin:[],LastVisibleTransaction:null,search:""
}

    }
    componenetDidMount=async()=>{

const querry=await db.collection("transactions").get()
querry.docs.map((doc)=>{
    
    this.setState({alltransactioin:[...this.state.alltransactioin,doc.data()]})
})

    }

fetchmoretransaction=async()=>{

const querry=await db.collection("transactions").startAfter(this.state.LastVisibleTransaction).limit(10).get()
 querry.docs.map((doc)=>{

this.setState({alltransactioin:[...this.state.alltransactioin,doc.data()],LastVisibleTransaction:doc})

 })

}
searchTransactions=async(text)=>{
    var text =text.split("")
if(text[0]==="b"){

const transaction=await db.collection("transactions").where("bookID","==",text).get()
transaction.docs.map((doc)=>{
    this.setState({alltransactioin:[...this.state.alltransactioin,doc.data()],LastVisibleTransaction:doc})
})

}
else if(text[0]==="s"){

    const transaction=await db.collection("transactions").where("StudentID","==",text).get()
    transaction.docs.map((doc)=>{
        this.setState({alltransactioin:[...this.state.alltransactioin,doc.data()],LastVisibleTransaction:doc})
    })

}


}

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.searchBar}>
                    <TextInput style={styles.bar}
                    placeholder="enterID"
                    onChangeText={(text)=>{this.setState({search:text})}}
                    />
                    <TouchableOpacity onPress={()=>this.searchTransactions(this.state.search)}> </TouchableOpacity>
                    
                </View>
                
<FlatList

data={this.state.alltransactioin}
renderItem={({item})=>(

<View key={index}style={{borderBottomWidth:2}}>

<Text>

{"BookID:"+transaction.bookID}

</Text>

<Text>

{"StudentID:"+transaction.StudentID}

</Text>

<Text>

{"transaction type:"+transaction.transactiontype}

</Text>

<Text>

{"Date:"+transaction.date.toDate()}

</Text>

</View>

)}
keyExtractor={(item,index)=>index.toString()}
onEndReached={this.fetchmoretransaction}
onEndReachedThreshold={0.7}











    />
</View>

        )

    }
    
}


const styles = StyleSheet.create({ 
    container: { flex: 1, marginTop: 20 } ,
     searchBar:{ flexDirection:'row',
     height:40, width:'auto', borderWidth:0.5,
      alignItems:'center', backgroundColor:'grey',
     }, bar:{ borderWidth:2, height:30, width:300,
         paddingLeft:10, }, searchButton:{ borderWidth:1,
             height:30, width:50, alignItems:'center',
              justifyContent:'center',
 backgroundColor:'green' } })













