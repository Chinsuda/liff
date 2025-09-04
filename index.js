// Import stylesheets
//import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)
  await document.addEventListener('DOMContentLoaded', function() {
      liff.init({
          liffId: '1661100032-Ab3BWnO7' })
      .then(() => {
        if (!liff.isInClient()) {
          if (liff.isLoggedIn()) {
            btnLogIn.style.display = 'none';
            btnLogOut.style.display = 'block';
            btnScanCode.style.display = 'none';
            getUserProfile();
          } else {
            if(btnLogIn){
              btnLogIn.style.display = 'block';          
            }
            if(btnLogOut){            
              btnLogOut.style.display = 'none';
            }
            btnScanCode.style.display = 'none';
          }
        } else {
          getUserProfile();
          btnScanCode.style.display = 'none';
        }
        //if (liff.isInClient() && liff.getOS() === 'android') {
        //  btnScanCode.style.display = 'block';
        //}
        //if (liff.isInClient()) {
        //  btnScanCode.style.display = 'block';
        //}
      })
      .catch((error) => {
        console.error(error);

      });

      
  });
  //await liff.init({ liffId: '2000120563-DZWYdEYG' });
  // Try a LIFF function
  // switch (liff.getOS()) {
  //   case 'android':
  //     body.style.backgroundColor = '#d1f5d3';
  //     break;
  //   case 'ios':
  //     body.style.backgroundColor = '#eeeeee';
  //     break;
  // }
  // Try a LIFF function
  async function getUserProfile() {
    const profile = await liff.getProfile();
    pictureUrl.src = profile.pictureUrl;
    //userId.innerHTML = '<b>userId:</b> ' + profile.userId;
    //statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
    displayName.innerHTML =
      '<b>สวัสดีค่ะ คุณ</b> ' +
      profile.displayName +
      '</br> <b>Liff ID:</b> ' + profile.userId ;
  }
}
main();

if(btnLogIn){
  btnLogIn.onclick = () => {
    liff.login();
  };
}
if(btnLogOut){
  btnLogOut.onclick = () => {
    liff.logout();
    window.location.reload();
  };
}
async function scanCode() {
  const result = await liff.scanCode();
  const profile = await liff.getProfile();
  //code.innerHTML = '<b>Code: </b>' + result.value + '&l=' + profile.userId;
  liff.openWindow({
    url: result.value + '&l=' + profile.userId,
    external: false,
  });
  liff.closeWindow();
}
async function scanCodeV2() {
  try {
    const result = await liff.scanCodeV2();
    const profile = await liff.getProfile();
    //document.querySelector('#result').innerHTML = result.value;
    if (liff.isInClient()){
      if (liff.getOS() == 'android'){
       
        code.innerHTML = '<a href="'+result.value + '&l=' + profile.userId+'" >คลิกเพื่อเข้าร่วม</a>';
      }else{
        code.innerHTML = '<a href="'+result.value + '&l=' + profile.userId+'" >คลิกเพื่อเข้าร่วม</a>';
      }
      
      //code.innerHTML = result.value + '&l=' + profile.userId;
    }else{
    code.innerHTML = result.value + '&l=' + profile.userId; 
    }
  } catch(error) {
    console.log('scanCodeV2', error);
  }
}
if(btnScanCode){
  btnScanCode.onclick = () => {
    if (liff.getOS() == 'android'){
      //scanCode();
      scanCodeV2();
    }else{
      scanCodeV2();
    }
    //window.location='https://line.me/R/nv/QRCodeReader';
  };
}
async function sendMsg() {
  if (liff.getContext().type !== "none") {
    await liff.sendMessages([
      {
        "type": "text",
        "text": "This message was sent by sendMessages()"
      }
    ]);
    liff.closeWindow();
  }
}

