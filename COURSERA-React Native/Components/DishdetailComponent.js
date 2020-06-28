import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Card ,Icon } from 'react-native-elements';
import { DISHES } from '../Shared/dishes';
import { COMMENTS } from '../Shared/comments';
import { postFavorite } from '../redux/ActionCreators'
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

import { connect } from 'react-redux';
import { baseUrl } from '../Shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
})

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
                image={{uri: baseUrl + dish.image}}>
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <Icon 
                        raised
                        reverse
                        name={props.favorite ? 'heart': 'heart-o'}
                        type='font-awesome'
                        color="#f50"
                        onPress={ () => props.favorite ? console.log('Already favorite') : props.onPress() }
                    />
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Dishdetail extends Component {

    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
    
    render() {

        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                     favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => 
                    comment.dishId === dishId )} />
            </ScrollView>
            
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);