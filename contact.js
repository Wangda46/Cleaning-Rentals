const hkForm = document.getElementById('hkForm');
const hkFormBody = document.getElementById('hkFormBody');
const hkSuccess = document.getElementById('hkSuccess');

hkForm.addEventListener('submit', e => {
  e.preventDefault();

  const name = hkName.value.trim();
  const email = hkEmail.value.trim();
  const service = hkService.value;
  const msg = hkMsg.value.trim();

  if (!name || !email || !service || !msg) return shakeEmpty();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return shake(hkEmail);

  setTimeout(() => {
    hkFormBody.style.display = 'none';
    hkSuccess.classList.add('hk-active');
  }, 800);
});

function hkReset(){
  hkForm.reset();
  hkFormBody.style.display = 'block';
  hkSuccess.classList.remove('hk-active');
}

function shakeEmpty(){
  ['hkName','hkEmail','hkService','hkMsg'].forEach(id=>{
    const el=document.getElementById(id);
    if(!el.value) shake(el);
  });
}

function shake(el){
  el.animate([
    {transform:'translateX(0)'},
    {transform:'translateX(-6px)'},
    {transform:'translateX(6px)'},
    {transform:'translateX(0)'}
  ],{duration:300});
}
