/**
 * ====================================================================
 * app.js - Motor Completo do Aplicativo no GitHub Pages (JS Puro)
 * Comunicação direta via fetch() com o Google Apps Script (Sem CORS)
 * ====================================================================
 */

// ====================================================================
// ⚙️ CONFIGURE AQUI SUA URL DO GOOGLE APPS SCRIPT (/exec)
// ====================================================================
const GAS_API_URL = "https://script.google.com/macros/s/AKfycbxKNKiHEqCF6-WE_YYkPlCZKviLntPCC2PmbZRSQNu54DJjiTqd2r8bskAuxKRKmxB2Zw/exec"; // <-- Cole sua URL /exec aqui

// ====================================================================
// 🔌 PONTE UNIVERSAL: CONECTA O GITHUB PAGES AO GOOGLE APPS SCRIPT
// ====================================================================
function callGasApi(action, data) {
  if (!GAS_API_URL || GAS_API_URL.indexOf('/exec') === -1 || GAS_API_URL.indexOf('SUA_URL') !== -1) {
    var msg = "⚠️ ATENÇÃO: Configure a variável GAS_API_URL na linha 11 do arquivo app.js com a sua URL do Apps Script (/exec)!";
    alert(msg);
    throw new Error(msg);
  }

  return fetch(GAS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ action: action, data: data || {} })
  })
  .then(function(res) { return res.json(); })
  .then(function(json) {
    if (!json.success) {
      throw new Error(json.error || 'Erro na requisição ao servidor Google');
    }
    return json.data;
  });
}

// Emulador da interface do Google para manter compatibilidade 100% perfeita
window.google = window.google || {};
window.google.script = window.google.script || {};
window.google.script.run = {
  _success: null,
  _failure: null,
  withSuccessHandler: function(cb) {
    var r = Object.create(window.google.script.run);
    r._success = cb;
    return r;
  },
  withFailureHandler: function(fcb) {
    var r = Object.create(this);
    r._failure = fcb;
    return r;
  },
  _execute: function(action, data) {
    var self = this;
    callGasApi(action, data)
      .then(function(res) {
        if (self._success) self._success(res);
      })
      .catch(function(err) {
        if (self._failure) self._failure(err);
        else {
          console.error("Erro na API [" + action + "]:", err);
          if (window.toast) window.toast(err.message, 'error');
        }
      });
  },
  apiGetOrgConfig: function() { this._execute('getOrgConfig', {}); },
  apiSaveOrgConfig: function(tok, cfg) { this._execute('saveOrgConfig', { sessionToken: tok, config: cfg }); },
  apiResetOrgConfig: function(tok) { this._execute('resetOrgConfig', { sessionToken: tok }); },
  apiLogin: function(email, pass) { this._execute('login', { email: email, senha: pass }); },
  apiRegister: function(dados) { this._execute('register', { dados: dados }); },
  apiForgotPassword: function(email) { this._execute('forgotPassword', { email: email }); },
  apiResetPassword: function(email, code, newPass) { this._execute('resetPassword', { email: email, code: code, newPass: newPass }); },
  apiGetConcursoState: function(token, userId) { this._execute('getConcursoState', { concursoToken: token, userId: userId }); },
  apiSubmitAnswer: function(tok, cId, qId, ops) { this._execute('submitAnswer', { sessionToken: tok, concursoId: cId, questaoId: qId, opcoesSelecionadas: ops }); },
  apiGetPodio: function(cId) { this._execute('getPodio', { concursoId: cId }); },
  apiGetMeuGabarito: function(tok, cId) { this._execute('getMeuGabarito', { sessionToken: tok, concursoId: cId }); },
  apiGetHistoricoUsuario: function(tok) { this._execute('getHistoricoUsuario', { sessionToken: tok }); },
  apiGetConcursosAtivosDisponiveis: function() { this._execute('getConcursosAtivos', {}); },
  apiAdminListConcursos: function(tok) { this._execute('listConcursos', { sessionToken: tok }); },
  apiAdminCreateConcurso: function(tok, dados) { this._execute('createConcurso', { sessionToken: tok, dados: dados }); },
  apiAdminUpdateConcurso: function(tok, cId, dados) { this._execute('updateConcurso', { sessionToken: tok, concursoId: cId, dados: dados }); },
  apiAdminDeleteConcurso: function(tok, cId) { this._execute('deleteConcurso', { sessionToken: tok, concursoId: cId }); },
  apiAdminCancelContest: function(tok, cId) { this._execute('cancelContest', { sessionToken: tok, concursoId: cId }); },
  apiAdminReactivateContest: function(tok, cId) { this._execute('reactivateContest', { sessionToken: tok, concursoId: cId }); },
  apiAdminResetToScheduled: function(tok, cId) { this._execute('resetToScheduled', { sessionToken: tok, concursoId: cId }); },
  apiAdminReopenContest: function(tok, cId) { this._execute('reopenContest', { sessionToken: tok, concursoId: cId }); },
  apiAdminStartContest: function(tok, cId) { this._execute('startContest', { sessionToken: tok, concursoId: cId }); },
  apiAdminNextQuestion: function(tok, cId) { this._execute('nextQuestion', { sessionToken: tok, concursoId: cId }); },
  apiAdminPrevQuestion: function(tok, cId) { this._execute('prevQuestion', { sessionToken: tok, concursoId: cId }); },
  apiAdminToggleReveal: function(tok, cId) { this._execute('toggleReveal', { sessionToken: tok, concursoId: cId }); },
  apiAdminFinishContest: function(tok, cId) { this._execute('finishContest', { sessionToken: tok, concursoId: cId }); },
  apiAdminListQuestoes: function(tok, cId) { this._execute('listQuestoes', { sessionToken: tok, concursoId: cId }); },
  apiAdminCreateQuestao: function(tok, dados) { this._execute('createQuestao', { sessionToken: tok, dados: dados }); },
  apiAdminUpdateQuestao: function(tok, qId, dados) { this._execute('updateQuestao', { sessionToken: tok, questaoId: qId, dados: dados }); },
  apiAdminDeleteQuestao: function(tok, qId) { this._execute('deleteQuestao', { sessionToken: tok, questaoId: qId }); },
  apiGenerateQuestionsAI: function(tok, params) { this._execute('generateQuestionsAI', { sessionToken: tok, params: params }); },
  apiAdminListUsers: function(tok) { this._execute('listUsers', { sessionToken: tok }); },
  apiAdminUpdateUser: function(tok, uId, dados) { this._execute('updateUser', { sessionToken: tok, userId: uId, dados: dados }); },
  apiAdminDeleteUser: function(tok, uId) { this._execute('deleteUser', { sessionToken: tok, userId: uId }); },
  apiAdminToggleUserStatus: function(tok, uId, st) { this._execute('toggleUserStatus', { sessionToken: tok, userId: uId, novoStatus: st }); },
  apiAdminGetSuperPodio: function(tok, ini, fim) { this._execute('getSuperPodio', { sessionToken: tok, dataInicio: ini, dataFim: fim }); },
  apiGetSuperPodioTelao: function(ini, fim) { this._execute('getSuperPodioTelao', { dataInicio: ini, dataFim: fim }); },
  apiExportPDF: function(tok, cId) { this._execute('exportPDF', { sessionToken: tok, concursoId: cId }); },
  apiExportExcel: function(tok, cId) { this._execute('exportExcel', { sessionToken: tok, concursoId: cId }); },
  apiNotifyAbsentees: function(tok, cId) { this._execute('notifyAbsentees', { sessionToken: tok, concursoId: cId }); },
  apiSendMyReport: function(tok, cId) { this._execute('sendMyReport', { sessionToken: tok, concursoId: cId }); }
};

// ====================================================================
// --- LÓGICA DE INTERFACE, CONTROLE E TEMPO REAL ---
// ====================================================================

window.AppState = {
  sessionToken: localStorage.getItem('QUIZ_TOKEN') || null,
  user: JSON.parse(localStorage.getItem('QUIZ_USER') || 'null'),
  publishedUrl: window.location.href.split('?')[0],
  concursoToken: localStorage.getItem('QUIZ_CONCURSO_TOKEN') || null,
  concursoId: null,
  currentQuestionId: null,
  currentQuestionObj: null,
  isTelaoMode: false,
  isSuperPodioMode: false,
  selecionadas: new Set(),
  tipoSelecao: 'Unica',
  maxPermitido: 1,
  respostaEnviada: false,
  pollingTimer: null,
  selectedQRCodeUrl: '',
  selectedConcursoTitulo: '',
  concursosList: [],
  usersList: [],
  questoesList: [],
  selectedConcursoForQuestion: null,
  letrasDisponiveis: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
};

window.getKahootColorClass = function(letra) {
  var mapa = {
    'A': 'bg-rose-500 text-white',
    'B': 'bg-sky-600 text-white',
    'C': 'bg-amber-500 text-white',
    'D': 'bg-emerald-600 text-white',
    'E': 'bg-purple-600 text-white',
    'F': 'bg-pink-600 text-white',
    'G': 'bg-cyan-600 text-white',
    'H': 'bg-orange-600 text-white'
  };
  return mapa[letra] || 'bg-slate-700 text-white';
};

window.toast = function(mensagem, tipo) {
  var container = document.getElementById('toast-container');
  if (!container) return;
  var el = document.createElement('div');
  var cor = tipo === 'error' ? 'bg-rose-600' : (tipo === 'success' ? 'bg-emerald-600' : 'bg-slate-800');
  el.className = cor + ' text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2 transition-all transform duration-300 opacity-0 translate-y-2 pointer-events-auto';
  el.innerText = mensagem;
  container.appendChild(el);
  setTimeout(function() { el.classList.remove('opacity-0', 'translate-y-2'); }, 10);
  setTimeout(function() {
    el.classList.add('opacity-0', 'translate-y-2');
    setTimeout(function() { el.remove(); }, 300);
  }, 4000);
};

