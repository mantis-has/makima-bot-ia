// --- Datos persistentes en localStorage ---
const STORAGE_KEY = "maki_panel_data_v1";
function getInitialData() {
  return {
    users: [
      { user: "admin", pass: "admin", role: "admin", coinsUsed: 0, coinsTotal: 0 },
      { user: "editor", pass: "editor", role: "editor", coinsUsed: 0, coinsTotal: 0 },
      { user: "lector", pass: "lector", role: "lector", coinsUsed: 0, coinsTotal: 0 }
    ],
    files: ["index.html", "style.css"],
    databases: ["clientes", "productos"],
    ftpUsers: ["ftpadmin", "ftpuser"],
    mails: ["info@dominio.com", "soporte@dominio.com"],
    backups: ["Backup 2025-07-12", "Backup 2025-07-10"],
    logs: [],
    theme: localStorage.getItem("theme") || "light"
  };
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(panelData));
}
function loadData() {
  let d = localStorage.getItem(STORAGE_KEY);
  if (d) return JSON.parse(d);
  return getInitialData();
}
let panelData = loadData();

let currentUser = null;

// --- Mostrar/Ocultar paneles ---
function showRegister() {
  document.getElementById("loginPanel").classList.add("hidden");
  document.getElementById("registerPanel").classList.remove("hidden");
  document.getElementById("regMsg").textContent = "";
}
function showLogin() {
  document.getElementById("registerPanel").classList.add("hidden");
  document.getElementById("loginPanel").classList.remove("hidden");
  document.getElementById("loginMsg").textContent = "";
}

// --- Registro de usuario nuevo ---
function register() {
  const regUser = document.getElementById("regUser").value.trim();
  const regPass = document.getElementById("regPass").value.trim();
  if (!regUser || !regPass) {
    document.getElementById("regMsg").textContent = "Todos los campos son obligatorios.";
    return;
  }
  if (panelData.users.find(u => u.user === regUser)) {
    document.getElementById("regMsg").textContent = "Ese usuario ya existe.";
    return;
  }
  // Rol fijo: lector
  const newUser = { user: regUser, pass: regPass, role: "lector", coinsUsed: 0, coinsTotal: 0 };
  panelData.users.push(newUser);
  saveData();
  document.getElementById("regMsg").textContent = "Cuenta creada, ahora puedes iniciar sesión.";
  setTimeout(() => {
    showLogin();
    document.getElementById("loginUser").value = regUser;
  }, 1000);
}

// --- Login y roles ---
function login() {
  const u = document.getElementById("loginUser").value;
  const p = document.getElementById("loginPass").value;
  const found = panelData.users.find(x => x.user === u && x.pass === p);
  if (found) {
    currentUser = found;
    panelData.logs.push(`[${now()}] Login: ${found.user}`);
    saveData();
    document.getElementById("loginPanel").classList.add("hidden");
    document.getElementById("mainPanel").classList.remove("hidden");
    showTab("dashboard");
    updateAll();
  } else {
    document.getElementById("loginMsg").textContent = "Usuario o contraseña incorrectos";
  }
}
function logout() {
  panelData.logs.push(`[${now()}] Logout: ${currentUser.user}`);
  saveData();
  currentUser = null;
  document.getElementById("loginPanel").classList.remove("hidden");
  document.getElementById("mainPanel").classList.add("hidden");
}

// --- Tabs ---
function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
  panelData.logs.push(`[${now()}] Accede a sección: ${tab}`);
  saveData();
  updateAll();
}

// --- Gestión de archivos ---
function updateFiles() {
  const ul = document.getElementById("fileList");
  ul.innerHTML = "";
  panelData.files.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    if (canEdit()) {
      li.onclick = () => { panelData.logs.push(`[${now()}] Editar archivo: ${f}`); saveData(); alert("Editor simulado para " + f); };
      li.style.cursor = "pointer";
    }
    ul.appendChild(li);
  });
}
function addFile() {
  if (!canEdit()) return alert("No tienes permiso");
  const nf = document.getElementById("newFile").value.trim();
  if (nf && !panelData.files.includes(nf)) {
    panelData.files.push(nf);
    panelData.logs.push(`[${now()}] Archivo creado: ${nf}`);
    saveData();
    updateFiles();
    document.getElementById("newFile").value = "";
  }
}

