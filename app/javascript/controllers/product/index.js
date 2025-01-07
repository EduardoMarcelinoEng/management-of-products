document.addEventListener("DOMContentLoaded", function() {
    // jQuery(document).bind('DOMNodeInserted', function(e) {
    //     var element = e.target;
    //     if (jQuery(element).hasClass('modal-backdrop')) {
    //        alert('here we are');
    //     if (jQuery(".modal-backdrop").length > -1) {
    //             jQuery(".modal-backdrop").not(':first').remove();
    //         }
    //     }
    // });
    
    // jQuery(document).on("DOMNodeRemoved",".modal-backdrop",function(){
    //     jQuery(".modal-backdrop").remove();
    // });

    // var observer = new MutationObserver(function () {
    //     var element = document.body;
    //     if (jQuery(element).hasClass('modal-backdrop')) {
    //         alert('here we are');
    //         if (jQuery(".modal-backdrop").length > -1) {
    //             jQuery(".modal-backdrop").not(':first').remove();
    //         }
    //     }
    // });
    // observer.observe(document.body, { childList: true });

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
        // modalEl.on("shown.bs.modal", function () {
        //     if ($(".modal-backdrop").length > 1) {
        //         $(".modal-backdrop").not(':first').remove();
        //     }
        // });
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