    
    function getProduct () {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=> {console.log(json)
            let containProduct = document.getElementById("containProduct")
            
            for ( let product of json){
               
               let articleContain = document.createElement("article")
                articleContain.classList.add("flex-article")
                articleContain.setAttribute("data-product-id" ,product.id)
                articleContain.innerHTML = `
                    <h2>  ${product.title}</h2>
                    <img  src="${product.image}">
                    <p> ${product.price} €</p>
                    <p> ${product.description} </p>
                    <input type="submit" class="addCart" value="Ajouter au panier"  data-product-id="${product.id}">
                    `
                containProduct.appendChild(articleContain)
           
            }
            searchBar (json)
            cart()
        })
        
    }

getProduct() 


    function searchBar (json){
        //permet la recherche d'element avec un input text
        let inputSearch = document.getElementById("search")
        inputSearch.addEventListener('input' , function(){
        //filtre les elements du tableau json selon la description ou leurs titre
            const searchValue = inputSearch.value.toLowerCase()
            const foundItem =  json.filter(item => {
                return item.title.toLowerCase().includes(searchValue) || item.description.toLowerCase().includes(searchValue) 
                //retourne une copie du tableau filtrer 
            })

            containProduct.innerHTML = ""
            //condition verifiant si la copie du tableau n'est pas vide 
            if(foundItem.length > 0){
            //boucle sur le tableau pour afficher les elements qui inclus la valeur de searchValue
                foundItem.forEach((isPresent) => {
                    console.log(foundItem)

                    let searchArticleContain = document.createElement("article")
                    searchArticleContain.classList.add("flex-article")
                    searchArticleContain.setAttribute("data-product-id" ,isPresent.id)
                    searchArticleContain.innerHTML = `
                        <h2>  ${isPresent.title}</h2>
                        <img  src="${isPresent.image}">
                        <p> ${isPresent.price} €</p>
                        <p> ${isPresent.description} </p>
                        <input type="submit" class="addCart" value="Ajouter au panier" data-product-id="${isPresent.id}">
                        `
                        containProduct.appendChild(searchArticleContain)
                        
                })
            }else {
                //Si le tableau est inferieur = ou < 0 message d'erreur
                containProduct.innerHTML = "Aucun produit ne correspond à votre recherche"
            }
            
        })
    }

    
    function cart() {
        let addToCartButtons = document.querySelectorAll(".addCart");
        let cart = []; // Initialisez cart en tant que tableau vide
    
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
    
                // Obtenir l'ID du produit à partir de l'attribut data-product-id du bouton
                let productId = button.getAttribute("data-product-id");
    
                // Vérifier si le produit est déjà dans le panier
                const index = cart.findIndex(item => item.productId === productId);
    
                if (index !== -1) {
                    // Le produit est déjà dans le panier, augmenter la quantité
                    cart[index].quantity++;
                } else {
                    // Le produit n'est pas encore dans le panier, l'ajouter
                    cart.push({
                        productId: productId,
                        quantity: 1
                    });
                }
    
                // Afficher le panier dans la console pour le débogage
                console.log("Panier:", cart);
                fetch('https://fakestoreapi.com/carts',{
                    method:"POST",
                    body:JSON.stringify(
                                        {
                                            userId:5,
                                            date:2020-02-03,
                                            products:cart
                                        }
                    )   
                })
                .then(res=>res.json())
                .then(json=>console.log(json))
            });
        });
    }