window.addEventListener('DOMContentLoaded', function() {
  var urlParams = new URLSearchParams(window.location.search);
  var tokenUrl = urlParams.get('concurso');
  var viewParam = urlParams.get('view');
  var superPodioParam = urlParams.get('superpodio');

  if (tokenUrl) {
    AppState.concursoToken = tokenUrl;
    localStorage.setItem('QUIZ_CONCURSO_TOKEN', tokenUrl);
  }

  google.script.run
    .withSuccessHandler(function(cfg) {
      if (cfg.orgName) document.getElementById('header-title').innerText = cfg.orgName;
      if (cfg.orgDesc) document.getElementById('header-desc').innerText = cfg.orgDesc;
      if (cfg.logoUrl) document.getElementById('header-logo').src = cfg.logoUrl;
    })
    .apiGetOrgConfig();

  // MODO TELÃO (PROJEÇÃO DE PALCO PARA PROJETOR/TV)
  if (viewParam === 'telao') {
    AppState.isTelaoMode = true;
    var headerEl = document.getElementById('global-header');
    if (headerEl) headerEl.classList.add('hidden');
    document.body.className = 'telao-container text-white min-h-screen font-sans antialiased';
    showView('view-projection');

    if (superPodioParam === 'true') {
      AppState.isSuperPodioMode = true;
      carregarSuperPodioNoTelao(urlParams.get('inicio'), urlParams.get('fim'));
      return;
    }

    startPolling();
    return;
  }

  if (tokenUrl) {
    var avisoEl = document.getElementById('auth-concurso-aviso');
    if (avisoEl) avisoEl.classList.remove('hidden');
  }

  if (AppState.sessionToken && AppState.user) {
    document.getElementById('auth-actions').classList.remove('hidden');
    if (AppState.user.Perfil === 'ADMIN') {
      document.getElementById('btn-admin-nav-voltar').classList.remove('hidden');
      document.getElementById('btn-edit-branding').classList.remove('hidden');
      showView('view-admin');
      carregarDadosAdmin();
      iniciarAlternativasPadrao();
    } else {
      if (AppState.concursoToken) {
        showView('view-quiz');
      } else {
        showView('view-participant-home');
        carregarConcursosHomeUsuario();
        carregarHistoricoParticipante();
      }
    }
    startPolling();
  } else {
    showView('view-auth');
  }
});

window.showView = function(viewId) {
  var views = ['view-auth', 'view-participant-home', 'view-quiz', 'view-admin', 'view-projection', 'view-podio'];
  for (var i = 0; i < views.length; i++) {
    var el = document.getElementById(views[i]);
    if (el) el.classList.add('hidden');
  }
  var target = document.getElementById(viewId);
  if (target) target.classList.remove('hidden');
};

window.voltarParaHome = function() {
  if (AppState.isTelaoMode) return;
  if (!AppState.user) return showView('view-auth');
  if (AppState.user.Perfil === 'ADMIN') {
    showView('view-admin');
  } else {
    showView('view-participant-home');
    carregarConcursosHomeUsuario();
    carregarHistoricoParticipante();
  }
};

window.abrirPainelAdmin = function() {
  showView('view-admin');
  switchAdminTab('live');
};

window.toggleTheme = function() {
  var isDark = document.documentElement.classList.toggle('dark');
  document.getElementById('theme-icon').innerText = isDark ? '🌙' : '☀️';
};

window.switchAuthTab = function(mode) {
  var isLogin = mode === 'login';
  document.getElementById('form-login').classList.toggle('hidden', !isLogin);
  document.getElementById('form-register').classList.toggle('hidden', isLogin);
  
  document.getElementById('tab-btn-login').className = isLogin 
    ? 'flex-1 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs transition'
    : 'flex-1 py-2 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 transition';
  document.getElementById('tab-btn-register').className = !isLogin 
    ? 'flex-1 py-2 text-xs font-bold rounded-xl bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-xs transition'
    : 'flex-1 py-2 text-xs font-bold rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 transition';
};

window.toggleRecovery = function(show) {
  document.getElementById('box-recovery').classList.toggle('hidden', !show);
};

window.handleLogin = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  var email = document.getElementById('login-email').value;
  var pass = document.getElementById('login-pass').value;

  var btn = document.getElementById('btn-login-submit');
  var txt = document.getElementById('btn-login-text');
  var spinner = document.getElementById('btn-login-spinner');

  btn.disabled = true;
  txt.innerText = 'Entrando...';
  spinner.classList.remove('hidden');

  google.script.run
    .withSuccessHandler(function(res) {
      btn.disabled = false;
      txt.innerText = 'Entrar no Quiz';
      spinner.classList.add('hidden');

      AppState.sessionToken = res.token;
      AppState.user = res.user;
      localStorage.setItem('QUIZ_TOKEN', res.token);
      localStorage.setItem('QUIZ_USER', JSON.stringify(res.user));

      document.getElementById('auth-actions').classList.remove('hidden');

      if (res.user.Perfil === 'ADMIN') {
        document.getElementById('btn-admin-nav-voltar').classList.remove('hidden');
        document.getElementById('btn-edit-branding').classList.remove('hidden');
        showView('view-admin');
        carregarDadosAdmin();
        iniciarAlternativasPadrao();
      } else {
        if (AppState.concursoToken) {
          showView('view-quiz');
        } else {
          showView('view-participant-home');
          carregarConcursosHomeUsuario();
          carregarHistoricoParticipante();
        }
      }
      startPolling();
      toast('Bem-vindo, ' + res.user.Nome + '!', 'success');
    })
    .withFailureHandler(function(err) {
      btn.disabled = false;
      txt.innerText = 'Entrar no Quiz';
      spinner.classList.add('hidden');
      toast(err.message || 'Erro ao autenticar', 'error');
    })
    .apiLogin(email, pass);
};

window.handleRegister = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  var dados = {
    nome: document.getElementById('reg-nome').value,
    email: document.getElementById('reg-email').value,
    telefone: document.getElementById('reg-tel').value,
    igreja: document.getElementById('reg-igreja').value,
    senha: document.getElementById('reg-senha').value
  };

  var btn = document.getElementById('btn-reg-submit');
  var txt = document.getElementById('btn-reg-text');
  var spinner = document.getElementById('btn-reg-spinner');

  btn.disabled = true;
  txt.innerText = 'Criando Conta...';
  spinner.classList.remove('hidden');

  google.script.run
    .withSuccessHandler(function(res) {
      btn.disabled = false;
      txt.innerText = 'Cadastrar e Participar';
      spinner.classList.add('hidden');

      AppState.sessionToken = res.token;
      AppState.user = res.user;
      localStorage.setItem('QUIZ_TOKEN', res.token);
      localStorage.setItem('QUIZ_USER', JSON.stringify(res.user));

      document.getElementById('auth-actions').classList.remove('hidden');
      if (AppState.concursoToken) {
        showView('view-quiz');
      } else {
        showView('view-participant-home');
        carregarConcursosHomeUsuario();
        carregarHistoricoParticipante();
      }
      startPolling();
      toast('Conta criada com sucesso!', 'success');
    })
    .withFailureHandler(function(err) {
      btn.disabled = false;
      txt.innerText = 'Cadastrar e Participar';
      spinner.classList.add('hidden');
      toast(err.message || 'Erro ao registrar', 'error');
    })
    .apiRegister(dados);
};

window.logout = function() {
  if (AppState.pollingTimer) clearInterval(AppState.pollingTimer);

  AppState.sessionToken = null;
  AppState.user = null;
  localStorage.removeItem('QUIZ_TOKEN');
  localStorage.removeItem('QUIZ_USER');

  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value = '';
  document.getElementById('auth-actions').classList.add('hidden');
  document.getElementById('btn-admin-nav-voltar').classList.add('hidden');
  document.getElementById('btn-edit-branding').classList.add('hidden');
  switchAuthTab('login');
  showView('view-auth');
  toast('Sessão encerrada.', 'info');
};

// --- CENTRAL DO PARTICIPANTE ---
window.carregarConcursosHomeUsuario = function() {
  google.script.run
    .withSuccessHandler(function(lista) {
      var box = document.getElementById('lista-concursos-usuario');
      box.innerHTML = '';
      if (!lista || lista.length === 0) {
        box.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">Nenhum concurso disponível no momento.</p>';
        return;
      }
      lista.forEach(function(c) {
        var statusCor = c.Status === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700';
        box.innerHTML += '<div class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"><div><span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-full ' + statusCor + '">' + c.Status + '</span><h4 class="text-sm font-extrabold text-slate-900 dark:text-white mt-1">' + c.Titulo + '</h4></div><button type="button" onclick="entrarNoConcursoDireto(\'' + c.QRCode_Token + '\')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition">Entrar</button></div>';
      });
    })
    .apiGetConcursosAtivosDisponiveis();
};

window.carregarHistoricoParticipante = function() {
  if (!AppState.sessionToken) return;
  var box = document.getElementById('lista-historico-usuario');
  if (!box) return;

  google.script.run
    .withSuccessHandler(function(historico) {
      box.innerHTML = '';
      if (!historico || historico.length === 0) {
        box.innerHTML = '<p class="text-xs text-slate-400 text-center py-3">Você ainda não possui histórico de concursos anteriores.</p>';
        return;
      }

      historico.forEach(function(item) {
        box.innerHTML += '<div class="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">' +
          '<div>' +
            '<h4 class="text-xs font-extrabold text-slate-800 dark:text-slate-100">' + item.Titulo + '</h4>' +
            '<p class="text-[11px] text-slate-400 mt-0.5">' + (item.Data_Inicio || '-') + ' • Colocação: <strong class="text-indigo-600 font-bold">' + item.Posicao + 'º Lugar</strong> (' + item.Pontos + ' pts)</p>' +
          '</div>' +
          '<button type="button" onclick="abrirModalGabaritoConcurso(\'' + item.ID_Concurso + '\')" class="px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-bold rounded-xl border border-emerald-200 dark:border-emerald-800 transition">📋 Gabarito</button>' +
        '</div>';
      });
    })
    .apiGetHistoricoUsuario(AppState.sessionToken);
};

window.abrirModalGabaritoConcurso = function(concursoId) {
  AppState.concursoId = concursoId;
  abrirModalGabarito();
};

window.entrarNoConcursoDireto = function(token) {
  AppState.concursoToken = token;
  localStorage.setItem('QUIZ_CONCURSO_TOKEN', token);
  showView('view-quiz');
  startPolling();
};

window.entrarPorTokenManual = function() {
  var token = document.getElementById('input-token-manual').value;
  if (!token || !token.trim()) return toast('Informe o código do concurso.', 'error');
  entrarNoConcursoDireto(token.trim());
};

window.abrirModalCompartilharQR = function() {
  var token = AppState.concursoToken;
  if (!token) return toast('Código do concurso não encontrado.', 'error');

  var urlPublica = window.location.href.split('?')[0];
  var linkAcesso = urlPublica + '?concurso=' + token;
  var qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=' + encodeURIComponent(linkAcesso);

  document.getElementById('share-qr-img').src = qrApiUrl;
  document.getElementById('share-qr-token').innerText = token;
  document.getElementById('modal-compartilhar-qr').classList.remove('hidden');
};

window.fecharModalCompartilharQR = function() {
  document.getElementById('modal-compartilhar-qr').classList.add('hidden');
};

window.abrirModalRegrasDesempate = function() {
  document.getElementById('modal-regras-desempate').classList.remove('hidden');
};

window.fecharModalRegrasDesempate = function() {
  document.getElementById('modal-regras-desempate').classList.add('hidden');
};

