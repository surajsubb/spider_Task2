function print_grid(mode,limit = 20){
    set_to_zero(mode);
    if(mode=='e'){
        clearTimeout(reply_click.myval_e);
        increment.value_e = 0;
        reply_click.new_e=0;
    }
    else{
        clearInterval(reply_click.myval_n);
        increment.value_n = 0;
        reply_click.new_n=0;
    }
    reply_click.myval_e
    document.getElementById("timer"+mode).innerHTML =  "Timer: "+0;	
    document.getElementById("score"+mode).innerHTML =  "Score: "+0;
    document.getElementById("new_game"+mode).value = "New Game";
    let arr = [ ];
    for(i = 1; i <= limit ; i++){
        arr[i-1]=i;
    }
    if(mode == 'e'){
        for(let i = 0 ; i <= limit ; i++){
        let ran = random(0,limit-i);
        let number = document.getElementById((i+1)+mode);
        number.value = arr[ran];
        number.style.backgroundColor = `rgb(${255-number.value*14},${255-number.value*14},${255-number.value*14})`;
        arr.splice(ran,1);
        }
    }
    else{
        for(let i = 0 ; i <= limit ; i++){
        let ran = random(0,limit-i);
        let number = document.getElementById((i+1)+mode);
        number.value = arr[ran];
        number.style.backgroundColor = `rgb(${255-number.value*6},${255-number.value*6},${255-number.value*6})`;
        arr.splice(ran,1);
    }
}
}
function intitialize_grid(){
print_grid('n',20)
print_grid('e',9)
}
function random(mn, mx) {  
    return Math.floor(Math.random() * (mx - mn)) + mn;  
}
function reply_click(clicked_id,mode){
    let number = document.getElementById(clicked_id);
    if(mode=='n'){
        if (( typeof reply_click.count_n == 'undefined' ) || (reply_click.new_n != 1)){
            reply_click.count_n = 21;
            reply_click.check_n=1;
            reply_click.new_n=1
            reply_click.mode_n = 'n';
            if(reply_click.check_n == number.value){
                change_number(number,mode);
            }
            else{
                document.getElementById('error').play();
            }
        }
        else if (reply_click.check_n != number.value){
            document.getElementById('error').play();
        }
        else if (reply_click.count_n  > 40){
            if (number.value == 40){
                clearInterval(reply_click.myval_n);		
                score_n = increment('n',1);
                store_score(mode,score_n);
                get_score(reply_click.mode_n);
                document.getElementById("new_gamen").value = "Play Again";
                document.getElementById("scoren").innerHTML = "Score: "+score_n;
                document.getElementById("timern").innerHTML =  "Timer: "+0;
            }
            number.value = " ";
            number.style.backgroundColor = "rgb(0,0,0)";
            reply_click.check_n++;
        }
        else{
            change_number(number,mode);
        }
    }
    else{
        if (( typeof reply_click.count_e == 'undefined' ) || (reply_click.new_e != 1)){
            reply_click.count_e = 10;
            reply_click.check_e=1;
            reply_click.new_e=1;
            reply_click.mode_e = 'e';
            if(reply_click.check_e == number.value){
                change_number(number,mode);
            }
            else{
                document.getElementById('error').play();
            }
        }
        else if (reply_click.check_e != number.value){
            document.getElementById('error').play();
        }
        else if (reply_click.count_e > 18){
            if (number.value == 18){
                clearInterval(reply_click.myval_e);		
                score_e = increment('e',1);
                store_score(mode,score_e);
                get_score(mode);
                document.getElementById("new_gamee").value = "Play Again";
                document.getElementById("scoree").innerHTML = "Score: "+score_e;
                document.getElementById("timere").innerHTML =  "Timer: "+0;
            }
            number.value = " ";
            number.style.backgroundColor = "rgb(0,0,0)";
            reply_click.check_e++;
        }
        else{
            change_number(number,mode);
        }
    
    }
}
function change_number(number,mode){
    if(mode =='e'){
        if(reply_click.check_e == 1){
            reply_click.myval_e = setInterval("increment('e',0)", 100);
            document.getElementById("new_gamee").value = "Reset Game";
        }	
        number.value = reply_click.count_e;
        reply_click.count_e++;
        reply_click.check_e++;
        number.style.backgroundColor = `rgb(${255-number.value*14},${255-number.value*14},${255-number.value*14})`;
        
    }
    else{
        if(reply_click.check_n == 1){
            reply_click.myval_n = setInterval("increment('n',0)", 100);
            document.getElementById("new_gamen").value = "Reset Game";
        }	
        number.value = reply_click.count_n;
        reply_click.count_n++;
        reply_click.check_n++;
        number.style.backgroundColor = `rgb(${255-number.value*6},${255-number.value*6},${255-number.value*6})`;
    }
}
function increment(mode,end = 0){
    if(mode == "e"){
        if ( typeof increment.value_e == 'undefined' ){
            increment.value_e = 0;
        }
        document.getElementById("timer"+mode).innerHTML = "Timer: "+((++increment.value_e)/10);
        if(end != 0){
            let score = (--increment.value_e)/10;
            increment.value_e=0;
            return score;	
        }
    }
        
    if(mode == "n"){
        if ( typeof increment.value_n == 'undefined' ){
            increment.value_n=0;
        }
        document.getElementById("timer"+mode).innerHTML = "Timer: "+((++increment.value_n)/10);
        if(end != 0){
            let score = (--increment.value_n)/10;
            increment.value_n=0;
            return score;	
        }
    }
    
}
function store_score(mode,score = "undefined"){
    for( i = 0 ; i < 5 ; i++){
        let temp = localStorage.getItem(i+mode+"time");
        if((score <= temp )||(temp === "0")){
            for( j = i ; j < 4 ; j++){
                temp1=localStorage.getItem((j+1)+mode+"time")
                localStorage.setItem((j+1)+mode+"time",temp);
                temp=temp1;
            }
            localStorage.setItem(i+mode+"time",score);
            break;
        }
    }
}
function get_score(mode){
    for(i = 0 ; i < 5 ; i++){
        document.getElementById(i+mode+"time").innerHTML = localStorage.getItem(i+mode+"time");
    }
}
function set_to_zero(mode,def = 0){
    if((localStorage.getItem("set") == null)||(def == 1)){
        for( i = 0 ; i < 5 ; i++){
            localStorage.setItem(i+mode+"time", "0");
        }
        localStorage.setItem("set",0);
    }
    get_score(mode);
    
}
function modes(eve,mode){
    var tabcontent, tablinks
    document.getElementById("firstclick").style.display = 'none';
    tabcontent = document.getElementsByClassName("tabcontent");
    var i;
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(mode).style.display = "block";
    eve.currentTarget.className += " active";
}
