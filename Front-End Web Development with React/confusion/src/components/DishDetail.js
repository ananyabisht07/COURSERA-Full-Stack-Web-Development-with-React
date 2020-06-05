import React,{ Component} from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';




class DishDetail extends Component {
    
    renderComments({dish})  {
        console.log("qwerty",dish)
        const {comments}= dish
        return(
            <div>
                {comments.map(comment =>{
                    return(
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>--{comment.author}<span>, {new Intl.DateTimeFormat("en-US",{
                                year: "numeric",
                                month:"short",
                                day:"2-digit",
                            }).format(new Date(Date.parse(comment.date)))}</span>
                            </p>
                        </div>
                    )
                })}
            </div>
        
        )
    }
    
    
    render() {
        const {dish}=this.props
        
        
        if (dish!=null) {
            
            return(

                <div className="container">
                    <div className="row ">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg src={dish.image} alt={dish.name}></CardImg>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>   
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardBody>
                                    <CardTitle><h4>Comments</h4></CardTitle>
                                    <this.renderComments dish={dish} />
                                </CardBody>
                            </Card>   
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        }
        
    }
}

export default DishDetail;