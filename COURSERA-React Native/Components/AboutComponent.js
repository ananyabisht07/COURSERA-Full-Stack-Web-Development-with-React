import React, { Component } from 'react'
import { Card, Text, ListItem } from 'react-native-elements'
import { LEADERS } from '../Shared/leaders';
import { View, FlatList,  ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { baseUrl } from '../Shared/baseUrl';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History() {
    return(
        <Card
            title='Our History'
            titleStyle={{fontSize:20}}       >
            <View style={{margin: 10}}>
                <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. 
                    With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list 
                    clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will 
                    arrive on your plate the next time you visit us.</Text>
                <Text></Text>
                <Text>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, 
                        that featured for the first time the world's best cuisines in a pan.</Text>
            </View>
        </Card>
    );
}
class About extends Component {

    render() {
        const renderLeaders = ({item, index}) => {
            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{source: {uri: baseUrl + item.image}}}
                      />
            );
        };
        return (
            <ScrollView>
                <History />
                <Card title='Corporate Leaders' titleStyle={{fontSize:20}} >
                    <View style={{margin: 10}}>
                        <FlatList 
                        data={this.props.leaders.leaders}
                        renderItem={renderLeaders}
                        keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </Card>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);