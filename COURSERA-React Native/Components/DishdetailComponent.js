import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card ,Icon } from 'react-native-elements';
import { DISHES } from '../Shared/dishes';
import { COMMENTS } from '../Shared/comments';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';


function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 15}}>{item.comment}</Text>
                <Text style={{fontSize: 13}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 13}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Card title='Comments'  titleStyle={{fontSize:20}}>
        <FlatList 
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}



function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon 
                        raised
                        reverse
                        name={props.favourite ? 'heart': 'heart-o'}
                        type='font-awesome'
                        color="#f50"
                        onPress={ () => props.favourite ? console.log('Already favourite') : props.onPress() }
                    />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favourites: []
        };
    }
    markFavourite(dishId) {
        this.setState({favourites: this.state.favourites.concat(dishId)})
    }
    
    render() {

        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.state.dishes[+dishId]} 
                     favourite={this.state.favourites.some(el => el === dishId)}
                    onPress={() => this.markFavourite(dishId)} 
                />
                <RenderComments comments={this.state.comments.filter((comment) => 
                    comment.dishId === dishId )} />
            </ScrollView>
            
        );
    }
}

export default Dishdetail;