// --- SINCRONIZAÇÃO EM TEMPO REAL ---
window.startPolling = function() {
  if (AppState.pollingTimer) clearInterval(AppState.pollingTimer);
  fetchUpdates();
  AppState.pollingTimer = setInterval(fetchUpdates, 3000);
};

window.fetchUpdates = function() {
  if (!AppState.concursoToken) return;
  var uId = AppState.user ? AppState.user.ID_Usuario : null;

  google.script.run
    .withSuccessHandler(function(data) { syncState(data); })
    .apiGetConcursoState(AppState.concursoToken, uId);
};

window.syncState = function(data) {
  var concurso = data.concurso;
  var questao = data.questao;
  var respostaUsuario = data.respostaUsuario;
  var stats = data.stats;
  var timer = data.timer || { limite: 0, restante: 0, esgotado: false };

  AppState.concursoId = concurso.ID_Concurso;
  AppState.currentQuestionObj = questao;

  if (AppState.isTelaoMode || !document.getElementById('view-projection').classList.contains('hidden')) {
    sincronizarModoTelao(concurso, questao, stats, timer);
    return;
  }

  if (concurso.Status === 'Finalizado') {
    if (AppState.user && AppState.user.Perfil === 'ADMIN') {
      atualizarConsoleLive(concurso, questao, stats, timer);
      return;
    }
    renderPodio(concurso.ID_Concurso);
    return;
  }

  if (AppState.user && AppState.user.Perfil === 'ADMIN') {
    atualizarConsoleLive(concurso, questao, stats, timer);
    return;
  }

  // VISÃO DO PARTICIPANTE (CELULAR)
  if (concurso.Status === 'Cancelado') {
    document.getElementById('quiz-badge').innerText = 'Cancelado';
    document.getElementById('quiz-badge').className = 'text-[11px] font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700';
    document.getElementById('quiz-titulo').innerText = concurso.Titulo;
    document.getElementById('quiz-pergunta').innerText = 'Este concurso foi cancelado pela organização. Os pontos foram anulados.';
    document.getElementById('quiz-opcoes').innerHTML = '';
    document.getElementById('btn-confirmar').classList.add('hidden');
    document.getElementById('box-share-qr-espera').classList.add('hidden');
    return;
  }

  if (concurso.Status === 'Agendado') {
    document.getElementById('quiz-badge').innerText = 'Aguardando Início';
    document.getElementById('quiz-badge').className = 'text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-700';
    document.getElementById('quiz-titulo').innerText = concurso.Titulo;
    
    var presTexto = (stats && stats.totalPresentes > 0)
      ? stats.totalPresentes + ' participante(s) conectado(s) aguardando o início...'
      : 'O apresentador ainda não iniciou a pergunta. Aguarde nesta tela!';
    document.getElementById('quiz-pergunta').innerText = presTexto;
    document.getElementById('quiz-opcoes').innerHTML = '';
    document.getElementById('btn-confirmar').classList.add('hidden');
    document.getElementById('box-share-qr-espera').classList.remove('hidden');
    return;
  }

  document.getElementById('box-share-qr-espera').classList.add('hidden');

  if (!questao) {
    document.getElementById('quiz-pergunta').innerText = 'Aguardando a próxima pergunta...';
    document.getElementById('quiz-opcoes').innerHTML = '';
    document.getElementById('btn-confirmar').classList.add('hidden');
    return;
  }

  document.getElementById('quiz-badge').innerText = 'Rodada Ao Vivo';
  document.getElementById('quiz-badge').className = 'text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700';
  document.getElementById('btn-confirmar').classList.remove('hidden');

  var quizTimerBadge = document.getElementById('quiz-timer-badge');
  if (quizTimerBadge) {
    if (timer.limite > 0 && !concurso.Resposta_Revelada) {
      quizTimerBadge.classList.remove('hidden');
      quizTimerBadge.innerText = '⏱️ ' + timer.restante + 's';
      if (timer.restante <= 5) {
        quizTimerBadge.className = 'px-2.5 py-1 rounded-xl bg-rose-100 border border-rose-300 text-xs font-black text-rose-700 animate-pulse';
      } else {
        quizTimerBadge.className = 'px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-200 text-xs font-black text-indigo-600';
      }
    } else {
      quizTimerBadge.classList.add('hidden');
    }
  }

  var btnExp = document.getElementById('btn-ver-explicacao-quiz');
  if (btnExp) {
    btnExp.classList.toggle('hidden', !(concurso.Resposta_Revelada && questao.Referencia));
  }

  if (AppState.currentQuestionId !== questao.ID_Questao) {
    AppState.currentQuestionId = questao.ID_Questao;
    AppState.selecionadas.clear();
    AppState.respostaEnviada = false;
    AppState.tipoSelecao = questao.Tipo_Selecao;
    AppState.maxPermitido = parseInt(questao.Qtd_Permitida || 1);
    renderQuestaoParticipante(questao, respostaUsuario, concurso.Resposta_Revelada);
  } else if (respostaUsuario && !AppState.respostaEnviada) {
    AppState.respostaEnviada = true;
    bloquearOpcoes(JSON.parse(respostaUsuario.Opcoes_Selecionadas_JSON || '[]'));
  }

  if (timer.esgotado && !AppState.respostaEnviada && !concurso.Resposta_Revelada) {
    var btnConf = document.getElementById('btn-confirmar');
    btnConf.disabled = true;
    btnConf.innerText = '⏰ Tempo Esgotado!';
  }
};

// =========================================================================
// --- MODO TELÃO: PROJEÇÃO PARA DATA SHOW / TV (COM REVELAÇÃO NEON) ---
// =========================================================================
window.sincronizarModoTelao = function(concurso, questao, stats, timer) {
  if (AppState.isSuperPodioMode) return;

  var boxEspera = document.getElementById('telao-fase-espera');
  var boxPergunta = document.getElementById('telao-fase-pergunta');
  var boxPodio = document.getElementById('telao-fase-podio');

  if (concurso.Status === 'Agendado' || !questao) {
    boxEspera.classList.remove('hidden');
    boxPergunta.classList.add('hidden');
    boxPodio.classList.add('hidden');

    document.getElementById('telao-espera-titulo').innerText = concurso.Titulo;
    document.getElementById('telao-espera-token').innerText = concurso.QRCode_Token;

    var urlPublica = window.location.href.split('?')[0];
    var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=' + encodeURIComponent(urlPublica + '?concurso=' + concurso.QRCode_Token);
    document.getElementById('telao-espera-qr').src = qrUrl;

    var totalPres = stats ? stats.totalPresentes : 0;
    document.getElementById('telao-espera-conectados').innerText = totalPres + ' participantes conectados';
    return;
  }

  if (concurso.Status === 'Finalizado') {
    boxEspera.classList.add('hidden');
    boxPergunta.classList.add('hidden');
    boxPodio.classList.remove('hidden');
    document.getElementById('telao-podio-titulo').innerText = '🏆 Campeões da Rodada';

    google.script.run
      .withSuccessHandler(function(ranking) {
        renderBlocosPodioGenerico('telao-podio-container', ranking, 'telao-tabela-restantes', 'telao-box-restantes');
      })
      .apiGetPodio(concurso.ID_Concurso);
    return;
  }

  boxEspera.classList.add('hidden');
  boxPergunta.classList.remove('hidden');
  boxPodio.classList.add('hidden');

  document.getElementById('telao-pergunta-tema').innerText = 'Tema: ' + (questao.Tema || 'Geral');
  document.getElementById('telao-pergunta-enunciado').innerText = questao.Pergunta;

  var telaoTimerBox = document.getElementById('telao-timer-box');
  if (telaoTimerBox) {
    if (timer && timer.limite > 0 && !concurso.Resposta_Revelada) {
      telaoTimerBox.classList.remove('hidden');
      telaoTimerBox.innerText = '⏱️ ' + timer.restante + 's';
      telaoTimerBox.className = timer.restante <= 5
        ? 'px-5 py-2 rounded-2xl bg-rose-950/90 border-2 border-rose-500 text-rose-300 font-black text-2xl animate-pulse shadow-lg'
        : 'px-5 py-2 rounded-2xl bg-indigo-950/90 border-2 border-indigo-500 text-white font-black text-xl shadow-lg';
    } else {
      telaoTimerBox.classList.add('hidden');
    }
  }

  var resp = stats ? stats.totalRespostas : 0;
  var pres = stats ? stats.totalPresentes : 0;
  var pct = stats ? stats.percentualRespondido : 0;
  document.getElementById('telao-pergunta-status-votos').innerText = resp + ' de ' + pres + ' responderam (' + pct + '%)';

  var grid = document.getElementById('telao-opcoes-grid');
  grid.innerHTML = '';
  var opcoes = JSON.parse(questao.Opcoes_JSON || '[]');
  var isRevelado = concurso.Resposta_Revelada === true || concurso.Resposta_Revelada === 'true';
  var corretas = isRevelado ? JSON.parse(questao.Respostas_Corretas_JSON || '[]') : [];

  opcoes.forEach(function(op) {
    var corLetra = getKahootColorClass(op.letra);
    var efeitoClasse = '';
    var badgeCorreta = '';

    if (isRevelado) {
      if (corretas.indexOf(op.letra) !== -1) {
        efeitoClasse = 'neon-correct';
        badgeCorreta = '<span class="text-xs font-black text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500 shadow-sm">✅ CORRETA</span>';
      } else {
        efeitoClasse = 'opcao-esmaecida';
      }
    }

    grid.innerHTML += '<div class="p-6 rounded-3xl border border-slate-700 bg-slate-900/90 text-xl font-bold flex items-center justify-between shadow-xl transition-all duration-300 ' + efeitoClasse + '">' +
      '<div class="flex items-center space-x-4">' +
        '<span class="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ' + corLetra + '">' + op.letra + '</span>' +
        '<span class="text-white">' + op.texto + '</span>' +
      '</div>' +
      badgeCorreta +
    '</div>';
  });

  var boxRef = document.getElementById('telao-referencia-box');
  var txtRef = document.getElementById('telao-referencia-texto');
  if (boxRef && txtRef) {
    if (isRevelado && questao.Referencia && questao.Referencia.trim()) {
      txtRef.innerText = questao.Referencia;
      boxRef.classList.remove('hidden');
    } else {
      boxRef.classList.add('hidden');
    }
  }

  var boxStatsRev = document.getElementById('telao-stats-revelacao');
  if (isRevelado && stats) {
    boxStatsRev.classList.remove('hidden');
    var barrasGrid = document.getElementById('telao-stats-barras');
    barrasGrid.innerHTML = '';
    for (var l in stats.porcentagens) {
      var cor = getKahootColorClass(l);
      barrasGrid.innerHTML += '<div class="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center"><span class="inline-block w-8 h-8 rounded-xl font-black text-sm mb-1 ' + cor + '">' + l + '</span><div class="text-3xl font-black text-white">' + (stats.porcentagens[l] || 0) + '%</div><div class="text-xs text-slate-400">' + (stats.contagem[l] || 0) + ' votos</div></div>';
    }
  } else {
    boxStatsRev.classList.add('hidden');
  }
};

