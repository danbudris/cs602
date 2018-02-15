const fs = require('fs');

let recipie_reader = (file_name) => {
    let recipe;
    fs.readFile(file_name, 'utf8', (err, data) => { 
        if (err) throw err; 
        recipe = JSON.parse(data);   
        let recipie_len = recipe.steps.length;
        let recipie_title = recipe.title;
        console.log(recipie_title + " is " + recipie_len + " steps long");
    });
}

let recipie_builder = (title, prep_time, cook_time, serves, steps, save) => {
    let recipe_object = {
        "title": title,
        "prep_time": prep_time,
        "cook_time": cook_time,
        "serves": serves,
        "steps": steps
    };
    if(save){
        let recipie_json = JSON.stringify(recipe_object);
        fs.writeFile(title+'.json', recipie_json, 'utf8', (err) =>{
            if (err) throw err;
            console.log('The file has been saved as '+ title +'.json');
        });
    }
    return recipe_object;
}

let title_1 = "meatloaf"
let prep_time1 = "20 min"
let cook_time1 = "1 hr"
let serves = "5"
let steps = ["Combine ground meat with spices","add breadcrumbs and shape into loaf pan","top with tomato sauce","bake for 1hr","remove from oven, let cool for 5 minutes, remove from pan", "serve with a side of Tim Curry"]

let make_some_meatloaf = recipie_builder(title_1, prep_time1, cook_time1, serves, steps, true);
let read_some_meatloaf = recipie_reader("./meatloaf.json");