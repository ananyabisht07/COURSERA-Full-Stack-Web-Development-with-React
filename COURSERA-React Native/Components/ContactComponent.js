import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from "expo-mail-composer";

function sendMail() {
    MailComposer.composeAsync({
        recipients: ['confusion@food.net'],
        subject: 'Enquiry',
        body: 'To whom it may concern:'
    })
}

export default function Contact(){
    return( 
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}> 
            <Card
                    title='Contact Information'
                    titleStyle={{fontSize:20}} 
                    >
                    <View style={{margin: 10}}>
                    <Text>
                        121, Clear Water Bay Road{"\n\n"} Clear Water Bay, Kowloon HONG KONG
                        {"\n\n"} Tel: +852 1234 5678{"\n\n"} Fax: +852 8765 4321{"\n\n"}{" "}
                        Email:confusion@food.net{"\n"}
                    </Text>
                    <Button
                        title=" Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={() => sendMail()}
                        />
                    </View>
                    
                        
            </Card>
        </Animatable.View>
    )
}