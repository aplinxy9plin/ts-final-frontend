import React, { useEffect } from 'react'
import './AddVacancy.css'

const AddVacancy = () => {

  useEffect(() => {
    var body = document.querySelector('body'),
        form = document.querySelector('form'),
        count = form.querySelectorAll('fieldset').length;
    init()
    document.body.onmouseup = function (event) {
        var target = event.target || event.toElement;
        if (target.classList.contains("button")) next(target);
    };
    document.addEventListener("keydown", keyDown, false);  
    function init() {
      // Generate li foreach fieldset
      for (var i = 0; i < count; i++) {
        var ul = document.querySelector('ul.items'),
            li = document.createElement("li");
    
        ul.appendChild(li);
      }
      // Add class active on first li
      ul.firstChild.classList.add('active');
    }
    
    function next(target) {
      var input = target.previousElementSibling;
      
      // Check if input is empty
      if (input.value === '') {
        body.classList.add('error');
      } else {
        body.classList.remove('error');
        
        var enable = document.querySelector('form fieldset.enable'),
            nextEnable = enable.nextElementSibling;
        enable.classList.remove('enable');
        enable.classList.add('disable');
        nextEnable.classList.add('enable');
        
        // Switch active class on left list
        var active = document.querySelector('ul.items li.active'),
            nextActive = active.nextElementSibling;
        active.classList.remove('active');
        nextActive.classList.add('active');
      }
    }
    
    function keyDown(event) {
      var key = event.keyCode,
          target = document.querySelector('fieldset.enable .button');
      if (key === 13 || key === 9) next(target);
    }
  }, [])

  return (
    <div>
      <div>
        <form className="add_form">
          <ul className="items add_ul" />
          <fieldset className="username enable">
            <select className="input" placeholder="grade">
              <option>asdf</option>
              <option>asdf</option>
              <option>asdf</option>
            </select>
            <div className="icon right button"><i className="arrow" /></div>
          </fieldset>
          <fieldset className="email">
            <div className="icon left"><i className="letter" /></div><input type="mail" name="email" placeholder="professional_area" />
            <div className="icon right button"><i className="arrow" /></div>
          </fieldset>
          <fieldset className="password">
            <div className="icon left"><i className="lock" /></div><input type="password" name="password" placeholder="job_responsibilities" />
            <div className="icon right button"><i className="arrow" /></div>
          </fieldset>
          <fieldset className="thanks">
            <div className="icon left"><i className="heart" /></div>
            <p>Thanks for your time</p>
            <div className="icon right"><i className="heart" /></div>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

export default AddVacancy