// --- Bases de datos ---
function updateDB() {
  const ul = document.getElementById("dbList");
  ul.innerHTML = "";
  panelData.databases.forEach(db => {
    const li = document.createElement("li");
    li.textContent = db;
    ul.appendChild(li);
  });
}
function addDB() {
  if (!isAdmin()) return alert("Solo admin puede crear BD");
  const ndb = document.getElementById("newDB").value.trim();
  if (ndb && !panelData.databases.includes(ndb)) {
    panelData.databases.push(ndb);
    panelData.logs.push(`[${now()}] BD creada: ${ndb}`);
    saveData();
    updateDB();
    document.getElementById("newDB").value = "";
  }
}

// --- FTP ---
function updateFTP() {
  const ul = document.getElementById("ftpList");
  ul.innerHTML = "";
  panelData.ftpUsers.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u;
    ul.appendChild(li);
  });
}
function addFTP() {
  if (!canEdit()) return alert("No tienes permiso");
  const nf = document.getElementById("newFTP").value.trim();
  if (nf && !panelData.ftpUsers.includes(nf)) {
    panelData.ftpUsers.push(nf);
    panelData.logs.push(`[${now()}] Usuario FTP creado: ${nf}`);
    saveData();
    updateFTP();
    document.getElementById("newFTP").value = "";
  }
}

// --- Correos ---
function updateMail() {
  const ul = document.getElementById("mailList");
  ul.innerHTML = "";
  panelData.mails.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    ul.appendChild(li);
  });
}
function addMail() {
  if (!canEdit()) return alert("No tienes permiso");
  const nm = document.getElementById("newMail").value.trim();
  if (nm && !panelData.mails.includes(nm)) {
    panelData.mails.push(nm);
    panelData.logs.push(`[${now()}] Cuenta correo creada: ${nm}`);
    saveData();
    updateMail();
    document.getElementById("newMail").value = "";
  }
}

// --- Backups ---
function updateBackups() {
  const ul = document.getElementById("backupList");
  ul.innerHTML = "";
  panelData.backups.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });
}
function makeBackup() {
  if (!isAdmin()) return alert("Solo admin puede crear backups");
  const nb = "Backup " + now();
  panelData.backups.unshift(nb);
  panelData.logs.push(`[${now()}] Backup creado: ${nb}`);
  saveData();
  updateBackups();
}

// --- Usuarios y permisos ---
function updateUsers() {
  const ul = document.getElementById("userList");
  ul.innerHTML = "";
  panelData.users.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.user + " (" + u.role + ")";
    ul.appendChild(li);
  });
}
function addUser() {
  if (!isAdmin()) return alert("Solo admin puede añadir usuarios");
  const nu = document.getElementById("newUser").value.trim();
  const nr = document.getElementById("newRole").value;
  if (nu && !panelData.users.find(x => x.user === nu)) {
    panelData.users.push({ user: nu, pass: "1234", role: nr, coinsUsed: 0, coinsTotal: 0 });
    panelData.logs.push(`[${now()}] Usuario añadido: ${nu}/${nr}`);
    saveData();
    updateUsers();
    document.getElementById("newUser").value = "";
  }
}

// --- Logs ---
function updateLogs() {
  document.getElementById("logBox").textContent = panelData.logs.slice(-20).join("\n");
}

// --- Estadísticas Dashboard ---
function updateStats() {
  document.getElementById("stats").innerHTML =
    `<b>Archivos:</b> ${panelData.files.length} |
     <b>Bases de datos:</b> ${panelData.databases.length} |
     <b>FTP:</b> ${panelData.ftpUsers.length} |
     <b>Correos:</b> ${panelData.mails.length} |
     <b>Backups:</b> ${panelData.backups.length} |
     <b>Usuarios:</b> ${panelData.users.length}`;
}

// --- Coins en uso / totales ---
function updateCoinsPanel() {
  if (!currentUser) return;
  document.getElementById("coinsUsed").textContent = (currentUser.coinsUsed ?? 0).toFixed(2);
  document.getElementById("coinsTotal").textContent = (currentUser.coinsTotal ?? 0).toFixed(2);
}

