// File imports here
const graceful_fs = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");
// Defines an SVG class that uses a constructor to render text and shape elements in the SVG string
class Svg{
    constructor(){
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
};
// Defines an array of questions for the user to answer, thus setting the values of the SVG logo
const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter 3 characters for your logo text:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter a color keyword/hex value for your logo text:",
    },
    {
        type: "input",
        name: "shape",
        message: "Enter a color keyword/hex value for your logo background:",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Select your logo background shape",
        choices: ["Circle", "Square", "Triangle"],
    },
];
// Defines a function for writing the data to a file
function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    graceful_fs.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Congratulations, you have Generated a logo.svg!");
    });
};
// Defines an async function to initialize the app
async function init() {
    console.log("Initializing");
	var svgString = "";
	var svg_file = "logo.svg";

    // Prompts user with questions array defined on line 25-47
    const answers = await inquirer.prompt(questions);

	// Defines empty user text string
	var user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// Valid entry if 1-3 characters
		user_text = answers.text;
	} else {
		// Invalid entry if otherwise
		console.log("Invalid user text field detected! Please enter 1-3 Characters, no more and no less");
        return;
	}
	console.log("User text: [" + user_text + "]");
	// Defines user selection for text color
	user_font_color = answers["text-color"];
	// Defines user selection for background color
	user_background_color = answers.shape;
	// Defines user selection for shape
	user_shape = answers["pixel-image"];
	
	// Define user logo
	let user_logo;
	if (user_shape === "Square" || user_shape === "square") {
		user_logo = new Square();
	}
	else if (user_shape === "Circle" || user_shape === "circle") {
		user_logo = new Circle();
	}
	else if (user_shape === "Triangle" || user_shape === "triangle") {
		user_logo = new Triangle();
	}
	else {
		console.log("Invalid shape!");
	}
	user_logo.setColor(user_background_color);

	// Defines a new SVG instance with new user input values
	var svg = new Svg();
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_logo);
	svgString = svg.render();

	console.log("Logo generation complete!");
	console.log("Writing logo to file...");
	writeToFile(svg_file, svgString); 
};
// Initialize
init();