function renderBlocosPodioGenerico(containerId, ranking, tabelaRestantesId, boxRestantesId) {
  var container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  if (ranking[1]) {
    container.innerHTML += '<div class="flex flex-col items-center flex-1 max-w-[160px]"><span class="text-sm font-bold truncate mb-1">' + ranking[1].Nome + '</span><div class="w-full bg-slate-400 h-36 rounded-t-3xl flex flex-col justify-center items-center text-slate-900 shadow-xl border-t-4 border-slate-300"><span class="text-3xl font-black">2º</span><span class="text-xs font-bold">' + ranking[1].Pontos + ' pts</span></div></div>';
  }
  if (ranking[0]) {
    container.innerHTML += '<div class="flex flex-col items-center flex-1 max-w-[190px]"><span class="text-2xl animate-bounce mb-1">👑</span><span class="text-base font-black truncate mb-1">' + ranking[0].Nome + '</span><div class="w-full bg-amber-400 h-48 rounded-t-3xl flex flex-col justify-center items-center text-slate-950 shadow-2xl border-t-4 border-yellow-200"><span class="text-5xl font-black">1º</span><span class="text-sm font-black">' + ranking[0].Pontos + ' pts</span></div></div>';
  }
  if (ranking[2]) {
    container.innerHTML += '<div class="flex flex-col items-center flex-1 max-w-[160px]"><span class="text-sm font-bold truncate mb-1">' + ranking[2].Nome + '</span><div class="w-full bg-amber-700 h-28 rounded-t-3xl flex flex-col justify-center items-center text-white shadow-xl border-t-4 border-amber-600"><span class="text-2xl font-black">3º</span><span class="text-xs font-bold">' + ranking[2].Pontos + ' pts</span></div></div>';
  }

  if (tabelaRestantesId && boxRestantesId) {
    var boxRest = document.getElementById(boxRestantesId);
    var tbodyRest = document.getElementById(tabelaRestantesId);
    if (boxRest && tbodyRest) {
      if (ranking.length > 3) {
        boxRest.classList.remove('hidden');
        tbodyRest.innerHTML = '';
        for (var i = 3; i < ranking.length; i++) {
          var item = ranking[i];
          tbodyRest.innerHTML += '<tr class="hover:bg-slate-800/50">' +
            '<td class="p-2.5 font-bold">' + (i + 1) + 'º</td>' +
            '<td class="p-2.5 font-medium">' + item.Nome + '</td>' +
            '<td class="p-2.5 text-right font-black text-indigo-400">' + item.Pontos + ' pts</td>' +
            '<td class="p-2.5 text-right text-slate-400">' + (item.Aproveitamento || 0) + '%</td>' +
          '</tr>';
        }
      } else {
        boxRest.classList.add('hidden');
      }
    }
  }
}

window.atualizarConsoleLive = function(concurso, questao, stats, timer) {
  var badge = document.getElementById('badge-status-concurso-live');
  if (badge) {
    badge.innerText = concurso.Status;
    if (concurso.Status === 'Ativo') {
      badge.className = 'text-[10px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase';
    } else if (concurso.Status === 'Cancelado') {
      badge.className = 'text-[10px] font-black px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase';
    } else {
      badge.className = 'text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase';
    }
  }

  var badgeCockpit = document.getElementById('badge-timer-cockpit');
  if (badgeCockpit) {
    if (timer && timer.limite > 0 && concurso.Status === 'Ativo' && !concurso.Resposta_Revelada) {
      badgeCockpit.classList.remove('hidden');
      badgeCockpit.innerText = '⏱️ ' + timer.restante + 's / ' + timer.limite + 's';
    } else {
      badgeCockpit.classList.add('hidden');
    }
  }

  var btnIniciar = document.getElementById('btn-iniciar-concurso-live');
  if (btnIniciar) {
    btnIniciar.style.display = (concurso.Status === 'Ativo' || concurso.Status === 'Cancelado') ? 'none' : 'inline-flex';
  }

  var btnReabrir = document.getElementById('btn-reabrir-live');
  if (btnReabrir) {
    btnReabrir.classList.toggle('hidden', concurso.Status !== 'Finalizado');
  }

  var labelResp = document.getElementById('live-total-respostas');
  if (labelResp && stats) {
    labelResp.innerText = stats.totalRespostas + ' de ' + stats.totalPresentes + ' responderam (' + stats.percentualRespondido + '%)';
  }

  var livePerguntaEl = document.getElementById('live-pergunta-texto');
  var liveAltEl = document.getElementById('live-alternativas-lista');

  if (!questao) {
    if (livePerguntaEl) {
      if (concurso.Status === 'Cancelado') {
        livePerguntaEl.innerText = '⚠️ Concurso Cancelado. Todos os pontos estão anulados.';
      } else if (concurso.Status === 'Agendado') {
        var presTxt = (stats && stats.totalPresentes > 0)
          ? 'Concurso na sala de espera (' + stats.totalPresentes + ' participantes conectados aguardando). Clique em "▶ Iniciar Concurso" acima.'
          : 'Concurso aguardando início. Clique em "▶ Iniciar Concurso" acima.';
        livePerguntaEl.innerText = presTxt;
      } else if (concurso.Status === 'Finalizado') {
        livePerguntaEl.innerText = 'Concurso Finalizado com sucesso!';
      } else {
        livePerguntaEl.innerText = 'Nenhuma pergunta ativa no momento.';
      }
    }
    if (liveAltEl) liveAltEl.innerHTML = '';
    return;
  }

  if (livePerguntaEl) livePerguntaEl.innerText = questao.Pergunta;
  if (liveAltEl) {
    liveAltEl.innerHTML = '';
    var opcoes = JSON.parse(questao.Opcoes_JSON || '[]');
    var corretas = JSON.parse(questao.Respostas_Corretas_JSON || '[]');
    opcoes.forEach(function(op) {
      var isGabarito = corretas.indexOf(op.letra) !== -1;
      var badgeCorreta = isGabarito ? '<span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">GABARITO</span>' : '';
      liveAltEl.innerHTML += '<div class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"><div class="flex items-center space-x-2"><span class="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ' + getKahootColorClass(op.letra) + '">' + op.letra + '</span><span class="font-bold">' + op.texto + '</span></div>' + badgeCorreta + '</div>';
    });
  }

  renderAdminStats(stats);
};

window.renderQuestaoParticipante = function(q, rsp, respostaRevelada) {
  document.getElementById('quiz-titulo').innerText = q.Tema || 'Quiz Interativo';
  document.getElementById('quiz-tema').innerText = 'Tema: ' + (q.Tema || 'Geral');
  document.getElementById('quiz-peso').innerText = parseFloat(q.Pontuacao_Max || 1).toFixed(1) + ' pt';
  document.getElementById('quiz-pergunta').innerText = q.Pergunta;

  var alertTipo = document.getElementById('quiz-tipo-alerta');
  alertTipo.innerText = q.Tipo_Selecao === 'Multipla'
    ? ('* Marque até ' + q.Qtd_Permitida + ' opções corretas')
    : '* Escolha apenas 1 alternativa';

  var container = document.getElementById('quiz-opcoes');
  container.innerHTML = '';

  var opcoes = JSON.parse(q.Opcoes_JSON || '[]');
  opcoes.forEach(function(op) {
    var btn = document.createElement('button');
    btn.type = 'button';
    var corLetra = getKahootColorClass(op.letra);
    btn.className = 'btn-opcao w-full text-left p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 font-bold text-sm flex items-center space-x-3.5 shadow-xs';
    btn.id = 'btn-op-' + op.letra;
    btn.onclick = function() { alternarSelecao(op.letra); };
    btn.innerHTML = '<span class="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ' + corLetra + '">' + op.letra + '</span><span class="text-slate-800 dark:text-slate-100">' + op.texto + '</span>';
    container.appendChild(btn);
  });

  var btnConf = document.getElementById('btn-confirmar');
  if (rsp) {
    AppState.respostaEnviada = true;
    bloquearOpcoes(JSON.parse(rsp.Opcoes_Selecionadas_JSON || '[]'));
  } else {
    btnConf.disabled = false;
    btnConf.innerText = 'Confirmar Resposta';
  }
};

window.alternarSelecao = function(letra) {
  if (AppState.respostaEnviada) return;

  if (AppState.tipoSelecao === 'Unica') {
    AppState.selecionadas.clear();
    AppState.selecionadas.add(letra);
  } else {
    if (AppState.selecionadas.has(letra)) {
      AppState.selecionadas.delete(letra);
    } else {
      if (AppState.selecionadas.size < AppState.maxPermitido) {
        AppState.selecionadas.add(letra);
      } else {
        toast('Você pode escolher no máximo ' + AppState.maxPermitido + ' opções.', 'error');
      }
    }
  }

  var btns = document.querySelectorAll('.btn-opcao');
  btns.forEach(function(el) { el.classList.remove('selecionada'); });
  AppState.selecionadas.forEach(function(l) {
    var b = document.getElementById('btn-op-' + l);
    if (b) b.classList.add('selecionada');
  });
};

window.confirmarResposta = function() {
  if (AppState.selecionadas.size === 0) return toast('Selecione uma resposta antes de enviar.', 'error');

  var arr = Array.from(AppState.selecionadas);
  var btn = document.getElementById('btn-confirmar');
  btn.disabled = true;
  btn.innerText = 'Gravando resposta...';

  google.script.run
    .withSuccessHandler(function() {
      AppState.respostaEnviada = true;
      bloquearOpcoes(arr);
      toast('Resposta registrada com sucesso!', 'success');
    })
    .withFailureHandler(function(err) {
      toast(err.message || 'Erro ao enviar resposta', 'error');
      btn.disabled = false;
      btn.innerText = 'Confirmar Resposta';
    })
    .apiSubmitAnswer(AppState.sessionToken, AppState.concursoId, AppState.currentQuestionId, arr);
};

window.bloquearOpcoes = function(escolhas) {
  document.querySelectorAll('.btn-opcao').forEach(function(el) {
    el.onclick = null;
    el.classList.add('opacity-60', 'cursor-not-allowed');
  });
  escolhas.forEach(function(l) {
    var b = document.getElementById('btn-op-' + l);
    if (b) b.classList.add('selecionada');
  });
  var btn = document.getElementById('btn-confirmar');
  btn.disabled = true;
  btn.innerText = '✓ Resposta Confirmada (Aguardando apresentador)';
};

