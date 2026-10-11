document.addEventListener('DOMContentLoaded',function(){
  var b=document.querySelector('.menu-btn'),l=document.querySelector('.links');
  if(b&&l){b.addEventListener('click',function(){var o=l.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
  if(document.querySelector('.gallery')){
    var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Image viewer');
    var im=document.createElement('img');im.alt='';lb.appendChild(im);document.body.appendChild(lb);
    document.querySelectorAll('.gallery a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();im.src=a.getAttribute('href');im.alt=(a.querySelector('img')||{}).alt||'';lb.classList.add('on')})});
    lb.addEventListener('click',function(){lb.classList.remove('on')});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});
  }
  /* Forms open the visitor's email app, addressed from the form's data-to attribute. */
  document.querySelectorAll('form[data-to]').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();
      var lines=[],name='';
      f.querySelectorAll('input,textarea').forEach(function(el){
        if(!el.name||!el.value.trim())return;
        if(el.name==='name')name=el.value.trim();
        if(el.name!=='message')lines.push((el.dataset.label||el.name)+': '+el.value.trim());
      });
      var msg=f.querySelector('[name=message]');
      var body=lines.join('\n')+(msg&&msg.value.trim()?'\n\n'+msg.value.trim():'');
      var subj=(f.dataset.subject||'Website inquiry')+(name?' from '+name:'');
      window.location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
      var ok=f.querySelector('.ok');if(ok)ok.style.display='block';
    });
  });
});
