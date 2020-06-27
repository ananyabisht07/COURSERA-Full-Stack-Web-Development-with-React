import React, {Component} from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../Shared/baseUrl';

class Menu extends Component {
    
    render() {
        const { navigation } = this.props;
        
        const renderMenuItem = ({item, index}) => {
            return (
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigation.navigate('Dishdetail',{dishId:item.id})}
                        imageSrc={{ uri: baseUrl + item.image}}
                      />
            );
        };
        
        
        return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()}
                />
    );
    }
    
}

const mapStateToProps = state => {
    console.log("Menuuuuuuu:",state)
      return {
        dishes: state.dishes
      }
    }
export default connect(mapStateToProps)(Menu);