window.renderAdminStats = function(stats) {
  if (!stats) return;
  var chart = document.getElementById('admin-chart');
  chart.innerHTML = '';

  for (var letra in stats.contagem) {
    var pct = stats.porcentagens[letra] || 0;
    var count = stats.contagem[letra] || 0;
    var corLetra = getKahootColorClass(letra);
    chart.innerHTML += '<div class="space-y-1"><div class="flex justify-between text-xs font-bold"><span>Alternativa ' + letra + ' (' + count + ' votos)</span><span>' + pct + '%</span></div><div class="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden"><div class="live-bar h-full rounded-full ' + corLetra + '" style="width: ' + pct + '%"></div></div></div>';
  }
};

window.renderPodio = function(concursoId) {
  if (AppState.pollingTimer) clearInterval(AppState.pollingTimer);
  showView('view-podio');

  var isAdmin = AppState.user && AppState.user.Perfil === 'ADMIN';
  document.getElementById('podio-adm-voltar-box').classList.toggle('hidden', !isAdmin);
  document.getElementById('podio-participant-actions').classList.toggle('hidden', isAdmin);

  google.script.run
    .withSuccessHandler(function(ranking) {
      if (ranking[0]) {
        document.getElementById('podium-1-name').innerText = ranking[0].Nome;
        document.getElementById('podium-1-pts').innerText = ranking[0].Pontos + ' pts';
      }
      if (ranking[1]) {
        document.getElementById('podium-2-name').innerText = ranking[1].Nome;
        document.getElementById('podium-2-pts').innerText = ranking[1].Pontos + ' pts';
      }
      if (ranking[2]) {
        document.getElementById('podium-3-name').innerText = ranking[2].Nome;
        document.getElementById('podium-3-pts').innerText = ranking[2].Pontos + ' pts';
      }

      var tbody = document.getElementById('podio-table-body');
      tbody.innerHTML = '';
      ranking.forEach(function(u, i) {
        var ptsTexto = u.Cancelado ? '<span class="text-rose-500 font-bold">Anulado (0)</span>' : u.Pontos;
        tbody.innerHTML += '<tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50"><td class="p-3 font-bold">' + (i + 1) + 'º</td><td class="p-3 font-medium">' + u.Nome + '</td><td class="p-3 text-right font-extrabold text-indigo-600">' + ptsTexto + '</td><td class="p-3 text-right text-slate-400 font-semibold">' + u.Aproveitamento + '%</td></tr>';
      });
    })
    .apiGetPodio(concursoId);
};

window.abrirModalExplicacaoQuestao = function() {
  var q = AppState.currentQuestionObj;
  if (!q || !q.Referencia) {
    return toast('Nenhuma referência cadastrada para esta questão.', 'info');
  }
  document.getElementById('explicacao-texto').innerText = q.Referencia;
  document.getElementById('modal-explicacao').classList.remove('hidden');
};

window.fecharModalExplicacao = function() {
  document.getElementById('modal-explicacao').classList.add('hidden');
};

window.abrirModalGabarito = function() {
  document.getElementById('modal-gabarito').classList.remove('hidden');
  var container = document.getElementById('gabarito-lista-container');
  container.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">Carregando respostas...</p>';

  google.script.run
    .withSuccessHandler(function(itens) {
      container.innerHTML = '';
      if (!itens || itens.length === 0) {
        container.innerHTML = '<p class="text-xs text-slate-400 text-center">Nenhuma resposta gravada.</p>';
        return;
      }

      itens.forEach(function(item) {
        var acertou = item.pontos > 0;
        var statusIcon = acertou ? '✅' : '❌';
        var statusBorder = acertou ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/40' : 'border-rose-200 dark:border-rose-900 bg-rose-50/40';

        container.innerHTML += '<div class="p-3.5 rounded-2xl border ' + statusBorder + ' space-y-1.5 text-xs"><div class="flex items-center justify-between"><span class="font-extrabold text-slate-900 dark:text-white">Questão ' + item.numero + ' (' + item.tema + ')</span><span class="font-bold">' + statusIcon + ' +' + item.pontos + ' pts</span></div><p class="font-medium text-slate-700 dark:text-slate-300">' + item.pergunta + '</p><div class="flex flex-wrap gap-3 pt-1 text-[11px]"><span>Sua Resposta: <strong class="' + (acertou ? 'text-emerald-600' : 'text-rose-600') + '">' + (item.marcadas.join(', ') || 'Nenhuma') + '</strong></span><span>Gabarito: <strong class="text-emerald-600">' + item.corretas.join(', ') + '</strong></span></div>' + (item.referencia ? '<p class="text-[10px] text-slate-400 italic">Ref: ' + item.referencia + '</p>' : '') + '</div>';
      });
    })
    .apiGetMeuGabarito(AppState.sessionToken, AppState.concursoId);
};

window.fecharModalGabarito = function() {
  document.getElementById('modal-gabarito').classList.add('hidden');
};

window.switchAdminTab = function(tab) {
  var tabs = ['live', 'concursos', 'questoes', 'usuarios', 'relatorios'];
  tabs.forEach(function(t) {
    document.getElementById('adm-content-' + t).classList.add('hidden');
    var b = document.getElementById('tab-adm-' + t);
    b.className = 'px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:text-slate-400 transition';
  });

  document.getElementById('adm-content-' + tab).classList.remove('hidden');
  document.getElementById('tab-adm-' + tab).className = 'px-4 py-2 rounded-xl text-xs font-extrabold bg-indigo-600 text-white shadow-xs transition';

  if (tab === 'relatorios') {
    carregarSuperPodioPeriodo();
  }
};

window.abrirModalBranding = function() {
  google.script.run
    .withSuccessHandler(function(cfg) {
      document.getElementById('branding-nome').value = cfg.orgName || '';
      document.getElementById('branding-desc').value = cfg.orgDesc || '';
      document.getElementById('branding-logo').value = cfg.logoUrl || '';
      document.getElementById('modal-branding').classList.remove('hidden');
    })
    .apiGetOrgConfig();
};

window.fecharModalBranding = function() {
  document.getElementById('modal-branding').classList.add('hidden');
};

window.salvarBranding = function() {
  var config = {
    orgName: document.getElementById('branding-nome').value,
    orgDesc: document.getElementById('branding-desc').value,
    logoUrl: document.getElementById('branding-logo').value
  };

  google.script.run
    .withSuccessHandler(function() {
      toast('Identidade visual atualizada com sucesso!', 'success');
      document.getElementById('header-title').innerText = config.orgName;
      document.getElementById('header-desc').innerText = config.orgDesc;
      document.getElementById('header-logo').src = config.logoUrl;
      fecharModalBranding();
    })
    .apiSaveOrgConfig(AppState.sessionToken, config);
};

window.restaurarBrandingPadrao = function() {
  if (!confirm('Deseja restaurar o nome e a logomarca padrão de fábrica?')) return;
  google.script.run
    .withSuccessHandler(function(cfg) {
      toast('Padrão restaurado com sucesso!', 'info');
      document.getElementById('header-title').innerText = cfg.orgName;
      document.getElementById('header-desc').innerText = cfg.orgDesc;
      document.getElementById('header-logo').src = cfg.logoUrl;
      fecharModalBranding();
    })
    .apiResetOrgConfig(AppState.sessionToken);
};

window.abrirModalVerQuestao = function(questaoId) {
  var q = AppState.questoesList.find(function(item) { return item.ID_Questao === questaoId; });
  if (!q) return toast('Questão não localizada.', 'error');

  document.getElementById('ver-questao-tema').innerText = q.Tema || 'Geral';
  document.getElementById('ver-questao-pergunta').innerText = q.Pergunta;
  document.getElementById('ver-questao-gabarito').innerText = q.Respostas_Corretas_JSON;
  document.getElementById('ver-questao-ref').innerText = q.Referencia || 'Nenhuma cadastrada';

  var grid = document.getElementById('ver-questao-opcoes-grid');
  grid.innerHTML = '';
  var opcoes = JSON.parse(q.Opcoes_JSON || '[]');
  var corretas = JSON.parse(q.Respostas_Corretas_JSON || '[]');

  opcoes.forEach(function(op) {
    var isCorreta = corretas.indexOf(op.letra) !== -1;
    var corLetra = getKahootColorClass(op.letra);
    var neon = isCorreta ? 'neon-correct' : '';
    grid.innerHTML += '<div class="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs ' + neon + '"><div class="flex items-center space-x-2"><span class="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] ' + corLetra + '">' + op.letra + '</span><span class="font-bold">' + op.texto + '</span></div>' + (isCorreta ? '<span class="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">CORRETA</span>' : '') + '</div>';
  });

  document.getElementById('modal-ver-questao').classList.remove('hidden');
};

window.fecharModalVerQuestao = function() {
  document.getElementById('modal-ver-questao').classList.add('hidden');
};

window.carregarQuestaoParaEdicao = function(questaoId) {
  var q = AppState.questoesList.find(function(item) { return item.ID_Questao === questaoId; });
  if (!q) return toast('Questão não localizada.', 'error');

  document.getElementById('edit-questao-id-form').value = q.ID_Questao;
  document.getElementById('manual-tema').value = q.Tema || '';
  document.getElementById('manual-ref').value = q.Referencia || '';
  document.getElementById('manual-enunciado').value = q.Pergunta || '';
  document.getElementById('manual-tipo').value = q.Tipo_Selecao || 'Unica';
  document.getElementById('manual-peso').value = q.Pontuacao_Max || 1.0;

  var container = document.getElementById('container-alternativas-dinamicas');
  container.innerHTML = '';
  var opcoes = JSON.parse(q.Opcoes_JSON || '[]');
  var corretas = JSON.parse(q.Respostas_Corretas_JSON || '[]');

  opcoes.forEach(function(op) {
    adicionarLinhaAlternativa(op.letra, op.texto);
    var linha = container.querySelector('[data-letra="' + op.letra + '"]');
    if (linha && corretas.indexOf(op.letra) !== -1) {
      linha.querySelector('.checkbox-opcao-correta').checked = true;
    }
  });

  document.getElementById('form-questao-titulo-acao').innerText = '✏️ Editando Pergunta';
  document.getElementById('btn-cancelar-edicao-questao').classList.remove('hidden');
  document.getElementById('btn-salvar-questao-form').innerText = 'Salvar Alterações da Pergunta';

  document.getElementById('form-questao-titulo-acao').scrollIntoView({ behavior: 'smooth' });
};

window.cancelarEdicaoQuestao = function() {
  document.getElementById('edit-questao-id-form').value = '';
  document.getElementById('manual-tema').value = '';
  document.getElementById('manual-ref').value = '';
  document.getElementById('manual-enunciado').value = '';
  document.getElementById('form-questao-titulo-acao').innerText = 'Criar Nova Pergunta Interativa';
  document.getElementById('btn-cancelar-edicao-questao').classList.add('hidden');
  document.getElementById('btn-salvar-questao-form').innerText = 'Salvar Questão no Concurso';
  iniciarAlternativasPadrao();
};

