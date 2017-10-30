function init(){
  handlebarsSetup()
  showForm()
}
document.addEventListener("DOMContentLoaded", function(event) {
  init()
})

function handlebarsSetup(){
  Handlebars.registerPartial("recipeDetailsPartial", document.getElementById("recipe-details-partial").innerHTML)
  Handlebars.registerPartial("recipeFormPartial", document.getElementById("recipe-form-partial").innerHTML)
  Handlebars.registerHelper("displayIngredient", function(ingredient){
    return new handlebars.safeString("<li name='ingredientsList'>" + ingredient + "</li>")
  })
}

function showForm(){
  let form = document.getElementById("recipe-form-template").innerHTML
  let template = Handlebars.compile(form)
  document.getElementsByTagName("main")[0].innerHTML += template({"submitAction": "createRecipe()"})
}

function createRecipe(){
  let recipe = getRecipeInfo()
  let recipeTemplate = document.getElementById('recipe-template').innerHTML
  let compiled = Handlebars.compile(recipeTemplate)
  document.getElementsByTagName("main")[0].innerHTML += compiled(recipe)
}

function getRecipeInfo(){
  let name = document.getElementById('name').value
  let description = document.getElementById('description').value
  let ingredientNodes = document.getElementsByName('ingredients')
  let ingredients = []

  for(let i=0; i<ingredientNodes.length; i++){
    if(ingredientNodes[i].value != ""){
      ingredients.push(ingredientNodes[i].value)
    }
  }

  let recipe = {name, description, ingredients}
  return recipe
}

function displayEditForm(){
  let name = document.getElementById("nameHeader").innerText
  let ingredientNodes = document.getElementsByName("ingredientsList")
  let ingredients = []

  for (let i = 0; i < ingredientNodes.length; i++){
    ingredients.push(ingredientNodes[i].innerText)
  }

  let recipe = {name, description, ingredients, submitAction: "updateRecipe()"}
  let template = document.getElementById("recipe-form-template").innerHTML
  let compiled = Handlebars.compile(template)
  document.getElementById("main").innerHTML = compiled(recipe)
}

function updateRecipe(){
  let recipe = getRecipeInfo()
  let recipeTemplate = document.getElementById("recipe-template").innerHTML
  let compiledTemplate = Handlebars.compile(recipeTemplate)
  document.getElementById("main").innerHTML = compiledTemplate(recipe)
}
