import React,{ Component } from 'react'
import { Modal, ModalHeader, ModalBody, Label,Button, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        
            this.state = {
                isModalOpen:false
            };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render(){
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span>Submit Comment
                </Button>
            
                <Modal isOpen={this.state.isModalOpen} toggleModal={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm className="m-2" onSubmit={(values) => this.handleSubmit(values)}>
                            
                            <Row className="form-group">
                                <Label htmlFor="Yourname">Rating</Label>
                                <Control.select model=".contactType" name="contactType" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="yourname" >Your Name</Label>
                                
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" >Comment</Label>
                                
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control"
                                        />
                                
                            </Row>

                            <Row className="form-group">
                                
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default CommentForm
