    function getProduct () {
        fetch('https://fakestoreapi.com/products')
        .then(res=>res.json())
        .then(json=> {console.log(json)
            let containProduct = document.getElementById("containProduct")
            
            for ( let product of json){
               
               let articleContain = document.createElement("article")
                articleContain.classList.add("flex-article")

                articleContain.innerHTML = `
                    <h2>  ${product.title}</h2>
                    <img  src="${product.image}">
                    <p> ${product.price} €</p>
                    <p> ${product.description} </p>
                    <input type="submit" id="${product.id}" value="Ajouter au panier">
                    `
                containProduct.appendChild(articleContain)
           
            }
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

                        searchArticleContain.innerHTML = `
                            <h2>  ${isPresent.title}</h2>
                            <img  src="${isPresent.image}">
                            <p> ${isPresent.price} €</p>
                            <p> ${isPresent.description} </p>
                            <input type="submit" id="${isPresent.id}" value="Ajouter au panier">
                            `
                            containProduct.appendChild(searchArticleContain)
                            
                    })
                }else {
                    //Si le tableau est inferieur = ou < 0 message d'erreur
                    containProduct.innerHTML = "Aucun produit ne correspond à votre recherche"
                }
                
            })
           
        })
    }
    
    function cart (){
        fetch('https://fakestoreapi.com/carts')
            .then(res=>res.json())
            .then(json=>console.log(json))
    }

getProduct() 
cart()

