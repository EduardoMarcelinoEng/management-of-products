document.addEventListener("DOMContentLoaded", function() {
    const btnEl = document.querySelector(".btn[type=submit]");
    const emailEl = document.getElementById("inputEmail");
    const passwordEl = document.getElementById("inputPassword");
    const repeatPasswordEl = document.getElementById("inputRepeatPassword");

    const setErrorInElement = (message, el)=>{
        const formGroup = el.closest('.form-group');
        const feedbackEl = formGroup.querySelector(".invalid-feedback");
        const inputEl = formGroup.querySelector("input");

        feedbackEl.innerHTML = message;

        inputEl.classList.add("is-invalid");
    }

    const removeErrorInElement = el=>{
        const formGroup = el.closest('.form-group');
        const feedbackEl = formGroup.querySelector(".invalid-feedback");
        const inputEl = formGroup.querySelector("input");

        inputEl.classList.remove("is-invalid");

        feedbackEl.innerHTML = "";
    }

    emailEl.addEventListener("keydown", ()=>removeErrorInElement(emailEl));
    passwordEl.addEventListener("keydown", ()=>removeErrorInElement(passwordEl));
    repeatPasswordEl.addEventListener("keydown", ()=>removeErrorInElement(repeatPasswordEl));

    btnEl.addEventListener("click", e=>{
        e.preventDefault();

        if(!(()=>{
            let result = emailEl.value.match(/[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/g);
            return result && result[0];
        })()) return setErrorInElement(
            "Informe um e-mail válido.",
            emailEl
        );

        if(!passwordEl.value) return setErrorInElement(
            "Informe uma senha.",
            passwordEl
        );

        if(passwordEl.value !== repeatPasswordEl.value) return setErrorInElement(
            "Senha difere.",
            repeatPasswordEl
        );

        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify({
                email_address: emailEl.value,
                password: passwordEl.value,
                password_confirmation: repeatPasswordEl.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async function (response){
                debugger
                if(response.status >= 400){
                    window.location.reload();
                    return alert("Erro ao criar usuário.");
                }

                //window.location.href = "/";
            })
            .catch(err=>{
                debugger
                alert("Erro ao criar usuário.")
            });
    });
});