window.salvarQuestaoManual = function() {
  var cId = AppState.selectedConcursoForQuestion || AppState.concursoId;
  if (!cId) return toast('Selecione um concurso no campo de busca.', 'error');

  var enunciado = document.getElementById('manual-enunciado').value;
  if (!enunciado || !enunciado.trim()) return toast('Digite o enunciado da questão.', 'error');

  var opcoes = [];
  var corretas = [];

  document.querySelectorAll('.linha-alternativa').forEach(function(linha) {
    var letra = linha.dataset.letra;
    var texto = linha.querySelector('.input-opcao-texto').value;
    var isCorreta = linha.querySelector('.checkbox-opcao-correta').checked;

    if (texto && texto.trim()) {
      opcoes.push({ letra: letra, texto: texto.trim() });
      if (isCorreta) corretas.push(letra);
    }
  });

  if (opcoes.length < 2) return toast('Preencha ao menos duas alternativas.', 'error');
  if (corretas.length === 0) return toast('Selecione ao menos uma alternativa correta.', 'error');

  var dados = {
    ID_Concurso: cId,
    Tema: document.getElementById('manual-tema').value || 'Geral',
    Referencia: document.getElementById('manual-ref').value || '',
    Pergunta: enunciado.trim(),
    Tipo_Selecao: document.getElementById('manual-tipo').value,
    Qtd_Permitida: corretas.length,
    Opcoes_JSON: JSON.stringify(opcoes),
    Respostas_Corretas_JSON: JSON.stringify(corretas),
    Pontuacao_Max: parseFloat(document.getElementById('manual-peso').value || 1)
  };

  var editId = document.getElementById('edit-questao-id-form').value;

  if (editId) {
    google.script.run
      .withSuccessHandler(function() {
        toast('Questão atualizada com sucesso!', 'success');
        cancelarEdicaoQuestao();
        carregarQuestoesAdmin();
      })
      .apiAdminUpdateQuestao(AppState.sessionToken, editId, dados);
  } else {
    google.script.run
      .withSuccessHandler(function() {
        toast('Questão salva com sucesso!', 'success');
        document.getElementById('manual-enunciado').value = '';
        iniciarAlternativasPadrao();
        carregarQuestoesAdmin();
      })
      .apiAdminCreateQuestao(AppState.sessionToken, dados);
  }
};

// =========================================================================
// --- DASHBOARD: SUPER PÓDIO POR PERÍODO (VISUAL 1º, 2º, 3º + PROJEÇÃO) ---
// =========================================================================
window.carregarSuperPodioPeriodo = function() {
  var dtInicio = document.getElementById('filtro-periodo-inicio').value;
  var dtFim = document.getElementById('filtro-periodo-fim').value;

  google.script.run
    .withSuccessHandler(function(res) {
      document.getElementById('kpi-total-concursos').innerText = res.kpis.totalConcursos;
      document.getElementById('kpi-total-participantes').innerText = res.kpis.totalParticipantes;
      document.getElementById('kpi-media-pontos').innerText = res.kpis.mediaPontos;

      var ranking = res.ranking || [];
      if (ranking[0]) {
        document.getElementById('super-podio-1-name').innerText = ranking[0].Nome;
        document.getElementById('super-podio-1-pts').innerText = ranking[0].Pontos + ' pts';
      } else {
        document.getElementById('super-podio-1-name').innerText = '---';
        document.getElementById('super-podio-1-pts').innerText = '0 pts';
      }
      if (ranking[1]) {
        document.getElementById('super-podio-2-name').innerText = ranking[1].Nome;
        document.getElementById('super-podio-2-pts').innerText = ranking[1].Pontos + ' pts';
      } else {
        document.getElementById('super-podio-2-name').innerText = '---';
        document.getElementById('super-podio-2-pts').innerText = '0 pts';
      }
      if (ranking[2]) {
        document.getElementById('super-podio-3-name').innerText = ranking[2].Nome;
        document.getElementById('super-podio-3-pts').innerText = ranking[2].Pontos + ' pts';
      } else {
        document.getElementById('super-podio-3-name').innerText = '---';
        document.getElementById('super-podio-3-pts').innerText = '0 pts';
      }

      var tbody = document.getElementById('lista-super-podio-body');
      tbody.innerHTML = '';
      if (ranking.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400 text-xs">Nenhum evento registrado no período.</td></tr>';
        return;
      }

      ranking.forEach(function(u, idx) {
        tbody.innerHTML += '<tr>' +
          '<td class="p-2.5 font-bold">' + (idx + 1) + 'º</td>' +
          '<td class="p-2.5 font-extrabold text-slate-900 dark:text-white">' + u.Nome + '</td>' +
          '<td class="p-2.5 text-slate-400">' + u.Email + '</td>' +
          '<td class="p-2.5 text-right font-bold">' + u.TotalEventos + '</td>' +
          '<td class="p-2.5 text-right font-bold text-emerald-600">' + u.Acertos + '</td>' +
          '<td class="p-2.5 text-right font-black text-indigo-600">' + u.Pontos + ' pts</td>' +
        '</tr>';
      });
    })
    .apiAdminGetSuperPodio(AppState.sessionToken, dtInicio, dtFim);
};

window.projetarSuperPodioTelao = function() {
  var dtInicio = document.getElementById('filtro-periodo-inicio').value;
  var dtFim = document.getElementById('filtro-periodo-fim').value;
  var urlPublica = window.location.href.split('?')[0];
  window.open(urlPublica + '?view=telao&superpodio=true&inicio=' + encodeURIComponent(dtInicio) + '&fim=' + encodeURIComponent(dtFim), '_blank');
};

function carregarSuperPodioNoTelao(dtInicio, dtFim) {
  document.getElementById('telao-fase-espera').classList.add('hidden');
  document.getElementById('telao-fase-pergunta').classList.add('hidden');
  document.getElementById('telao-fase-podio').classList.remove('hidden');
  document.getElementById('telao-podio-titulo').innerText = '🏆 Super Pódio dos Campeões';

  google.script.run
    .withSuccessHandler(function(res) {
      renderBlocosPodioGenerico('telao-podio-container', res.ranking || [], 'telao-tabela-restantes', 'telao-box-restantes');
    })
    .apiGetSuperPodioTelao(dtInicio, dtFim);
}

// ==========================================
// --- COMANDOS DO APRESENTADOR (AO VIVO) ---
// ==========================================
window.adminIniciarConcurso = function() {
  if (!AppState.concursoId) return toast('Selecione um concurso para iniciar.', 'error');
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso iniciado com sucesso! 1ª pergunta no ar.', 'success');
      carregarDadosAdmin();
      fetchUpdates();
    })
    .apiAdminStartContest(AppState.sessionToken, AppState.concursoId);
};

window.adminPerguntaAnterior = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso ativo.', 'error');
  google.script.run
    .withSuccessHandler(function() {
      toast('Voltando para a pergunta anterior...', 'info');
      fetchUpdates();
    })
    .apiAdminPrevQuestion(AppState.sessionToken, AppState.concursoId);
};

window.adminProximaPergunta = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso ativo.', 'error');
  google.script.run
    .withSuccessHandler(function(res) {
      if (res.finalizado) toast('Concurso concluído!', 'info');
      else toast('Pergunta avançada!', 'success');
      fetchUpdates();
    })
    .apiAdminNextQuestion(AppState.sessionToken, AppState.concursoId);
};

window.adminToggleRevelar = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso ativo.', 'error');
  google.script.run
    .withSuccessHandler(function() {
      toast('Gabarito revelado na tela!', 'info');
      fetchUpdates();
    })
    .apiAdminToggleReveal(AppState.sessionToken, AppState.concursoId);
};

window.adminFinalizarConcurso = function() {
  if (!confirm('Deseja encerrar e exibir o pódio final?')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso finalizado!', 'success');
      fetchUpdates();
    })
    .apiAdminFinishContest(AppState.sessionToken, AppState.concursoId);
};

window.adminReabrirConcursoAtual = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso selecionado.', 'error');
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso reaberto com sucesso!', 'success');
      carregarDadosAdmin();
      fetchUpdates();
    })
    .apiAdminReopenContest(AppState.sessionToken, AppState.concursoId);
};

window.adminResetarParaAgendadoAtual = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso selecionado.', 'error');
  if (!confirm('Deseja redefinir este concurso para a Sala de Espera? Todas as respostas e presenças anteriores serão apagadas e os pontos zerados para começar limpo.')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso redefinido para a sala de espera. Placar zerado com sucesso!', 'info');
      carregarDadosAdmin();
      fetchUpdates();
    })
    .apiAdminResetToScheduled(AppState.sessionToken, AppState.concursoId);
};

// ==========================================
// --- CRUD COMPLETO DE USUÁRIOS (ADM) ---
// ==========================================
window.abrirModalEditarUsuario = function(userId) {
  var u = AppState.usersList.find(function(item) { return item.ID_Usuario === userId; });
  if (!u) return toast('Usuário não localizado.', 'error');

  document.getElementById('edit-user-id').value = u.ID_Usuario;
  document.getElementById('edit-user-nome').value = u.Nome || '';
  document.getElementById('edit-user-email').value = u.Email || '';
  document.getElementById('edit-user-tel').value = u.Telefone || '';
  document.getElementById('edit-user-igreja').value = u.Igreja_Unidade || '';
  document.getElementById('edit-user-perfil').value = u.Perfil || 'USER';
  document.getElementById('edit-user-status').value = u.Status_Conta || 'Ativo';
  document.getElementById('edit-user-senha').value = '';

  document.getElementById('modal-editar-usuario').classList.remove('hidden');
};

window.fecharModalEditarUsuario = function() {
  document.getElementById('modal-editar-usuario').classList.add('hidden');
};

window.salvarEdicaoUsuario = function() {
  var userId = document.getElementById('edit-user-id').value;
  var dados = {
    Nome: document.getElementById('edit-user-nome').value,
    Email: document.getElementById('edit-user-email').value,
    Telefone: document.getElementById('edit-user-tel').value,
    Igreja_Unidade: document.getElementById('edit-user-igreja').value,
    Perfil: document.getElementById('edit-user-perfil').value,
    Status_Conta: document.getElementById('edit-user-status').value,
    NovaSenha: document.getElementById('edit-user-senha').value
  };

  if (!dados.Nome || !dados.Email) return toast('Nome e e-mail são obrigatórios.', 'error');

  google.script.run
    .withSuccessHandler(function() {
      toast('Usuário atualizado com sucesso!', 'success');
      fecharModalEditarUsuario();
      carregarDadosAdmin();
    })
    .apiAdminUpdateUser(AppState.sessionToken, userId, dados);
};

