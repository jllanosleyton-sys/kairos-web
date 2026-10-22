/* Contacto: precarga desde kairos_paquete (con permiso) y acuse sellado al enviar o agendar. Todo ocurre en el navegador. */
(function () {
  var sec = document.getElementById("contacto"); if (!sec) return;
  var f = sec.querySelector("form"), perm = document.getElementById("perm-paquete"), oculto = document.getElementById("paq-dato");
  var acuse = document.getElementById("acuse"), caja = document.getElementById("perm-caja");
  var NOMBRES = {agenda: "Kairos Agenda", voice: "Kairos Voice", inbox: "Kairos Inbox", crm: "Kairos CRM", claims: "Kairos Claims", monitor: "Kairos Monitor",
    cobra: "Kairos Cobra", doccheck: "Kairos DocCheck", docs: "Kairos Docs", assist: "Kairos Assist"};
  var DEMO = {agenda: "demo-agenda.html", claims: "demo-claims.html", monitor: "demo-monitor.html"};
  var paq = null;
  try { paq = JSON.parse(localStorage.getItem("kairos_paquete") || "null"); } catch (_) {}
  if (paq && !(paq.productos && paq.productos.length)) paq = null;
  var texto = "";
  if (paq && caja && perm && oculto) {
    var lista = paq.productos.map(function (p) { return NOMBRES[p] || p; }).join(", ");
    texto = "Resultado de " + (paq.origen === "autodiagnostico" ? "autodiagnóstico" : "paquete") + ": " + lista + (paq.total_mes ? " · mensualidad estimada US$" + paq.total_mes : "");
    caja.hidden = false;
    caja.querySelector("[data-paq]").textContent = lista + (paq.total_mes ? " (mensualidad estimada de US$" + paq.total_mes + ")" : "");
    var ta = f.querySelector("textarea");
    perm.addEventListener("change", function () {
      oculto.value = perm.checked ? texto : "";
      if (ta && perm.checked && !ta.value) ta.value = "Me interesa conversar sobre: " + lista + ".";
      if (ta && !perm.checked && ta.value === "Me interesa conversar sobre: " + lista + ".") ta.value = "";
    });
  }
  function mostrar() {
    if (!acuse) return;
    var ids = (perm && perm.checked && paq) ? paq.productos : [];
    var d = "laboratorio.html", etq = "Ver las demostraciones";
    for (var i = 0; i < ids.length; i++) if (DEMO[ids[i]]) { d = DEMO[ids[i]]; etq = "Ver la demostración de " + NOMBRES[ids[i]]; break; }
    acuse.querySelector("[data-demo]").href = d; acuse.querySelector("[data-demo]").textContent = etq + " →";
    acuse.hidden = false;
    try { acuse.scrollIntoView({behavior: "smooth", block: "center"}); } catch (_) {}
  }
  if (f) f.addEventListener("submit", mostrar);  // el submit solo se dispara si el formulario es válido
  sec.querySelectorAll("a[data-agenda]").forEach(function (a) { a.addEventListener("click", mostrar); });
})();
