document.addEventListener("DOMContentLoaded", function() {
    const armariosDiv = document.getElementById("armarios");
  
    fetch("armarios.json")
      .then(response => response.json())
      .then(data => {
        data.armarios.forEach((armario, index) => {
          const div = document.createElement("div");
          div.className = `armario ${armario.estado}`;
          div.addEventListener("click", () => toggleStatus(div, armario));
  
          const legenda = document.createElement("p");
          legenda.textContent = `Armário ${index + 1}`;
          div.appendChild(legenda);
  
          armariosDiv.appendChild(div);
  
          const btn = document.createElement("button");
          btn.textContent = "Reservar";
          btn.className = "btn-reservar";
          btn.addEventListener("click", () => reserveArmario(div, armario));
          armariosDiv.appendChild(btn);
        });
      });
  
    function toggleStatus(div, armario) {
      if (div.classList.contains("disponivel")) {
        div.classList.remove("disponivel");
        div.classList.add("ocupado");
        armario.estado = "ocupado";
      } else if (div.classList.contains("ocupado")) {
        div.classList.remove("ocupado");
        div.classList.add("manutencao");
        armario.estado = "manutencao";
      } else if (div.classList.contains("manutencao")) {
        div.classList.remove("manutencao");
        div.classList.add("disponivel");
        armario.estado = "disponivel";
      }
    }
  
    function reserveArmario(div, armario) {
      div.classList.remove("disponivel", "ocupado", "manutencao");
      div.classList.add("reservado");
      armario.estado = "reservado";
    }
  });
  