window.deletarUsuario = function(userId) {
  if (!confirm('Deseja realmente excluir este usuário?')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Usuário excluído.', 'info');
      carregarDadosAdmin();
    })
    .apiAdminDeleteUser(AppState.sessionToken, userId);
};

window.alternarStatusUsuario = function(id, novoStatus) {
  google.script.run
    .withSuccessHandler(function() {
      toast('Status atualizado.', 'success');
      carregarDadosAdmin();
    })
    .apiAdminToggleUserStatus(AppState.sessionToken, id, novoStatus);
};

// ==========================================
// --- CRUD COMPLETO DE CONCURSOS (ADM) ---
// ==========================================
window.abrirModalEditarConcurso = function(concursoId) {
  var c = AppState.concursosList.find(function(item) { return item.ID_Concurso === concursoId; });
  if (!c) return toast('Concurso não localizado.', 'error');

  document.getElementById('edit-concurso-id').value = c.ID_Concurso;
  document.getElementById('edit-concurso-titulo').value = c.Titulo || '';
  document.getElementById('edit-concurso-data-inicio').value = (c.Data_Inicio || '').split(' ')[0];
  document.getElementById('edit-concurso-data-fim').value = (c.Data_Fim || '').split(' ')[0];
  document.getElementById('edit-concurso-tempo').value = c.Tempo_Limite_Segundos || 0;

  document.getElementById('modal-editar-concurso').classList.remove('hidden');
};

window.fecharModalEditarConcurso = function() {
  document.getElementById('modal-editar-concurso').classList.add('hidden');
};

window.salvarEdicaoConcurso = function() {
  var cId = document.getElementById('edit-concurso-id').value;
  var dados = {
    Titulo: document.getElementById('edit-concurso-titulo').value,
    Data_Inicio: document.getElementById('edit-concurso-data-inicio').value,
    Data_Fim: document.getElementById('edit-concurso-data-fim').value,
    Tempo_Limite_Segundos: parseInt(document.getElementById('edit-concurso-tempo').value || 0)
  };

  if (!dados.Titulo) return toast('O título é obrigatório.', 'error');

  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso atualizado com sucesso!', 'success');
      fecharModalEditarConcurso();
      carregarDadosAdmin();
    })
    .apiAdminUpdateConcurso(AppState.sessionToken, cId, dados);
};

window.deletarConcurso = function(concursoId) {
  if (!confirm('Deseja excluir este concurso e todas as perguntas e respostas vinculadas?')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso excluído.', 'info');
      carregarDadosAdmin();
    })
    .apiAdminDeleteConcurso(AppState.sessionToken, concursoId);
};

window.cancelarConcurso = function(concursoId) {
  if (!confirm('Deseja cancelar este concurso? Todos os pontos serão anulados imediatamente.')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso cancelado. Pontos anulados!', 'info');
      carregarDadosAdmin();
      fetchUpdates();
    })
    .apiAdminCancelContest(AppState.sessionToken, concursoId);
};

window.adminCancelarConcursoAtual = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso ativo.', 'error');
  cancelarConcurso(AppState.concursoId);
};

window.reativarConcurso = function(concursoId) {
  if (!confirm('Deseja reativar este concurso? Todos os pontos originais serão recalculados e restaurados!')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso reativado com sucesso! Pontos restaurados.', 'success');
      carregarDadosAdmin();
      fetchUpdates();
    })
    .apiAdminReactivateContest(AppState.sessionToken, concursoId);
};

window.adminReativarConcursoAtual = function() {
  if (!AppState.concursoId) return toast('Nenhum concurso selecionado.', 'error');
  reativarConcurso(AppState.concursoId);
};

// --- CARREGAMENTO DO PAINEL ADM ---
window.carregarDadosAdmin = function() {
  google.script.run
    .withSuccessHandler(function(lista) {
      AppState.concursosList = lista;
      var tbody = document.getElementById('lista-concursos-body');
      var selectLive = document.getElementById('select-concurso-live');

      tbody.innerHTML = '';
      selectLive.innerHTML = '<option value="">Selecione um concurso...</option>';

      if (lista.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="p-4 text-center text-slate-400 text-xs">Nenhum concurso cadastrado ainda.</td></tr>';
        return;
      }

      lista.forEach(function(c) {
        var opt = document.createElement('option');
        opt.value = c.ID_Concurso;
        opt.innerText = c.Titulo + ' (' + c.Status + ')';
        selectLive.appendChild(opt);

        if (!AppState.concursoId && (c.Status === 'Ativo' || c.Status === 'Agendado')) {
          AppState.concursoId = c.ID_Concurso;
          AppState.concursoToken = c.QRCode_Token;
        }

        if (!AppState.selectedConcursoForQuestion) {
          AppState.selectedConcursoForQuestion = c.ID_Concurso;
          document.getElementById('quest-concurso-search').value = c.Titulo;
          document.getElementById('quest-concurso-selecionado-label').innerText = '✓ Vinculado a: ' + c.Titulo;
        }

        var statusBadge = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
        if (c.Status === 'Ativo') {
          statusBadge = 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300';
        } else if (c.Status === 'Cancelado') {
          statusBadge = 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300';
        }

        var tempoTxt = c.Tempo_Limite_Segundos > 0 ? (c.Tempo_Limite_Segundos + 's') : 'Manual';

        var btnCancelarOuReativar = c.Status === 'Cancelado'
          ? '<button type="button" onclick="reativarConcurso(\'' + c.ID_Concurso + '\')" class="px-2 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 rounded text-[10px] font-bold">Reativar</button>'
          : '<button type="button" onclick="cancelarConcurso(\'' + c.ID_Concurso + '\')" class="px-2 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[10px] font-bold">Cancelar</button>';

        tbody.innerHTML += '<tr>' +
          '<td class="p-3 font-mono font-bold text-slate-500">' + c.ID_Concurso + '</td>' +
          '<td class="p-3 font-extrabold text-slate-900 dark:text-white">' + c.Titulo + '</td>' +
          '<td class="p-3 text-slate-500 font-bold">' + tempoTxt + '</td>' +
          '<td class="p-3"><span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ' + statusBadge + '">' + c.Status + '</span></td>' +
          '<td class="p-3 font-mono text-indigo-500 font-bold">' + c.QRCode_Token + '</td>' +
          '<td class="p-3 text-right space-x-1">' +
            '<button type="button" onclick="selecionarConcurso(\'' + c.ID_Concurso + '\', \'' + c.QRCode_Token + '\', \'' + c.Titulo + '\')" class="px-2 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-[10px] font-bold">Ativar</button>' +
            '<button type="button" onclick="exibirModalQR(\'' + c.QRCode_Token + '\', \'' + c.Titulo + '\')" class="px-2 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-[10px] font-bold">QR</button>' +
            '<button type="button" onclick="abrirModalEditarConcurso(\'' + c.ID_Concurso + '\')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-bold">Editar</button>' +
            btnCancelarOuReativar +
            '<button type="button" onclick="deletarConcurso(\'' + c.ID_Concurso + '\')" class="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded text-[10px] font-bold">✕</button>' +
          '</td>' +
        '</tr>';
      });

      if (AppState.concursoId) {
        selectLive.value = AppState.concursoId;
        fetchUpdates();
      }

      carregarQuestoesAdmin();
    })
    .apiAdminListConcursos(AppState.sessionToken);

  // Listagem de Usuários
  google.script.run
    .withSuccessHandler(function(users) {
      AppState.usersList = users;
      var tbody = document.getElementById('lista-usuarios-body');
      tbody.innerHTML = '';
      users.forEach(function(u) {
        var statusColor = u.Status_Conta === 'Ativo' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700';
        var perfilBadge = u.Perfil === 'ADMIN' ? 'bg-indigo-50 text-indigo-700 font-black' : 'bg-slate-100 text-slate-600';
        tbody.innerHTML += '<tr>' +
          '<td class="p-3 font-extrabold text-slate-900 dark:text-white">' + u.Nome + '</td>' +
          '<td class="p-3 text-slate-400">' + u.Email + '</td>' +
          '<td class="p-3">' + (u.Telefone || '-') + '</td>' +
          '<td class="p-3">' + (u.Igreja_Unidade || '-') + '</td>' +
          '<td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] ' + perfilBadge + '">' + u.Perfil + '</span></td>' +
          '<td class="p-3"><span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ' + statusColor + '">' + u.Status_Conta + '</span></td>' +
          '<td class="p-3 text-right space-x-1">' +
            '<button type="button" onclick="abrirModalEditarUsuario(\'' + u.ID_Usuario + '\')" class="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition">Editar</button>' +
            '<button type="button" onclick="alternarStatusUsuario(\'' + u.ID_Usuario + '\', \'' + (u.Status_Conta === 'Ativo' ? 'Inativo' : 'Ativo') + '\')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition">' + (u.Status_Conta === 'Ativo' ? 'Bloquear' : 'Ativar') + '</button>' +
            '<button type="button" onclick="deletarUsuario(\'' + u.ID_Usuario + '\')" class="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition">✕</button>' +
          '</td>' +
        '</tr>';
      });
    })
    .apiAdminListUsers(AppState.sessionToken);
};

window.selecionarConcursoPeloSelect = function(concursoId) {
  if (!concursoId) return;
  var c = AppState.concursosList.find(function(item) { return item.ID_Concurso === concursoId; });
  if (c) selecionarConcurso(c.ID_Concurso, c.QRCode_Token, c.Titulo);
};

window.selecionarConcurso = function(id, token, titulo) {
  AppState.concursoId = id;
  AppState.concursoToken = token;
  AppState.selectedConcursoForQuestion = id;
  var sel = document.getElementById('select-concurso-live');
  if (sel) sel.value = id;
  document.getElementById('quest-concurso-search').value = titulo;
  document.getElementById('quest-concurso-selecionado-label').innerText = '✓ Vinculado a: ' + titulo;
  carregarQuestoesAdmin();
  startPolling();
  toast('Concurso "' + titulo + '" ativo no console!', 'success');
};

