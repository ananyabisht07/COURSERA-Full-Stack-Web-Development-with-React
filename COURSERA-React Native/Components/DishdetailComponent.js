import React, {Component} from 'react';
import { Text, View, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Card, Icon, Input, Rating } from "react-native-elements";
import * as Animatable from 'react-native-animatable';
//import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import { postFavorite, postComment } from '../redux/ActionCreators';
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
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
})

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 15}}>{item.comment}</Text>
                <Rating
                    imageSize={15}
                    readonly
                    startingValue={item.rating}
                    style={{ alignItems: "flex-start" }}
                    />
               
                <Text style={{fontSize: 13}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'  titleStyle={{fontSize:20}}>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>
    );
}



function RenderDish(props) {

    const dish = props.dish;
    
        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={{alignItems:"center", flexDirection:"row", flex:1,justifyContent:"center"}}>
                            <Icon 
                                raised
                                reverse
                                name={props.favorite ? 'heart': 'heart-o'}
                                type='font-awesome'
                                color="#f50"
                                onPress={ () => props.favorite ? console.log('Already favorite') : props.onPress() }
                            />
                            <Icon
                                raised
                                reverse
                                name="pencil"
                                type="font-awesome"
                                color="#512DA8"
                                onPress={() => props.comment()}
                            />
                        </View>
            
                    </Card>
                </Animatable.View>
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
          showModal: false,
          author: "",
          comment: "",
          rating: 5,
        };
      }
    
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    ratingCompleted = (rating) => {
        this.setState({ rating });
    };
    
    handleAuthorInput = (author) => {
    this.setState({ author });
    };
    
    handleCommentInput = (comment) => {
        this.setState({ comment });
    };
    
    toggleModal() {
    this.setState({ showModal: !this.state.showModal });
    }

    handleComment() {
        const { rating, author, comment } = this.state;
//        const dishId = this.props.dishId;
const dishId = this.props.route.params.dishId
        console.log(this.state);
    
        this.toggleModal();
        if (author.length != 0 && comment.length != 0) {
            this.props.postComment(dishId, rating, author, comment);
        }
      }
    resetForm() {
    this.setState({
        showModal: false,
        author: "",
        comment: "",
        rating: 5,
    });
    }
    
    render() {

        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => this.toggleModal()}
                    onRequestClose={() => this.toggleModal()}
                >
                    <Rating
                    showRating
                    startingValue={this.state.rating}
                    style={{ paddingVertical: 10 }}
                    imageSize={30}
                    onFinishRating={(value) => this.ratingCompleted(value)}
                    />
                    <Input
                    placeholder="Author"
                    onChangeText={(text) => this.handleAuthorInput(text)}
                    leftIcon={
                        <Icon type="font-awesome" name="user-o" size={20} color="black" />
                    }
                    ></Input>
                    <Input
                    leftIcon={
                        <Icon
                        type="font-awesome"
                        name="comment-o"
                        size={20}
                        color="black"
                        />
                    }
                    placeholder="Comment"
                    onChangeText={(text) => this.handleCommentInput(text)}
                    >
                    </Input>
                    <View style={{ margin: 10 }}>
                    <Button
                        title="Submit"
                        raised
                        color="#512DA8"
                        onPress={() => {
                        this.handleComment();
                        this.resetForm();
                        }}
                    />
                    </View>
                    <View style={{ margin: 10 }}>
                    <Button
                        title="Cancel"
                        raised
                        color="gray"
                        onPress={() => this.toggleModal()}
                    />
                    </View>
                </Modal>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                     favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    comment={() => this.toggleModal()}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => 
                    comment.dishId === dishId )} />
            </ScrollView>
            
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Dishdetail);