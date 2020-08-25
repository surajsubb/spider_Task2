let questions_list_random = [ ]
let curr_random_question
let curr_question
let score = 0;
let Time = 600;
let timer
function random(mn, mx) {   
    return Math.floor(Math.random() * (mx - mn)) + mn;  
}
function initializequiz(){ // intitialize variables and make the questions in random order
    set_to_zero();
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
    display_buttons("QandA");
    display_class("traverse");
	display_buttons("timer");
    display_QandA(0);
    timer = setInterval("time()",100);
    hide_class("initial");
    for(i=0;i<10;i++){
		display_buttons("n"+i)
	}
}
function display(){ // display questions and options
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
    display_nav_colors();
    document.getElementById("score_text").innerHTML = "Your score is: "+ score + "/10";
}
function display_QandA(go){ // used to go from one question to another
    document.getElementById("QandA").style.border = "3px solid white";
    document.getElementById("QandA").style.backgroundColor = "rgb(23, 23, 163)";
    document.getElementById("navbar").style.border = "2px solid white";
    if(!((curr_random_question+go > -1) && (curr_random_question+go < question.length))){
        return;
    }
    curr_random_question+=go;
    curr_question = questions_list_random[curr_random_question];
    display();
    
}
function go_to(num){ // used by navbar to switch questions
    curr_random_question = num;
    curr_question = questions_list_random[curr_random_question];
    display();
}
function hide_buttons(id){ // hide the element when id is given
    document.getElementById(id).style.display = "none";
}
function display_buttons(id){
    document.getElementById(id).style.display = "block";
}
function hide_class(Class){ // display the element when id is given
    var all = document.getElementsByClassName(Class);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'none';
    }
}
function display_class(Class){ // display the element when id is given
    var all = document.getElementsByClassName(Class);
    for (var i = 0; i < all.length; i++) {
        all[i].style.display = 'block';
    }
}
function checkAnswer(button_clicked){ // check option clicked
    //let right_option
    /*document.getElementById("option1").disabled = true;
    document.getElementById("option2").disabled = true;
    document.getElementById("option3").disabled = true;
    document.getElementById("option4").disabled = true; */
    question[curr_question].answered = true;
    if(question[curr_question]["option"+button_clicked] == question[curr_question].right_answer){
        score++;
        var x = document.getElementById("correct_sound");
        x.play();
        document.getElementById("score_text").innerHTML = "Your score is: "+ score + "/10";
    }
    else{
        var x = document.getElementById("wrong_sound");
        x.play();
    }
    question[curr_question].option_answered = button_clicked;
    display_answer_colors(button_clicked);
    answered_all();
}
function display_answer_colors(button_clicked){ // display the colour when option is clicked
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
function display_nav_colors(){ // display navbar colors
    for(i=0;i<questions_list_random.length;i++){
        num = questions_list_random[i];
        option_num = question[num].option_answered
        if(question[num].answered == true){
            if(question[num]["option"+option_num] == question[num].right_answer){
                document.getElementById("n"+i).style.background = "green";
            }
            else{
                document.getElementById("n"+i).style.background = "red";
            }
        }
        else{
            document.getElementById("n"+i).style.background = "black";
        }

    }
    document.getElementById("n"+curr_random_question).style.background = "rgb(100,100,100)";
}
function answered_all(){ // to check if all the questions are answered
    for(i=0;i<question.length;i++){
        if(question[i].answered == false)
            return;
    }
    endgame(1);
}
function endgame(num){ // disables all the buttons and calls button to view score
    if(num == 0){
        document.getElementById("questions_answered").innerHTML = "Time has run out";
        document.getElementById("option1").disabled = true;
        document.getElementById("option2").disabled = true;
        document.getElementById("option3").disabled = true;
        document.getElementById("option4").disabled = true;
        document.getElementById("next").disabled = true;
        document.getElementById("previous").disabled = true;
        for(i=0;i<questions_list_random.length;i++){
            document.getElementById("n"+i).disabled = true;
        }
    }
    else{
        document.getElementById("questions_answered").innerHTML = "All questions have been answered";
        clearInterval(timer);
    }
    display_buttons("endgame");
    hide_buttons("question");
    hide_buttons("navbar");
    hide_class("choices");
}
function view_score(){ // shows score and time taken 
    hide_buttons("QandA");
    hide_class("traverse");
    hide_buttons("score");
    document.getElementById("questions_answered").innerHTML = "";
    document.getElementById("score_text").innerHTML = "Your score is: "+ score + "/10";
    document.getElementById("time").innerHTML = "Time taken: " + ((600-Time)/10) + " sec";
    store_score(score);
    get_score();
}
function time(){// times the quiz
    document.getElementById("time").innerHTML = "Time left(sec): " + ((--Time)/10);
    if(Time == 0){
        clearInterval(timer);
        endgame(0);
    }
}
function keyDown(e) { // checks if right(D) or left (A) key is clicked
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
function store_score(score = "undefined"){
    for( i = 0 ; i < 5 ; i++){
        let temp = localStorage.getItem(i+"score");
        if((score >= temp )||(temp === "0")){
            for( j = i ; j < 4 ; j++){
                temp1=localStorage.getItem((j+1)+"score")
                localStorage.setItem((j+1)+"score",temp);
                temp=temp1;
            }
            localStorage.setItem(i+"score",score);
            break;
        }
    }
}
function get_score(){
    for(i = 0 ; i < 5 ; i++){
        document.getElementById(i+"score").innerHTML = localStorage.getItem(i+"score");
        //alert(document.getElementById(i+"score").innerHTML);
    }
}
function set_to_zero(def = 0){
    if((localStorage.getItem("initialize") != 0)||(def == 1)){
        for( i = 0 ; i < 5 ; i++){
            localStorage.setItem(i+"score", "0");
        }
        localStorage.setItem("initialize",0);
    }
    get_score();
    
}

/*TODO
#get the buttons hidden, line 28 (done)
#get questions (done?)
#make it look nice(ig)
#notify user of correct answer properly(done)
#score of the quiz(done)
#input to take in users name and then display it
#side navbar(done)
#store highscore and stuff (done)
#countdown timer(done)
*/