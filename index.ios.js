
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import englishWords from './english-words.json';
import { getWordsFound } from './spellCheckUtil';


class SpellChecker extends Component {
  constructor() {
    super();

    this.state = {
      wordInput: '',
      searchResults: [],
      didSearch: null
    }

  }
  
  findMatches() {
    if (this.state.wordInput) {
      
      var wordsFound = getWordsFound(this.state.wordInput, englishWords, 0.60);

      let topTenResults = [];

      for (var i = 0; i < 10; i++) {
        if (wordsFound[i]) {                    
          topTenResults.push(wordsFound[i].word);
        }
      }      

      this.setState({
        searchResults: topTenResults,
        didSearch: true
      });
    
    }
  }

  renderSearchResults() {       
    return this.state.searchResults.map( (result, i) => {       
      return (        
        <View key={ i }>         
          <Text>{ result }</Text>
        </View>        
      )
    })          
  }

  renderSearchLabel() {
    if (this.state.didSearch && this.state.searchResults.length > 1) {
      return (
        <View style={{ alignItems: 'center', padding: 5 }}>
          <Text style={ {fontWeight: 'bold' } }>Top 10 Suggestions </Text>
        </View>
      )
    }
  }

  render() {
    return (
      <View style={ styles.container }>        
        <View style={ styles.titleView }>
          <Text style={ styles.titleText }>Spell Checker</Text>          
        </View>            
        <View style={ styles.inputView }> 
          <TextInput 
            style={ styles.wordInput } 
            value={ this.state.wordInput }
            onChangeText={ wordInput => this.setState({ wordInput })}
            placeholder={ ' Word to Search... '} />
          <TouchableOpacity
            style={ styles.button }
            onPress={ this.findMatches.bind(this) } >
            <Text style={ styles.buttonText }>Enter</Text>
          </TouchableOpacity>           
          { this.renderSearchLabel() }             
          { this.renderSearchResults() }
        </View>         
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',    
    padding: 20
  },

  titleView: {
    flex: 3,        
    justifyContent: 'center',
    margin: 10    
  },

  titleText: {
    textAlign: 'center',
    fontSize: 40
  },

  inputView: {
    flex: 7
  },

  wordInput: {    
    height: 40,    
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',    
    borderWidth: 2,
    borderRadius: 5
  },

  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: '#CCCCCC',
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },

  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
 
});

AppRegistry.registerComponent('SpellChecker', () => SpellChecker);
