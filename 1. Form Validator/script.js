document.getElementById("register-animation").addEventListener("click", function(){
    animate_form();

  });

document.getElementById("submit-form").addEventListener("click", function(){
    submit_register_check();

  });



  const animate_form = () => {
    document.getElementById("right-animation").style.opacity = "1";
    document.getElementById("right-animation").style.width = "50%";
    document.getElementById("left-animation").style.width = "50%";
    document.getElementById("left-image").style.width = "200px";
    document.getElementById("left-image").style.height = "200px";
  }

  function invalid_message(input, error_handling, message){
    input.style.borderColor = "red"
    error_handling.style.opacity = "1";
    error_handling.innerHTML = message;
    
  }

  function valid_message(input, error_handling){
    input.style.borderColor = "green"
    error_handling.style.opacity = "0";
  }

  function check_length(username, error_handling, min, max){
    if(username.value.length < min){
      invalid_message(username, error_handling, `${getFieldName(username)} must be atleast ${min} characters long`);
    }else if(username.value.length > max){
      invalid_message(username, error_handling, `${getFieldName(username)} must be less than ${max} character long`);
    }else{
      valid_message(username, error_handling);
    }
      
  }

  function check_required_fields(inputs){
    inputs.forEach((input) => {
      if(input.value.trim() === ''){
        invalid_message(input, document.getElementById(`${getFieldName(input)}-error`), `${getFieldName(input)} is a required field`)
      }else {
        valid_message(input, document.getElementById(`${getFieldName(input)}-error`));
      }
    })
  }

  function check_email(email, error_handling){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))
  {
    valid_message(email, error_handling)
  }else{
    invalid_message(email, error_handling, `${getFieldName(email)} is a invalid email`)
  }
}

  function getFieldName(input) {
    return input.name
  }

  function submit_register_check(){
    check_required_fields([document.getElementById("username"), document.getElementById("email"), document.getElementById("password")])
    check_length(document.getElementById("username"), document.getElementById("username-error"), 5, 20)
    check_email(document.getElementById("email"), document.getElementById("email-error"))
    check_length(document.getElementById("password"), document.getElementById("password-error"), 10, 20)
  
  }
