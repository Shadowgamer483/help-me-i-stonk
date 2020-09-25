
import React from 'react';

import { StyleSheet, Text, TouchableHighlightBase, View ,ScrollView} from 'react-native';
import db from '../config';
export default class Search_Screen extends React.Component{
    constructor(props){

super()
this.state={
alltransactioin:[]
}

    }
    componenetDidMount=async()=>{

const querry=await db.collection("transactions").get()
querry.docs.map((doc)=>{
    
    this.setState({alltransactioin:[...this.state.alltransactioin,doc.data()]})
})
    }
    render(){
        return(
<ScrollView>
{this.state.alltransactioin.map((transaction,index)=>{
    return(
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


    )
})}


    </ScrollView>


        )

    }
    
}
















