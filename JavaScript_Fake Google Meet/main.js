let big_person = document.getElementsByClassName("big_person")[0];
let other_people = document.getElementsByClassName("other_people")[0];
let small_people = document.getElementsByClassName("small_people");

let function_pin = document.getElementsByClassName("function_pin");
let function_pin_slash = document.getElementsByClassName("function_pin_slash")[0];
let name_icon = document.getElementsByClassName("name_icon");
let exit = document.getElementsByClassName("exit");
let mute = document.getElementsByClassName("mute")[0];
let add = document.getElementsByClassName("add")[0];
let left = document.getElementsByClassName("left")[0];

let pinperson = "p0";
let exitperson = "none";
let num = 6;
let red = 1;

big_person.getElementsByClassName("exit")[0].style.visibility = "hidden";
setInterval(() => {left.innerHTML = new Date().toLocaleString('zh-Hant', {timeStyle: 'short',}) + " | Web Programming";}, 1000);

function Layout() {
    if(pinperson === "none"){
        other_people.style = "width: 1480px; height: 630px;";
        for(let i = 0; i < 15; i++){
            if(num <= 3){
                small_people.item(i).style.width = 1400/num + "px";
                small_people.item(i).style.height = 600 + "px";
            }else if(num === 4){
                small_people.item(i).style.width = "500px";
                small_people.item(i).style.height = "290px";
            }else if(num <= 8){
                small_people.item(i).style.width = 2800/(num+1) + "px";
                small_people.item(i).style.height = "290px";
            }else if(num <= 12){
                small_people.item(i).style.width = "350px";
                small_people.item(i).style.height = "190px";
            }else if(num <= 15){
                small_people.item(i).style.width = "270px";
                small_people.item(i).style.height = "160px";
            }
        }
    }else if(num === 1){
        CancelPin();
    }else{
        for(let i = 0; i < 15; i++){
            if(num <= 4){
                big_person.style = "width: 1050px; height: 600px";
                other_people.style = "width: 430px; height: 600px;";
                small_people.item(i).style.width = "360px";
                small_people.item(i).style.height = "180px";
            }else if(num <= 9){
                big_person.style = "width: 1050px; height: 600px";
                other_people.style = "width: 430px; height: 600px;";
                small_people.item(i).style.width = "200px";
                small_people.item(i).style.height = 1098/(num-1+(num-1)%2) + "px";
            }else if(num <= 13){
                big_person.style = "width: 820px; height: 600px";
                other_people.style = "width: 630px; height: 630px;";
                small_people.item(i).style.width = "200px";
                small_people.item(i).style.height = "140px"
            }else if(num <= 15){
                big_person.style = "width: 680px; height: 600px";
                other_people.style = "width: 800px; height: 630px;";
                small_people.item(i).style.width = "180px";
                small_people.item(i).style.height = "140px";
            }
        }
    }
}

function CancelPin() {
    big_person.style.display = "none";
    document.getElementById(pinperson).style.display = "flex";
    pinperson = "none";
    Layout();
}
function_pin_slash.addEventListener("click", CancelPin);

function SetPin(p) {
    if(pinperson === "none"){
        pinperson = "p" + p;
        big_person.style.display = "flex";
        big_person.innerHTML = document.getElementById(pinperson).innerHTML;
        function_pin_slash = big_person.getElementsByClassName("function_pin")[0];
        function_pin_slash.className = "function_pin_slash";
        function_pin_slash.innerHTML = `<img class = "pin_slash" src = "./icon/pin_slash.png">`;
        function_pin_slash.addEventListener("click", CancelPin);
        big_person.getElementsByClassName("exit")[0].addEventListener("click", () => {exitperson = pinperson; PersonExit();});
        if(pinperson === "p0")
            big_person.getElementsByClassName("exit")[0].style.visibility = "hidden";

        other_people.style = "width: 430px; height: 630px";
        document.getElementById(pinperson).style.display = "none";
        Layout();
    }
}
for(let i = 0; i < 15; i++){
    function_pin.item(i).addEventListener("click", () => {SetPin(i);});
}

function PersonExit(){
    if(exitperson === pinperson){
        big_person.style.display = "none";
        pinperson = "none";
        Layout();
    }else{
        document.getElementById(exitperson).style.display = "none";
        Layout();
    }
    num--;
    exitperson = "none";
}
for(let i = 2; i <= 15; i++){
    exit.item(i).addEventListener("click", () => {exitperson = "p" + (i-1); PersonExit();});
}

function AddPerson(){
    for(let i = 0; i < 15; i++){
        let p = "p" + i;
        if(window.getComputedStyle(small_people.item(i)).display === "none" && p !== pinperson){
            small_people.item(i).style.display = "flex";
            num++;
            Layout();
            break;
        }
    }
}
add.addEventListener("click", AddPerson);

function ChangeMuteMode() {
    if(red === 1){
        mute.style.background = "#3C4043";
        mute.title = "關閉麥克風(Ctrl+D)";
        mute.firstElementChild.innerHTML = `<span class="material-icons">mic</span>`;
        red = 0;
    }else{
        mute.style.background = "red";
        mute.title = "開啟麥克風(Ctrl+D)";
        mute.firstElementChild.innerHTML = `<span class="material-icons">mic_off</span>`;
        red = 1;
    }
}
mute.addEventListener("click", ChangeMuteMode);