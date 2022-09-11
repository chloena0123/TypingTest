var wordbyword = ["Cherish","every", "moment!",,
"The", "best", "time", "for", "new", "beginnings", "is", "now.",,
"All", "you", "need", "in", "this", "life", "is", "ignorance", "and", "confidence,", "and", "then", "success", "is", "sure.",,
"The", "secret", "of", "getting", "ahead", "is", "getting", "started.",,
"Wrinkles", "should", "merely", "indicate", "where", "smiles", "have", "been.",,
"Sometimes,", "it", "takes", "a", "good", "fall", "to", "really", "know", "where", "we", "stand.",,
"Keep", "your", "face", "to", "the", "sunshine", "and", "you", "cannot", "see", "a", "shadow.",,
"All", "the", "world", "is", "full", "of", "suffering.", "It", "is", "also", "full", "of", "overcoming.",,
"Strive", "not", "to", "be", "a", "success,", "but", "rather", "to", "be", "of", "value.",,
"This", "is", "no", "time", "for", "ease", "and", "comfort.",,
"It", "is", "time", "to", "dare", "and", "endure.",,
"It", "is", "always", "wise", "to", "look", "ahead,", "but", "difficult", "to", "look", "further", "than", "you", "can", "see.",, 
"Love", "is", "too", "young", "to", "know", "what", "conscience", "is.",,
"The", "future", "influences", "the", "present", "just", "as", "much", "as", "the", "past.",,
"To", "forget", "one's", "purpose", "is", "the", "commonest", "form", "of", "stupidity.",,
"Life", "is", "as", "tedious", "as", "twice-told", "tale,", "vexing", "the", "dull", "ear", "of", "a", "drowsy", "man.",,
];
var count = 0;
var num = 0;
//var arrIndex = 0;
var check = true;
var correct = 0;
var incorrect = 0;
var word ="";
//var len = 0;

/*
    construct page
    display first line to type in black; the next line in grey.
    give autofocus to <input> for user to start typing right away.
    class "words" is set to display: none;
*/
window.onload = function() {
    var divs = document.getElementsByClassName("words");
    var textboxes = document.getElementsByClassName("box");
    textboxes[0].style.display = "block";
    textboxes[0].focus();
    divs[0].style.display = "block";
    divs[1].style.display = "block";
    divs[1].style.color ="darkgrey";

    var seconds = 60;
    var min = 3;
    var timecopy = 180;
    var wpm;
    var accuracy;
    var Timer = setInterval(function(){
        if(seconds == 60){
            document.getElementById("timer").innerHTML = min + ":00";
            min--;
        } 
        else if(seconds < 10) {
            document.getElementById("timer").innerHTML = min +":0" + seconds;
        }
        else {
            document.getElementById("timer").innerHTML = min+ ":" + seconds;
        }
        
        if(seconds == 0 && min != 0) {
            seconds = 60;
            min--;
        }
    
        seconds--;
    

        if(seconds == -1) {
            check = false;
            for(i = 0; i < textboxes.length; i++) {
                textboxes[i].disabled = true;
            }
            document.getElementById('main').style.display = "block";
            clearInterval(Timer);
            wpm = (correct+incorrect)*(60/timecopy);
            accuracy = correct/(correct+incorrect);
            swal({
                title: parseInt(wpm) +" WPM and " + parseInt(accuracy*100) + "% Accuracy",
                closeOnClickOutside: false,
                allowEnterKey: false
            } );
        }
    },1000);
}


var textboxes = document.getElementsByClassName("box");
var divs = document.getElementsByClassName("words");

$(window).keypress(
    function(event) {
    if(event.which == 32 && check) {

        // word is input received in textbox
        word = textboxes[num].value; 

        if(wordbyword[count] != null) {
            spellCheck(wordbyword[count].trim(), word.trim());
            count++; 
        }
        // if element is null, skip that element and spell check with
        // the next corresponding element
        else{ 
            count++;
            spellCheck(wordbyword[count].trim(), word.trim());
            count++;
        }
        // let textbox contain an empty string after receiving each word
        textboxes[num].value = "";  

        // if next element in wordbyword is null, that indicates the end of a sentence
        // remove previous line and display the next line in black, while dispalying the upcoming line in grey
        if(wordbyword[count] == null) {
            textboxes[num].style.display = "none";
            divs[num].style.display = "none";
            num++;
            textboxes[num].style.display = "block";
            textboxes[num].focus();

            divs[num].style.display = "block";
            divs[num].style.color = "black";
            divs[num+1].style.display = "block";
            divs[num+1].style.color = "darkgrey";
        }
    
    
    }

});



/* 
    checks if two strings are equal
    if true, the word changes colour to green
    else, to red
    counts the number of each incorrect/corect word to calculate accuracy
*/
function spellCheck(str1, str2) {
    if(str1.trim() == str2.trim()) {
        $("#"+count).toggleClass("right");
        correct++;
    }
    else {
        $("#"+count).toggleClass("wrong");
        incorrect++;
    }
}