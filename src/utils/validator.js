function validateEmailFormat(email)
{
    return new Promise(function(resolve, reject) {
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(email.trim().length < 1)
        {
            reject({code: "EmptyInputException"});
        }
        else if(!re.test(String(email).toLowerCase()))
        {
            reject({code: "InvalidEmailFormat"});
        }
        else
        {
            resolve();
        }
    });
}

function validatePassword(password)
{
    return new Promise(function(resolve, reject) {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\^$*?!@#%&:;|_~])[A-Za-z\d\^$*?!@#%&:;|_~]{6,99}/;
        if(String(password).length < 6 || String(password).lenth > 99)
        {
            reject({message: "Password length must be between 6 to 99 characters"});
        }
        else if(!re.test(String(password)))
        {
            reject({message: "Password must contain at least one number, special characters, uppercase and lowercase letters"});
        }
        else
        {
            resolve();
        }
    });
}

export default {validateEmailFormat, validatePassword}