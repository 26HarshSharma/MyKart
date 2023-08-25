import{initializeApp as e}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";import{getDatabase as t,ref as s,push as l,onValue as a,remove as n}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";import{getAuth as i}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";import{getFirestore as o,collection as d,query as r,where as p,getDocs as y}from"https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";let appSettings={databaseURL:"https://fir-38a44-default-rtdb.europe-west1.firebasedatabase.app/",apiKey:"AIzaSyBAMn46OvYvoxI1STttMBW2QQzNMkVK3QI",authDomain:"fir-38a44.firebaseapp.com",projectId:"fir-38a44",storageBucket:"fir-38a44.appspot.com",messagingSenderId:"964306008147",appId:"1:964306008147:web:442519f6ed3319679eaea6",measurementId:"G-XQP42QYYH5"};document.getElementById("preloader").style.display="block",document.getElementById("loader-container").style.display="block";let app=e(appSettings),database=t(app),auth=i(),fireDB=o(),colref=d(fireDB,"customer"),products=document.getElementById("products"),add=document.getElementById("add"),list=document.getElementById("list"),logout=document.getElementById("logout");function insertProducts(e,t){let s=e[0],l=e[1],a=document.createElement("li");a.textContent=`${l}`,a.classList.add("list-items"),a.addEventListener("click",()=>removeProducts(s,t)),list.append(a)}let removeProducts=(e,t)=>{let l=s(database,`products/${t}/${e}`);n(l)};function clearInputField(){products.value=""}function clearList(){list.innerHTML=""}function loggedInUser(e,t){let n;auth.onAuthStateChanged(e=>{null!==e&&(n=e.uid,t&&profile(n))}),setTimeout(function(){let t=s(database,`products/${n}`);""!==e&&l(t,e),a(t,function(e){if(!e.exists()){list.innerHTML="No items here...yet";return}let t=Object.entries(e.val());for(let s of(clearList(),t))insertProducts(s,n)})},0)}async function profile(e){let t=r(colref,p("id","==",`${e}`)),s=await y(t);0!==s.length&&s.forEach(e=>{try{document.getElementById("profile-name").style.display="block",document.getElementById("profile-name").textContent=e.data().Name,document.getElementById("preloader").style.display="none",document.getElementById("loader-container").style.display="none"}catch(t){console.log("Error:",t)}})}loggedInUser("",!0),add.addEventListener("click",()=>{let e=products.value;if(""===e){document.getElementsByClassName("disp")[0].style.display="block",setTimeout(function(){document.getElementsByClassName("disp")[0].style.display="none"},3e3);return}clearInputField(),loggedInUser(e,!1)}),logout.addEventListener("click",e=>{e.preventDefault(),auth.signOut().then(()=>{document.getElementById("user-sign-out").style.display="block",setTimeout(function(){document.getElementById("user-sign-out").style.display="none"},3e3),document.getElementById("pro-pic").style.display="none"})}),auth.onAuthStateChanged(e=>{if(null===e){list.style.display="none",add.style.display="none",products.style.display="none",document.getElementById("profile-name").style.display="none";let t=document.createElement("p");t.textContent="Please login to add or see products :)",document.getElementsByClassName("products-list")[0].append(t),logout.style.display="none",document.getElementById("login").style.display="block",document.getElementById("signUp").style.display="block"}else list.style.display="block",add.style.display="inline",products.style.display="block",logout.style.display="block",document.getElementById("login").style.display="none",document.getElementById("signUp").style.display="none",loggedInUser("",!0,e.uid)});