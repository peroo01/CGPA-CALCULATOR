const courseInfoCon = document.getElementById("course-info-container");
const addBtn = document.getElementById("add");
const semester = document.getElementById("semester")
const gradePointResult = document.getElementById("gp")
const honorsDegree = document.getElementById("honours")
const message = document.getElementById("message")



let totalUnits = 0
const gradeValue = {A: 5, B: 4, C: 3, D: 2, E: 1, F: 0}

let gradePoint = 0
const getHonoursDegree = (value)=>{
    if(value >= 5){
        return "First Class"
    }else if(value > 4.5){
        return "Second Class (U)"
    }
    else if(value > 3.5){
        return "Second Class (L)"
    }else if(value > 2.4 ){
        return "Third Class"
    }else if(value > 1){
        return "Pass"
    }else{
        return "Error!"
    }
}

const addNewCourse = ()=>{
const courseUnits  = document.querySelectorAll(".units").length + 1
    const fieldset = `<fieldset id="fieldset-${courseUnits}">
                        <input type="text" class="course-code">
                        <select name="grade" id="grade-${courseUnits}" class="mark">
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </select>
                        <input type="text" class="units" id="unit-${courseUnits}">
                        <i class='bx  bx-trash'  ></i> 
                    </fieldset>`
    courseInfoCon.insertAdjacentHTML("beforeend", fieldset)
    
}
const regex = /\d+/
const validateUnitInput = ()=>{
const courseUnits  = document.querySelectorAll(".units")
    for(const item of courseUnits){
      if(!regex.test(item.value)){
        item.classList.add("borderColor")
        item.value =""
      }else{
        item.classList.remove("borderColor")
      }
    }
}

const getTotalUnits = ()=>{ 
const courseUnits  = document.querySelectorAll(".units")
   for (const item of courseUnits){
    totalUnits += Number(item.value)
   }
console.log(courseUnits)
return totalUnits
 }


addBtn.addEventListener("click",()=>{
addNewCourse()

}  )



 const getGradePoint= ()=>{
    for(let i = 1; i < document.querySelectorAll(".units").length + 1; i++){
    const gp = document.getElementById(`grade-${i}`)
    const unitValue = document.getElementById(`unit-${i}`).value
     if(gradeValue[gp.value]){
        console.log(gradeValue[gp.value] * unitValue)
        gradePoint += gradeValue[gp.value] * unitValue
     }
    }
    
 }
 

const showResults = ()=>{
    validateUnitInput();
const courseUnits  = document.querySelectorAll(".units")
 if(Array.from(courseUnits).some(item => item.value === "")){
    message.textContent = "Please fill in all unit fields"
    message.style.color = "red" 
    return
 }else{
    message.textContent = ""
 }
    getTotalUnits();
    getGradePoint();
    getHonoursDegree
    const result = gradePoint / totalUnits ;
    gradePointResult.innerText = result.toFixed(2);
    honorsDegree.innerText = getHonoursDegree(result)
    totalUnits = 0;
    gradePoint = 0;

}
 courseInfoCon.addEventListener("change", (e)=>{
    if(e.target.classList.contains("units") || e.target.classList.contains("mark")){
        showResults()
    }
 })
    courseInfoCon.addEventListener("keydown", (e)=>{
        const regex = /[a-z]/
    if(e.target.classList.contains("course-code")){
        const capitalized = e.key;
        capitalized = 44
        // test(regex) ? e.target.value += capitalized.toUpperCase() :  ; 
    }
 })

 const deleteCourse = ()=>{
     courseInfoCon.addEventListener("click",(e)=>{
         if(e.target.classList.contains("bx-trash")){
             e.target.parentElement.remove()
         }
     })}

    deleteCourse()  