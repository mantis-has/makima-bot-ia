// --- Datos simulados ---
const users = [
  { user: "admin", pass: "admin", role: "admin" },
  { user: "editor", pass: "editor", role: "editor" },
  { user: "lector", pass: "lector", role: "lector" }
];
let collaborators = [...users];
let currentUser = null;
let files = ["index.html", "style.css"];
let databases = ["clientes", "productos"];
let ftpUsers = ["ftpadmin", "ftpuser"];
let mails = ["info@dominio.com", "soporte@dominio.com"];
let backups = ["Backup 2025-07-12", "Backup 2025-07-10"];
let logs = [];
let theme = localStorage.getItem("theme") || "light";

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
  const regRole = document.getElementById("regRole").value;

  if (!regUser || !regPass) {
    document.getElementById("regMsg").textContent = "Todos los campos son obligatorios.";
    return;
  }
  if (users.find(u => u.user === regUser)) {
    document.getElementById("regMsg").textContent = "Ese usuario ya existe.";
    return;
  }
  const newUser = { user: regUser, pass: regPass, role: regRole };
  users.push(newUser);
  collaborators.push(newUser);
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
  const found = users.find(x => x.user === u && x.pass === p);
  if (found) {
    currentUser = found;
    logs.push(`[${now()}] Login: ${found.user}`);
    document.getElementById("loginPanel").classList.add("hidden");
    document.getElementById("mainPanel").classList.remove("hidden");
    showTab("dashboard");
    updateAll();
  } else {
    document.getElementById("loginMsg").textContent = "Usuario o contraseña incorrectos";
  }
}
function logout() {
  logs.push(`[${now()}] Logout: ${currentUser.user}`);
  currentUser = null;
  document.getElementById("loginPanel").classList.remove("hidden");
  document.getElementById("mainPanel").classList.add("hidden");
}

// --- Tabs ---
function showTab(tab) {
  document.querySelectorAll(".tab").forEach(t => t.classList.add("hidden"));
  document.getElementById(tab).classList.remove("hidden");
  logs.push(`[${now()}] Accede a sección: ${tab}`);
  updateAll();
}

// --- Gestión de archivos ---
function updateFiles() {
  const ul = document.getElementById("fileList");
  ul.innerHTML = "";
  files.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f;
    if (canEdit()) {
      li.onclick = () => { logs.push(`[${now()}] Editar archivo: ${f}`); alert("Editor simulado para " + f); };
      li.style.cursor = "pointer";
    }
    ul.appendChild(li);
  });
}
function addFile() {
  if (!canEdit()) return alert("No tienes permiso");
  const nf = document.getElementById("newFile").value.trim();
  if (nf && !files.includes(nf)) {
    files.push(nf);
    logs.push(`[${now()}] Archivo creado: ${nf}`);
    updateFiles();
    document.getElementById("newFile").value = "";
  }
}

// --- Bases de datos ---
function updateDB() {
  const ul = document.getElementById("dbList");
  ul.innerHTML = "";
  databases.forEach(db => {
    const li = document.createElement("li");
    li.textContent = db;
    ul.appendChild(li);
  });
}
function addDB() {
  if (!isAdmin()) return alert("Solo admin puede crear BD");
  const ndb = document.getElementById("newDB").value.trim();
  if (ndb && !databases.includes(ndb)) {
    databases.push(ndb);
    logs.push(`[${now()}] BD creada: ${ndb}`);
    updateDB();
    document.getElementById("newDB").value = "";
  }
}

// --- FTP ---
function updateFTP() {
  const ul = document.getElementById("ftpList");
  ul.innerHTML = "";
  ftpUsers.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u;
    ul.appendChild(li);
  });
}
function addFTP() {
  if (!canEdit()) return alert("No tienes permiso");
  const nf = document.getElementById("newFTP").value.trim();
  if (nf && !ftpUsers.includes(nf)) {
    ftpUsers.push(nf);
    logs.push(`[${now()}] Usuario FTP creado: ${nf}`);
    updateFTP();
    document.getElementById("newFTP").value = "";
  }
}

// --- Correos ---
function updateMail() {
  const ul = document.getElementById("mailList");
  ul.innerHTML = "";
  mails.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    ul.appendChild(li);
  });
}
function addMail() {
  if (!canEdit()) return alert("No tienes permiso");
  const nm = document.getElementById("newMail").value.trim();
  if (nm && !mails.includes(nm)) {
    mails.push(nm);
    logs.push(`[${now()}] Cuenta correo creada: ${nm}`);
    updateMail();
    document.getElementById("newMail").value = "";
  }
}

// --- Backups ---
function updateBackups() {
  const ul = document.getElementById("backupList");
  ul.innerHTML = "";
  backups.forEach(b => {
    const li = document.createElement("li");
    li.textContent = b;
    ul.appendChild(li);
  });
}
function makeBackup() {
  if (!isAdmin()) return alert("Solo admin puede crear backups");
  const nb = "Backup " + now();
  backups.unshift(nb);
  logs.push(`[${now()}] Backup creado: ${nb}`);
  updateBackups();
}

// --- Usuarios y permisos ---
function updateUsers() {
  const ul = document.getElementById("userList");
  ul.innerHTML = "";
  collaborators.forEach(u => {
    const li = document.createElement("li");
    li.textContent = u.user + " (" + u.role + ")";
    ul.appendChild(li);
  });
}
function addUser() {
  if (!isAdmin()) return alert("Solo admin puede añadir usuarios");
  const nu = document.getElementById("newUser").value.trim();
  const nr = document.getElementById("newRole").value;
  if (nu && !collaborators.find(x => x.user === nu)) {
    collaborators.push({ user: nu, pass: "1234", role: nr });
    logs.push(`[${now()}] Usuario añadido: ${nu}/${nr}`);
    updateUsers();
    document.getElementById("newUser").value = "";
  }
}

// --- Logs ---
function updateLogs() {
  document.getElementById("logBox").textContent = logs.slice(-20).join("\n");
}

// --- Estadísticas Dashboard ---
function updateStats() {
  document.getElementById("stats").innerHTML =
    `<b>Archivos:</b> ${files.length} |
     <b>Bases de datos:</b> ${databases.length} |
     <b>FTP:</b> ${ftpUsers.length} |
     <b>Correos:</b> ${mails.length} |
     <b>Backups:</b> ${backups.length} |
     <b>Colaboradores:</b> ${collaborators.length}`;
}

// --- Temas ---
function setTheme(e) {
  theme = e.target.value;
  localStorage.setItem("theme", theme);
  applyTheme();
}
function applyTheme() {
  document.body.className = theme === "dark" ? "dark" : "";
  document.getElementById("themeSelect").value = theme;
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
  applyTheme();
}

// --- Autoaplicar tema al cargar ---
applyTheme();
