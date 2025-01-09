document.addEventListener("DOMContentLoaded", function() {

    const tableEl = document.querySelector(".list-products");

    function createMessageListVoid(){
        const newP = document.createElement("p");
        newP.classList.add('text');
        newP.innerHTML = "Não há dados para exibir.";
        document.getElementById("products").appendChild(newP);
    }

    function removeRow(trEl){
        trEl.remove();

        if(!tableEl.querySelectorAll(`tbody tr`).length){
            tableEl.remove();
            createMessageListVoid();
        }
    }

    [...document.querySelectorAll(".modal .modal-footer .btn.delete")].forEach(el=>el.addEventListener("click", async ()=>{
        const trEl = el.closest('tr');
        const modalEl = el.closest('.modal');

        const productId = trEl.id.replace("product-", "");
        const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
        await fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'application/json',
              'X-CSRF-Token': csrf
            },
        })
            .then(async function (response){
                if(response.status >= 400){
                    return alert("Erro ao deletar produto.");
                }

                removeRow(trEl);
            })
            .catch(()=>alert("Erro ao deletar produto."))
            .finally(()=>{
                bootstrap.Modal.getInstance(modalEl).hide();
            });
    }));
});