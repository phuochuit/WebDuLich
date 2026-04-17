document.addEventListener('DOMContentLoaded', () => {
  // --- 1. TAB SWITCH (gắn window để inline onclick trong HTML vẫn dùng được) ---
  function switchTab(service) {
    document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
    const btn = document.getElementById('tab' + service.charAt(0).toUpperCase() + service.slice(1));
    if (btn) btn.classList.add('active');
    ['flight', 'hotel', 'bus', 'transfer', 'car', 'activity'].forEach(s => {
      const el = document.getElementById(s + '-section');
      if (el) el.style.display = 'none';
    });
    const activeSection = document.getElementById(service + '-section');
    if (activeSection) activeSection.style.display = 'block';
  }
  window.switchTab = switchTab;

  // --- 2. HELPERS (gắn window cho những gì HTML gọi inline) ---
  function setValue(id, val) { const el = document.getElementById(id); if (!el) return; el.value = val; }
  function setText(id, val) { const el = document.getElementById(id); if (!el) return; el.innerText = val; }
  window.setValue = setValue;
  window.setText = setText;

  function selectFlightLocation(type, value) { if (type === 'from') setText('fFromText', value); else setText('fToText', value); }
  function selectBusLocation(type, value) { setValue(type === 'from' ? 'bFromInput' : 'bToInput', value); }
  function selectFlightClass(val) { setText('fSeatClassDisplay', val); }
  function updateCarTime(type, val) { setText(type === 'start' ? 'cStartTimeDisplay' : 'cEndTimeDisplay', val); }
  window.selectFlightLocation = selectFlightLocation;
  window.selectBusLocation = selectBusLocation;
  window.selectFlightClass = selectFlightClass;
  window.updateCarTime = updateCarTime;

  function toggleFlightType(type) {
    document.querySelectorAll('.trip-pill').forEach(b => b.classList.remove('active'));
    if (type === 'one') document.getElementById('btnOneWay')?.classList.add('active');
    else document.getElementById('btnMultiCity')?.classList.add('active');
  }
  window.toggleFlightType = toggleFlightType;

  // Swap helper with safety checks
  function setupSwap(btnId, fromId, toId, isInput) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    btn.addEventListener('click', function () {
      const from = document.getElementById(fromId);
      const to = document.getElementById(toId);
      if (!from || !to) return;
      const temp = isInput ? from.value : from.innerText;
      if (isInput) { from.value = to.value; to.value = temp; } else { from.innerText = to.innerText; to.innerText = temp; }
      // animation hint
      btn.style.transition = "transform 0.35s";
      btn.style.transform = "translate(-50%, -50%) rotate(180deg)";
      setTimeout(() => {
        if (window.innerWidth > 991) btn.style.transform = "translate(-50%, -50%) rotate(0deg)";
        else btn.style.transform = "translateY(-50%) rotate(0deg)";
      }, 300);
    });
  }
  setupSwap('fSwapBtn', 'fFromText', 'fToText', false);
  setupSwap('bSwapBtn', 'bFromInput', 'bToInput', true);
  setupSwap('tSwapBtn', 'tFromInput', 'tToInput', true);

  // Counters
  let fCount = { adult: 1, child: 0, infant: 0 }, hCount = { adult: 2, child: 0, room: 1 };
  function updateFlightCount(t, c) { if (typeof fCount[t] === 'number' && fCount[t] + c >= 0) fCount[t] += c; setText('fCountAdult', fCount.adult); setText('fPassengerText', `${fCount.adult} Người lớn`); }
  function updateHotelCount(t, c) { if (typeof hCount[t] === 'number' && hCount[t] + c >= 0) hCount[t] += c; setText('hCountAdult', hCount.adult); setText('hotelGuestText', `${hCount.adult} người lớn`); }
  function updateBusSeats(n) { setText('bSeatDisplay', n + " Hành khách"); }
  window.updateFlightCount = updateFlightCount;
  window.updateHotelCount = updateHotelCount;
  window.updateBusSeats = updateBusSeats;

  // --- 3. CALENDAR LOGIC (CORE) ---
  const year = 2025, m1 = 10, m2 = 11; // hơi cứng, giữ như cũ
  let hState = { checkIn: new Date(2025, 10, 27), checkOut: new Date(2025, 10, 28), step: 0 },
    fState = { checkIn: new Date(2025, 10, 28), checkOut: new Date(2025, 10, 30), step: 0 },
    bState = { checkIn: new Date(2025, 10, 27), checkOut: null, step: 0 },
    tState = { checkIn: new Date(2025, 10, 28), checkOut: null, step: 0 },
    cState = { checkIn: new Date(2025, 10, 29), checkOut: new Date(2025, 11, 1), step: 0 };

  function getDays(y, m) { return new Date(y, m + 1, 0).getDate(); }
  function getStartDay(y, m) { let d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }
  function fmtDate(d) { return d ? `${d.getDate()} thg ${d.getMonth() + 1} ${d.getFullYear()}` : "--"; }

  // renderMonth now builds DOM nodes and attaches event listeners (no inline onclick)
  function renderMonth(y, m, containerId, state, onSelectFn) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = ''; // clear
    const startEmpty = getStartDay(y, m);
    for (let i = 0; i < startEmpty; i++) {
      const empty = document.createElement('div');
      empty.className = 'day-cell empty';
      el.appendChild(empty);
    }
    const days = getDays(y, m);
    for (let d = 1; d <= days; d++) {
      const curr = new Date(y, m, d);
      let cls = 'day-cell';
      if (state.checkIn && curr.getTime() === state.checkIn.getTime()) cls += ' selected range-start';
      else if (state.checkOut && curr.getTime() === state.checkOut.getTime()) cls += ' selected range-end';
      else if (state.checkIn && state.checkOut && curr > state.checkIn && curr < state.checkOut) cls += ' in-range';

      const div = document.createElement('div');
      div.className = cls;
      div.textContent = d;
      // click handler
      div.addEventListener('click', () => {
        try {
          onSelectFn(y, m, d);
        } catch (err) {
          console.error('calendar select handler error', err);
        }
      });
      el.appendChild(div);
    }
    const titleEl = document.getElementById(containerId.replace('CalendarMonth', 'MonthTitle'));
    if (titleEl) titleEl.innerText = `Tháng ${m + 1} Năm ${y}`;
  }

  function handleSelect(y, m, d, state) {
    const date = new Date(y, m, d);
    if (state.step === 0) { state.checkIn = date; state.checkOut = null; state.step = 1; }
    else {
      if (date < state.checkIn) { state.checkIn = date; state.checkOut = null; }
      else { state.checkOut = date; state.step = 0; }
    }
  }

  // Render wrappers + select handlers (these are attached to window where needed)
  function renderH() {
    renderMonth(year, m1, 'hCalendarMonth1', hState, (y, m, d) => { handleSelect(y, m, d, hState); renderH(); });
    renderMonth(year, m2, 'hCalendarMonth2', hState, (y, m, d) => { handleSelect(y, m, d, hState); renderH(); });
    setText('hotelDateDisplay', hState.checkOut ? `${fmtDate(hState.checkIn)} - ${fmtDate(hState.checkOut)}` : fmtDate(hState.checkIn));
  }
  window.selH = (y, m, d) => { handleSelect(y, m, d, hState); renderH(); };

  function renderF() {
    renderMonth(year, m1, 'fCalendarMonth1', fState, (y, m, d) => { handleSelect(y, m, d, fState); renderF(); });
    renderMonth(year, m2, 'fCalendarMonth2', fState, (y, m, d) => { handleSelect(y, m, d, fState); renderF(); });
    setText('fStartDateDisplay', fmtDate(fState.checkIn));
    const rText = document.getElementById('fEndDateDisplay'), rIcon = document.getElementById('fReturnIcon'), box = document.getElementById('flightRoundTrip');
    if (rText) {
      if (fState.checkOut) { rText.innerText = fmtDate(fState.checkOut); rText.className = "input-display"; if (rIcon) rIcon.className = "far fa-calendar-alt text-primary fs-5"; if (box) box.checked = true; }
      else { rText.innerText = "Chọn ngày về"; rText.className = "input-display text-muted"; if (rIcon) rIcon.className = "far fa-calendar-alt text-secondary fs-5"; if (box && !box.checked) fState.checkOut = null; }
    }
  }
  window.selF = (y, m, d) => { handleSelect(y, m, d, fState); renderF(); };

  function renderB() {
    renderMonth(year, m1, 'bCalendarMonth1', bState, (y, m, d) => { handleSelect(y, m, d, bState); renderB(); });
    renderMonth(year, m2, 'bCalendarMonth2', bState, (y, m, d) => { handleSelect(y, m, d, bState); renderB(); });
    setText('bStartDateDisplay', fmtDate(bState.checkIn));
    const rText = document.getElementById('bEndDateDisplay'), box = document.getElementById('busRoundTrip');
    if (rText) {
      if (bState.checkOut) { rText.innerText = fmtDate(bState.checkOut); rText.className = "input-display"; if (box) box.checked = true; }
      else { rText.innerText = "Chọn ngày về"; rText.className = "input-display text-muted"; if (box && !box.checked) bState.checkOut = null; }
    }
  }
  window.selB = (y, m, d) => { handleSelect(y, m, d, bState); renderB(); };

  function renderT() {
    renderMonth(year, m1, 'tCalendarMonth1', tState, (y, m, d) => { tState.checkIn = new Date(y, m, d); tState.checkOut = null; renderT(); });
    renderMonth(year, m2, 'tCalendarMonth2', tState, (y, m, d) => { tState.checkIn = new Date(y, m, d); tState.checkOut = null; renderT(); });
    setText('tDateDisplay', fmtDate(tState.checkIn));
  }
  window.selT = (y, m, d) => { tState.checkIn = new Date(y, m, d); tState.checkOut = null; renderT(); };

  function renderC() {
    renderMonth(year, m1, 'cCalendarMonth1', cState, (y, m, d) => { handleSelect(y, m, d, cState); renderC(); });
    renderMonth(year, m2, 'cCalendarMonth2', cState, (y, m, d) => { handleSelect(y, m, d, cState); renderC(); });
    // second pair for end date
    renderMonth(year, m1, 'c2CalendarMonth1', cState, (y, m, d) => { handleSelect(y, m, d, cState); renderC(); });
    renderMonth(year, m2, 'c2CalendarMonth2', cState, (y, m, d) => { handleSelect(y, m, d, cState); renderC(); });
    setText('cStartDateDisplay', fmtDate(cState.checkIn));
    setText('cEndDateDisplay', cState.checkOut ? fmtDate(cState.checkOut) : "Chọn ngày");
  }
  window.selC = (y, m, d) => { handleSelect(y, m, d, cState); renderC(); };

  // Toggles (exposed)
  function toggleFlightReturn() { const box = document.getElementById('flightRoundTrip'); if (box && !box.checked) { fState.checkOut = null; fState.step = 1; } renderF(); }
  function toggleBusReturn() { const box = document.getElementById('busRoundTrip'); if (box && !box.checked) { bState.checkOut = null; bState.step = 1; } renderB(); }
  window.toggleFlightReturn = toggleFlightReturn;
  window.toggleBusReturn = toggleBusReturn;

  // btn-toggle-car logic
  document.querySelectorAll('.btn-toggle-car').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.btn-toggle-car').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // search stub
  window.doSearch = (t) => alert("Đang tìm kiếm " + t + "...");

  // Init
  const busRound = document.getElementById('busRoundTrip');
  if (busRound) busRound.checked = false;
  renderH(); renderF(); renderB(); renderT(); renderC();
});
