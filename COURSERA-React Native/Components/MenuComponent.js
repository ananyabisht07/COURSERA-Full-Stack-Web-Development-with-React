import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../Shared/dishes';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        }
    }
    
    render() {
        const { navigation } = this.props;
        
        const renderMenuItem = ({item, index}) => {
            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigation.navigate('Dishdetail',{dishId:item.id})}
                        leftAvatar={{ source: require('./images/uthappizza.png')}}
                      />
            );
        };
        
        
        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
    
}


export default Menu;