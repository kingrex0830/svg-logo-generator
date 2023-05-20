// Defines a Shape class with color values
class Shape{
    constructor(){
        this.color=''
    }
    setColor(color){
        this.color=(color);
    }
}
// Defines a Circle class extension of Shape
class Circle extends Shape{
    render(){
        return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}"/>`
    }
};
// Defines a Square class extension of Shape
class Square extends Shape{
    render(){
        return `<rect x="50" height="200" width="200" fill="${this.color}"/>`
    }
};
// Defines a Triangle class extension of Shape
class Triangle extends Shape{
    render(){
        return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}"/>`
    }
};
// Exports Circle, Square, and Triangle shapes
module.exports = {Circle, Square, Triangle};