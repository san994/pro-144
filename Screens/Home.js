import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native';
import {RFValue} from "react-native-responsive-fontsize"
import axios from 'axios'
import {Header,Icon,AirbnbRating} from "react-native-elements"

export default class HomeScreen extends React.Component{
  constructor(){
      super()
      this.state={
          article:{}
      }
  }
  componentDidMount(){
      this.getArticle()
  }
  getArticle=()=>{
      const url = "http://localhost:5000/get-article"
      axios
      .get(url)
      .then(response=>{
          let details = response.data.data
          this.setState({article:details})
      })
      .catch(err=>{
          alert(err.message)
      })
  }
  likedArticle=()=>{
      const url = "http://localhost:5000/liked-article"
      axios
      .get(url)
      .then(response=>{
          this.getArticle()
      })
      .catch(err=>{
          alert(err.message)
      })
  }
  unlikedArticle=()=>{
    const url = "http://localhost:5000/unliked-article"
    axios
    .get(url)
    .then(response=>{
        this.getArticle()
    })
    .catch(err=>{
        alert(err.message)
    })
}
render() {
    const { article } = this.state;
    if (article.url) {
      const {
        title,
        text,
        url
      } = article;

      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Header
              centerComponent={{
                text: "Article Recommended",
                style: styles.headerTitle
              }}
              rightComponent={{ icon: "search", color: "#fff" }}
              backgroundColor={"#d500f9"}
              containerStyle={{ flex: 1 }}
            />
          </View>
          <View style={styles.subContainer}>
            <View style={styles.subTopContainer}>
              <Image style={styles.posterImage} source={{ uri: url }} />
            </View>
            <View style={styles.subBottomContainer}>
              <View style={styles.upperBottomContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>
              <View style={styles.middleBottomContainer}>
                <View style={{ flex: 0.3 }}>
                  <AirbnbRating
                    count={10}
                    reviews={["", "", "", "", ""]}
                    defaultRating={rating}
                    isDisabled={true}
                    size={RFValue(25)}
                    starContainerStyle={{ marginTop: -30 }}
                  />
                </View>

                <View style={{ flex: 0.7, padding: 15 }}>
                  <Text style={styles.overview}>{text}</Text>
                </View>
              </View>
              <View style={styles.lowerBottomContainer}>
                <View style={styles.iconButtonContainer}>
                  <TouchableOpacity onPress={this.likedArticle}>
                    <Icon
                      reverse
                      name={"check"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#76ff03"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.unlikedArticle}>
                    <Icon
                      reverse
                      name={"cross"}
                      type={"entypo"}
                      size={RFValue(30)}
                      color={"#ff1744"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
    return null;
  }
}


