const salida = document.querySelector("#salida");
const microfono = document.querySelector("#microfono");

microfono.addEventListener("click", ejecutarSpeechAPI);

function ejecutarSpeechAPI() {
  const SpeechRecognition = webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.start();

  recognition.onstart = function () {
    salida.classList.remove("ocultar");
    salida.classList.add("mostrar");
    salida.textContent = "Te escucho...";
  };

  recognition.onspeechend = function () {
    salida.textContent = "Se paro la grabación...";
    recognition.stop();
  };

  recognition.onresult = function (e) {
    const { confidence, transcript } = e.results[0][0];
    const speech = document.createElement("p");
    speech.innerHTML = `TRANSCRIPCIÓN: ${transcript}`;
    const seguridad = document.createElement("p");
    seguridad.innerHTML = `FIABILIDAD: ${parseInt(confidence * 100)} %`;
    salida.appendChild(speech);
    salida.appendChild(seguridad);
  };
}
