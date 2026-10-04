const paginas=document.querySelectorAll(".pagina");

document.querySelectorAll("nav button").forEach(boton=>{
boton.addEventListener("click",()=>{
paginas.forEach(p=>p.classList.remove("activa"));
document.getElementById(boton.dataset.pagina).classList.add("activa");
});
});

const imagenes={
redbull:"https://upload.wikimedia.org/wikipedia/commons/f/f3/Red_Bull_Racing_RB22_of_Max_Verstappen_%28028A8078%29.jpg",
mercedes:"https://upload.wikimedia.org/wikipedia/commons/2/2c/Mercedes_W17_-_George_Russell_exits_the_final_chicane_at_Suzuka_during_the_2026_Japanese_GP_%2855195432314%29.jpg",
verstappen:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Max_Verstappen_%2833964170645%29.jpg",
hadjar:"https://upload.wikimedia.org/wikipedia/commons/7/75/Isack_Hadjar_at_the_Melbourne_Walk_during_the_2026_Australian_Grand_Prix_%28028A8753%29_%28cropped%29.jpg",
russell:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/2026_Chinese_GP_-_Mercedes_-_George_Russell_-_Qualifying.jpg/1280px-2026_Chinese_GP_-_Mercedes_-_George_Russell_-_Qualifying.jpg",
antonelli:"https://upload.wikimedia.org/wikipedia/commons/c/cd/2026_Chinese_GP_-_Mercedes_-_Kimi_Antonelli_-_Post_Race_Celebration.jpg"
};

const equipos={
mercedes:{auto:"Mercedes W17",pilotos:["George Russell","Kimi Antonelli"],imagen:imagenes.mercedes},
redbull:{auto:"Red Bull RB22",pilotos:["Max Verstappen","Isack Hadjar"],imagen:imagenes.redbull}
};

modelo.addEventListener("change",()=>{
fotoAuto.src=modelo.value==="Mercedes W17"?imagenes.mercedes:imagenes.redbull;
});

nombreEscuderia.addEventListener("change",()=>{
fotoEscuderia.src=nombreEscuderia.value==="Mercedes"?imagenes.mercedes:imagenes.redbull;
});

piloto.addEventListener("change",()=>{
const fotos={
"Max Verstappen":imagenes.verstappen,
"Isack Hadjar":imagenes.hadjar,
"George Russell":imagenes.russell,
"Kimi Antonelli":imagenes.antonelli
};
if(fotos[piloto.value])fotoPiloto.src=fotos[piloto.value];
});

relEscuderia.addEventListener("change",()=>{
const equipo=equipos[relEscuderia.value];
if(!equipo)return;
relAuto.innerHTML=`<option>${equipo.auto}</option>`;
relPiloto1.innerHTML='<option value="">Selecciona</option>';
relPiloto2.innerHTML='<option value="">Selecciona</option>';
equipo.pilotos.forEach(p=>{
relPiloto1.innerHTML+=`<option>${p}</option>`;
relPiloto2.innerHTML+=`<option>${p}</option>`;
});
fotoRelacion.src=equipo.imagen;
});

relPiloto2.addEventListener("change",()=>{
if(relPiloto1.value===relPiloto2.value){
alert("Selecciona un piloto diferente");
relPiloto2.value="";
}
});

document.querySelectorAll("form").forEach(form=>{
form.addEventListener("submit",e=>{
e.preventDefault();
const datos=Object.fromEntries(new FormData(form));
console.log(datos);
localStorage.setItem(form.id,JSON.stringify(datos));
alert("Datos guardados correctamente");
});
});