window.carregarQuestoesAdmin = function() {
  var cId = AppState.selectedConcursoForQuestion || AppState.concursoId;
  if (!cId) return;

  google.script.run
    .withSuccessHandler(function(questoes) {
      AppState.questoesList = questoes;
      var tbody = document.getElementById('lista-questoes-body');
      tbody.innerHTML = '';
      if (questoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="p-4 text-center text-slate-400 text-xs">Nenhuma questão cadastrada para este concurso.</td></tr>';
        return;
      }
      questoes.forEach(function(q) {
        tbody.innerHTML += '<tr>' +
          '<td class="p-3 font-bold text-slate-500">' + q.Tema + '</td>' +
          '<td class="p-3 font-semibold text-slate-900 dark:text-white">' + q.Pergunta + '</td>' +
          '<td class="p-3 font-black text-emerald-600">' + q.Respostas_Corretas_JSON + '</td>' +
          '<td class="p-3 font-bold">' + q.Pontuacao_Max + ' pt</td>' +
          '<td class="p-3 text-right space-x-1">' +
            '<button type="button" onclick="abrirModalVerQuestao(\'' + q.ID_Questao + '\')" class="px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded text-[10px] font-bold">👁 Ver</button>' +
            '<button type="button" onclick="carregarQuestaoParaEdicao(\'' + q.ID_Questao + '\')" class="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold">✏️ Editar</button>' +
            '<button type="button" onclick="deletarQuestao(\'' + q.ID_Questao + '\')" class="px-2 py-1 text-rose-600 hover:bg-rose-50 rounded text-[10px] font-bold">✕</button>' +
          '</td>' +
        '</tr>';
      });
    })
    .apiAdminListQuestoes(AppState.sessionToken, cId);
};

window.criarNovoConcurso = function() {
  var titulo = document.getElementById('novo-concurso-titulo').value;
  var tempo = parseInt(document.getElementById('novo-concurso-tempo').value || 0);

  if (!titulo || !titulo.trim()) return toast('Digite o título do concurso.', 'error');

  google.script.run
    .withSuccessHandler(function() {
      toast('Concurso criado com sucesso!', 'success');
      document.getElementById('novo-concurso-titulo').value = '';
      carregarDadosAdmin();
    })
    .apiAdminCreateConcurso(AppState.sessionToken, { Titulo: titulo.trim(), Tempo_Limite_Segundos: tempo });
};

window.iniciarAlternativasPadrao = function() {
  var container = document.getElementById('container-alternativas-dinamicas');
  container.innerHTML = '';
  ['A', 'B', 'C', 'D'].forEach(function(letra) {
    adicionarLinhaAlternativa(letra, '');
  });
};

window.adicionarLinhaAlternativa = function(letra, texto) {
  var container = document.getElementById('container-alternativas-dinamicas');
  var corLetra = getKahootColorClass(letra);

  var div = document.createElement('div');
  div.className = 'linha-alternativa flex items-center space-x-2.5 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700';
  div.dataset.letra = letra;

  div.innerHTML = '<span class="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ' + corLetra + '">' + letra + '</span><input type="text" placeholder="Texto da alternativa ' + letra + '" value="' + (texto || '') + '" class="input-opcao-texto flex-1 px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 outline-none focus:ring-2 focus:ring-indigo-500"><label class="flex items-center space-x-1.5 cursor-pointer px-2"><input type="checkbox" value="' + letra + '" class="checkbox-opcao-correta w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"><span class="text-xs font-bold text-slate-600 dark:text-slate-300">Correta</span></label><button type="button" onclick="removerLinhaAlternativa(this)" class="p-1 text-slate-400 hover:text-rose-500 text-xs font-bold">✕</button>';

  container.appendChild(div);
};

window.adicionarNovaAlternativa = function() {
  var container = document.getElementById('container-alternativas-dinamicas');
  var totalAtual = container.querySelectorAll('.linha-alternativa').length;
  if (totalAtual >= AppState.letrasDisponiveis.length) {
    return toast('Limite máximo atingido.', 'error');
  }
  var proximaLetra = AppState.letrasDisponiveis[totalAtual];
  adicionarLinhaAlternativa(proximaLetra, '');
};

window.removerLinhaAlternativa = function(btn) {
  var container = document.getElementById('container-alternativas-dinamicas');
  if (container.querySelectorAll('.linha-alternativa').length <= 2) {
    return toast('A pergunta deve conter ao menos duas alternativas.', 'error');
  }
  btn.closest('.linha-alternativa').remove();
  reorganizarLetrasAlternativas();
};

window.reorganizarLetrasAlternativas = function() {
  var linhas = document.querySelectorAll('.linha-alternativa');
  linhas.forEach(function(linha, idx) {
    var novaLetra = AppState.letrasDisponiveis[idx];
    linha.dataset.letra = novaLetra;
    var span = linha.querySelector('span');
    span.className = 'w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs ' + getKahootColorClass(novaLetra);
    span.innerText = novaLetra;
    var input = linha.querySelector('.input-opcao-texto');
    input.placeholder = 'Texto da alternativa ' + novaLetra;
    var chk = linha.querySelector('.checkbox-opcao-correta');
    chk.value = novaLetra;
  });
};

window.abrirDropdownConcursos = function() {
  document.getElementById('quest-concurso-dropdown').classList.remove('hidden');
  filtrarConcursosDropdown('');
};

window.filtrarConcursosDropdown = function(termo) {
  var box = document.getElementById('quest-concurso-dropdown');
  box.innerHTML = '';
  var filtrados = AppState.concursosList.filter(function(c) {
    return c.Titulo.toLowerCase().indexOf(termo.toLowerCase()) !== -1;
  });

  if (filtrados.length === 0) {
    box.innerHTML = '<div class="p-3 text-xs text-slate-400 text-center">Nenhum concurso encontrado</div>';
    return;
  }

  filtrados.forEach(function(c) {
    var item = document.createElement('div');
    item.className = 'p-3 hover:bg-indigo-50 dark:hover:bg-slate-700 cursor-pointer text-xs font-bold flex justify-between items-center';
    item.innerHTML = '<span>' + c.Titulo + '</span><span class="text-[10px] text-slate-400 font-mono">' + c.ID_Concurso + '</span>';
    item.onclick = function() {
      AppState.selectedConcursoForQuestion = c.ID_Concurso;
      document.getElementById('quest-concurso-search').value = c.Titulo;
      document.getElementById('quest-concurso-selecionado-label').innerText = '✓ Vinculado a: ' + c.Titulo + ' (' + c.ID_Concurso + ')';
      box.classList.add('hidden');
      carregarQuestoesAdmin();
    };
    box.appendChild(item);
  });
};

document.addEventListener('click', function(e) {
  var dropdown = document.getElementById('quest-concurso-dropdown');
  var input = document.getElementById('quest-concurso-search');
  if (dropdown && input && !input.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

window.gerarQuestoesComIA = function() {
  var cId = AppState.selectedConcursoForQuestion || AppState.concursoId;
  if (!cId) return toast('Selecione um concurso no campo de busca.', 'error');

  var tema = document.getElementById('ai-tema').value;
  var ref = document.getElementById('ai-ref').value;
  var qtd = document.getElementById('ai-qtd').value;
  var apiKey = document.getElementById('ai-apikey').value;

  if (!tema) return toast('Informe o tema para a Inteligência Artificial.', 'error');

  var btn = document.getElementById('btn-gerar-ia');
  var spinner = document.getElementById('spinner-ia');
  btn.disabled = true;
  spinner.classList.remove('hidden');

  google.script.run
    .withSuccessHandler(function(res) {
      btn.disabled = false;
      spinner.classList.add('hidden');
      toast(res.count + ' questões geradas com sucesso!', 'success');
      carregarQuestoesAdmin();
    })
    .apiGenerateQuestionsAI(AppState.sessionToken, {
      concursoId: cId,
      tema: tema,
      referencia: ref,
      quantidade: qtd,
      apiKey: apiKey
    });
};

window.deletarQuestao = function(id) {
  if (!confirm('Deseja excluir esta questão?')) return;
  google.script.run
    .withSuccessHandler(function() {
      toast('Questão excluída.', 'info');
      carregarQuestoesAdmin();
    })
    .apiAdminDeleteQuestao(AppState.sessionToken, id);
};

// ==========================================
// --- MODAL QR CODE CENTRALIZADO ---
// ==========================================
window.exibirModalQR = function(token, titulo) {
  AppState.selectedConcursoTitulo = titulo;
  var urlPublica = window.location.href.split('?')[0];
  var linkAcesso = urlPublica + '?concurso=' + token;
  var qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=' + encodeURIComponent(linkAcesso);

  AppState.selectedQRCodeUrl = qrApiUrl;
  document.getElementById('qr-modal-title').innerText = 'QR Code: ' + titulo;
  document.getElementById('qr-modal-img').src = qrApiUrl;
  document.getElementById('modal-qrcode').classList.remove('hidden');
};

window.fecharModalQR = function() {
  document.getElementById('modal-qrcode').classList.add('hidden');
};

window.baixarQRCode = function() {
  fetch(AppState.selectedQRCodeUrl)
    .then(function(resp) { return resp.blob(); })
    .then(function(blob) {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      var nomeLimpo = (AppState.selectedConcursoTitulo || 'Concurso').replace(/[^a-zA-Z0-9]/g, '_');
      a.download = 'QRCode_' + nomeLimpo + '.png';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast('Download do QR Code iniciado!', 'success');
    })
    .catch(function() { toast('Erro ao baixar QR Code.', 'error'); });
};

window.abrirModoTelao = function() {
  var urlPublica = window.location.href.split('?')[0];
  var token = AppState.concursoToken;
  if (!token && AppState.concursoId) {
    var c = AppState.concursosList.find(function(item) { return item.ID_Concurso === AppState.concursoId; });
    if (c) token = c.QRCode_Token;
  }
  window.open(urlPublica + '?concurso=' + (token || '') + '&view=telao', '_blank');
};

// --- RELATÓRIOS: PDF & EXCEL RELACIONAL ---
window.gerarPDF = function() {
  if (!AppState.concursoId) return toast('Selecione um concurso.', 'error');
  toast('Gerando PDF...', 'info');
  google.script.run
    .withSuccessHandler(function(res) {
      toast('PDF gerado no Drive: ' + res.fileName, 'success');
      window.open(res.fileUrl, '_blank');
    })
    .apiExportPDF(AppState.sessionToken, AppState.concursoId);
};

window.gerarExcel = function() {
  if (!AppState.concursoId) return toast('Selecione um concurso.', 'error');
  toast('Gerando Planilha Excel (.xlsx)...', 'info');
  google.script.run
    .withSuccessHandler(function(res) {
      toast('Excel gerado na pasta Doc_Relatorios: ' + res.fileName, 'success');
      window.open(res.fileUrl, '_blank');
    })
    .apiExportExcel(AppState.sessionToken, AppState.concursoId);
};

window.notificarAusentes = function() {
  if (!AppState.concursoId) return toast('Selecione um concurso.', 'error');
  if (!confirm('Deseja disparar e-mail de falta e nota 0 para todos que não responderam?')) return;
  google.script.run
    .withSuccessHandler(function(res) { toast(res.totalNotificados + ' avisos enviados por e-mail.', 'success'); })
    .apiNotifyAbsentees(AppState.sessionToken, AppState.concursoId);
};

window.solicitarMeuRelatorio = function() {
  google.script.run
    .withSuccessHandler(function() { toast('Boletim individual enviado para seu e-mail!', 'success'); })
    .apiSendMyReport(AppState.sessionToken, AppState.concursoId);
};
