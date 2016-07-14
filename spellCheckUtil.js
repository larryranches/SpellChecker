import _ from 'lodash';

export function calculateDistance(a, b) {
  
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length]; 
}

export function getWordsFound(wordInput, wordList, fuzzyness) {

  var wordsFound = [];

  for (var i = 0; i < wordList.length; i++) {

    // calculate Levenschtein distance
    var distance = calculateDistance(wordInput, wordList[i]);      

    var maxLength = Math.max(wordInput.length, wordList[i].length);    

    var score = 1.0 - distance / maxLength;    

    if (score > fuzzyness) {
      wordsFound.push(
        { 
          word: wordList[i],
          score
        });      
    }    
  }

  // sort found words by highest score
  var wordsFoundsorted = _.orderBy(wordsFound, ['score'], ['desc']);

  return wordsFoundsorted;
}