let questions_list_random = [ ]
let curr_random_question
let curr_question
let score = 0;
function random(mn, mx) {   
    return Math.floor(Math.random() * (mx - mn)) + mn;  
}
function initializequiz(){
    curr_random_question = 0;
    let questions_list = [ ]
    for(i=0;i<question.length;i++){
        questions_list[i] = i;
    }
    for(i=0;i<question.length;i++){
        qnum = random(0,questions_list.length)
        questions_list_random[i] = questions_list[qnum];
        questions_list.splice(qnum,1);
    }
    document.addEventListener('keydown', keyDown, false);
    display_QandA(0);
    hide_class("initial");

}
function display_QandA(go){
    if(!((curr_random_question+go > -1) && (curr_random_question+go < question.length))){
        return;
    }
    curr_random_question+=go;
    curr_question = questions_list_random[curr_random_question];
    if(question[curr_question].answered == false){
        document.getElementById("option1").disabled = false;
        document.getElementById("option2").disabled = false;
        document.getElementById("option3").disabled = false;
        document.getElementById("option4").disabled = false; 
        for(i=0;i<4;i++){
            document.getElementById("option"+(i+1)).style.background = "black";
        }
    }
    else{
        display_answer_colors(question[curr_question].option_answered);
    }
        document.getElementById("question_text").innerHTML = question[curr_question].question;
        document.getElementById("option1").value = question[curr_question].option1;
        document.getElementById("option2").value = question[curr_question].option2;
        document.getElementById("option3").value = question[curr_question].option3;
        document.getElementById("option4").value = question[curr_question].option4;  
        display_buttons("next");
        display_buttons("previous");
        for(i=0;i<4;i++){
            if(question[curr_question]["option"+(i+1)] != " "){
                display_buttons("option"+(i+1))
            }
            else{
                hide_buttons("option"+(i+1))
            }
        }
}
function hide_buttons(id){
    document.getElementById(id).style.display = "none";
}
function display_buttons(id){
    document.getElementById(id).style.display = "block";
}
function hide_class(Class){
    var all = document.getElementsByClassName(Class);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}
function checkAnswer(button_clicked){
    //let right_option
    /*document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true; */
    question[curr_question].answered = true;
    if(question[curr_question]["option"+button_clicked] == question[curr_question].right_answer){
        score++;
    }
    question[curr_question].option_answered = button_clicked;
    display_answer_colors(button_clicked);
    answered_all();
}
function display_answer_colors(button_clicked){
    document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true;
    for(i=0;i<4;i++){
        document.getElementById("option"+(i+1)).style.background = "black";
    }
    for(i=0;i<4;i++){
        if(question[curr_question]["option"+(i+1)] == question[curr_question].right_answer){
            right_option = "option"+(i+1);
        }
    }
    if(question[curr_question]["option"+button_clicked] == question[curr_question].right_answer){
        document.getElementById("option"+button_clicked).style.background = "green";
    }
    else{
        document.getElementById("option"+button_clicked).style.background = "red";
        document.getElementById(right_option).style.background = "green";
    }
}
function answered_all(){
    for(i=0;i<question.length;i++){
        if(question[i].answered == false)
            return;
    }
    endgame();
}
function endgame(){
    document.getElementById("score_text").innerHTML = "All questions have been answered";
    display_buttons("endgame");
}
function view_score(){
    hide_class("QandA");
    hide_class("traverse");
    hide_buttons("score");
    document.getElementById("score_text").innerHTML = "Score: "+ score;
}
function keyDown(e) {
    if ((e.keyCode == 37)|| (e.keyCode == 65)){ //left arrow and A
        //if(upKey == true){
            document.getElementById("previous").click();
        //}
    }
    else if ((e.keyCode == 39)|| (e.keyCode == 68)){ //right arrow and D
        //if(upKey == true){
            document.getElementById("next").click();
         //  }
        
    }
}

/*TODO
#get the buttons hidden, line 28 (done)
#get questions (done?)
#make it look nice
#notify user of correct answer properly(done)
#score of the quiz
#input to take in users name and then display it
#side navbar
#store highscore and stuff
#countdown timer
*/