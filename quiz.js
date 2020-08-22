let questions_list_random = [ ]
let curr_random_question
let curr_question
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
    display_QandA(0);
    document.getElementById("start").style.display = "none";

}
function display_QandA(go){
    if((curr_random_question+go < question.length) && (curr_random_question+go > -1)){
        curr_random_question+=go;
        curr_question = questions_list_random[curr_random_question];
        document.getElementById("question_text").innerHTML = question[curr_question].question;
        document.getElementById("option1").value = question[curr_question].option1;
        document.getElementById("option2").value = question[curr_question].option2;
        document.getElementById("option3").value = question[curr_question].option3;
        document.getElementById("option4").value = question[curr_question].option4;  
        display_buttons();
    }
}
function hide_buttons(){
    document.getElementById("option1").style.display = "none";
    document.getElementById("option2").style.display = "none";
    document.getElementById("option3").style.display = "none";
    document.getElementById("option4").style.display = "none";
    document.getElementById("next").style.display = "none";
    document.getElementById("previous").style.display = "none";
}
function display_buttons(){
    document.getElementById("option1").style.display = "block";
    document.getElementById("option2").style.display = "block";
    document.getElementById("option3").style.display = "block";
    document.getElementById("option4").style.display = "block";
    document.getElementById("next").style.display = "block";
    document.getElementById("previous").style.display = "block";
}
function checkAnswer(button_clicked){
    if(question[curr_question]["option"+button_clicked] == question[curr_question].right_answer){
        alert("right answer");
    }
    else{
        alert("wrong answer");
    }
}

/*TODO
#get the buttons hidden, line 28 (done)
#get questions
#make it look nice
#notify user of correct answer properly
#score of the quiz
#input to take in users name and then display it
#side navbar
#store highscore and stuff
#countdown timer














































































































/*function create_QA(){
    for(i=0;i<5;i++){
        question[i] = {
            "color": "purple",
            "type": "minivan",
            "registration": new Date('2017-01-03'),
            "capacity": i,
            showDetails(){
                alert("color:"+this.color+",capa:"+this.capacity);
            }
            
        }
    }
    alert("created");
}
function display(){
    for(i=0;i<score;i++){
        alert(question[i].capacity);
    }
}
function addQ(){
    question.push({
        "color": "purple",
        "type": "minivan",
        "registration": new Date('2017-01-03'),
        "capacity": score,
        showDetails(){
            alert("color:"+this.question+",capa:"+this.capacity)
        }
    })
    score++;
}
function readTextFile()
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "./sample.txt", false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}*/