// --- Temas ---
function setTheme(e) {
  panelData.theme = e.target.value;
  localStorage.setItem("theme", panelData.theme);
  saveData();
  applyTheme();
}
function applyTheme() {
  document.body.className = panelData.theme === "dark" ? "dark" : "";
  document.getElementById("themeSelect").value = panelData.theme;
}

// --- Helpers y actualización general ---
function now() {
  return new Date().toLocaleString();
}
function isAdmin() { return currentUser && currentUser.role === "admin"; }
function canEdit() { return currentUser && (currentUser.role === "admin" || currentUser.role === "editor"); }
function updateAll() {
  updateFiles();
  updateDB();
  updateFTP();
  updateMail();
  updateBackups();
  updateUsers();
  updateLogs();
  updateStats();
  updateCoinsPanel();
  applyTheme();
}

// --- Panel de administración ---
function toggleAdminPanel() {
  const panel = document.getElementById("adminPanel");
  if (!isAdmin()) return;
  if (panel.classList.contains("hidden")) {
    renderAdminUsers();
    panel.classList.remove("hidden");
  } else {
    panel.classList.add("hidden");
  }
}
function renderAdminUsers() {
  const container = document.getElementById("adminUsers");
  container.innerHTML = "";
  panelData.users.forEach((u, idx) => {
    if (u.user === currentUser.user) return; // no editarse a sí mismo
    const row = document.createElement("div");
    row.className = "admin-user-row";
    // Usuario
    const label = document.createElement("span");
    label.className = "admin-user-label";
    label.textContent = u.user;
    row.appendChild(label);
    // Rol
    const roleSel = document.createElement("select");
    ["admin", "editor", "lector"].forEach(r => {
      const opt = document.createElement("option");
      opt.value = r;
      opt.textContent = r;
      if (u.role === r) opt.selected = true;
      roleSel.appendChild(opt);
    });
    roleSel.onchange = () => {
      panelData.users[idx].role = roleSel.value;
      panelData.logs.push(`[${now()}] Cambiado rol de ${u.user} a ${roleSel.value}`);
      saveData();
      updateUsers();
      renderAdminUsers();
    };
    row.appendChild(roleSel);
    // Coins usados/totales
    const coinsUsedInput = document.createElement("input");
    coinsUsedInput.type = "number";
    coinsUsedInput.value = u.coinsUsed ?? 0;
    coinsUsedInput.style.width = "55px";
    coinsUsedInput.title = "Coins en uso";
    coinsUsedInput.onchange = () => {
      panelData.users[idx].coinsUsed = parseFloat(coinsUsedInput.value) || 0;
      panelData.logs.push(`[${now()}] Cambiado coins en uso de ${u.user} a ${coinsUsedInput.value}`);
      saveData();
      renderAdminUsers();
      updateCoinsPanel();
    };
    row.appendChild(coinsUsedInput);
    const coinsTotalInput = document.createElement("input");
    coinsTotalInput.type = "number";
    coinsTotalInput.value = u.coinsTotal ?? 0;
    coinsTotalInput.style.width = "55px";
    coinsTotalInput.title = "Coins totales";
    coinsTotalInput.onchange = () => {
      panelData.users[idx].coinsTotal = parseFloat(coinsTotalInput.value) || 0;
      panelData.logs.push(`[${now()}] Cambiado coins totales de ${u.user} a ${coinsTotalInput.value}`);
      saveData();
      renderAdminUsers();
      updateCoinsPanel();
    };
    row.appendChild(coinsTotalInput);
    // Eliminar usuario
    const delBtn = document.createElement("button");
    delBtn.textContent = "Eliminar";
    delBtn.onclick = () => {
      if (confirm("¿Eliminar este usuario?")) {
        panelData.users.splice(idx, 1);
        panelData.logs.push(`[${now()}] Usuario eliminado: ${u.user}`);
        saveData();
        updateUsers();
        renderAdminUsers();
      }
    };
    row.appendChild(delBtn);
    container.appendChild(row);
  });
}

// --- Autoaplicar tema al cargar ---
applyTheme();