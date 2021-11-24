// Validator function( Validator object)
function Validator(options) {

    // This is function implementing the "validate operation "
    var validate = function(inputElement, rule) {
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        var errorMessage = rule.test(inputElement.value) 
                    if (errorMessage) {
                        inputElement.parentElement.classList.add('invalid')
                        errorElement.innerHTML = errorMessage
                    } else {
                        inputElement.parentElement.classList.remove('invalid')
                        errorElement.innerHTML = ''
                    }   
    }

   
    
    var formElement = document.querySelector(options.form)
    if (formElement) {
        formElement.onsubmit = function(e) {
            // Prevent submitting when users click submit button 
            e.preventDefault()
 
        }
        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement) {
                inputElement.onblur = function(){   
                    validate(inputElement, rule)    
                }
                inputElement.oninput =  function() {
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector)
                    inputElement.parentElement.classList.remove('invalid')
                    errorElement.innerHTML = ''
                }
            }
        }) 

    }
}

// Define rules:
// Rule's principles
// When there is an error  => return error message
// When it is valid => return undefined
 Validator.isRequired = function(selector, message) {
     return {
         selector: selector,
         test: function(value) {
             return value.trim() ? undefined : message || 'Please enter this field!'

         }
     }

}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        test: function(value) {
            var regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return regex.test(value) ? undefined : message || 'This field must be email!'

        }
    }
    
}

Validator.isMessage = function(selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Please leave a message for us!'
        }
    }

}
