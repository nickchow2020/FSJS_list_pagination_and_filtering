/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
 *global Variable That We need for This project
***/
        // variable that target on students Ul tag
const studentsUl = document.querySelector(".student-list");
        // variable that store all list element under the students Ul tags;
const studentsUlList = studentsUl.children;
        // initial the current page to one;
const currentPage = 1;
        // initial the rows students per page;
const rowsPerPage = 10;
        // target on the parent of pagination section;
const pageWrapper = document.querySelector(".page")
        // variable target on searchbox parent;
const pageHeader = document.querySelector(".page-header");




/*** 
 *function that is going to who the only 10 rows perpages and hide the rest
    **page argument is represent the current page
    **student argument target on student ranges;
***/
function showPage(page,students){
        // making sure to empty the previous contents used for loops
        const listLength = students.length;//set highest index in for loops

        for(let i = 0; i < listLength; i ++){
                students[i].style.display = "";
        }

        page -- // set the page to minus one,making the start index position is begin at 0;
        const startIndex = page * rowsPerPage;  // set the start index
        const endIndex = startIndex + rowsPerPage; // set the end index

        /**use for loop to loop through each index according the variable startIndex and endIndex and 
        set it's display property to block;**/
        for(let i = startIndex; i < endIndex; i ++){
                /**if statement filters studentsUlList[i] equivalent to undefined*/
                if(students[i]){ 
                        students[i].style.display = "block";
                }
        }
}



/*** 
 *function that is going to generate the Pagination Buttons and it's functionalities
 btnNumber is the button's contents like 1,2,3,4,5,6
***/
function createPaginationBtn(btnNumber){
        let page = btnNumber + 1 // because we start the for loop at index of 0,making sure the buttons number no equivalent to 0
        const li = document.createElement("li");// create li element;
        const a = document.createElement("a");// create anchor tags;
        a.textContent = page; // set anchor tags contents to the current_page;
        li.appendChild(a); // append anchor tag to li tag;

        if(currentPage === page)a.classList.add("active"); // add the class active to first btn used conditional statement

        /**
         * Add an Eventlistener to each anchor tags,when click run the function showPage() and remove and add the 
         * class active to button when click.
         */
        a.addEventListener("click",(e)=>{
                const buttonContents = e.target.textContent;// get the showpage() argument value
                const activeBtn = document.querySelector(".active") // select the anthor tag with class of active
                activeBtn.classList.remove("active"); // remove class active when click
                showPage(buttonContents,studentsUlList);// call the showPage() and pass it's argument value when click
                a.classList.add("active");// add  class active when click a tags
        })


        return li; // return the value of the function li tag;
}




/*** 
 *function that is going to generate the pagination buttons according to the length of the students.
 and called a function that is handle the funtionally of each button.
 parent is argument wrapper of pagination section.
 lengths is argument represent total amount of student
***/
function appendPaginateBtn(parent,lengths){
        /*** 
         * first step going to create a html of pagination
         * ***/
        const div = document.createElement("div");
        const ul = document.createElement("ul");
        div.classList.add("pagination");
        div.appendChild(ul);
        parent.appendChild(div);

        /**variable:
         * Use Math.ceil to level up the numbers of buttons
         * use students total divide by the rowsPerpages
         */
        const totalStudents =  lengths.length;  //totals student value
        const totalBtn = Math.ceil(totalStudents / rowsPerPage) // total buttons

        /**
         * Use for loop to loop throught the numbers of pagination and called the 
         * function of createPaginationBtn.
         */
        for(let i = 0;i < totalBtn; i ++){
                let paginated = createPaginationBtn(i);// store each li tags
                ul.appendChild(paginated); // append each li tags to ul element
        }



}



showPage(currentPage,studentsUlList);//called showPage() with all Student
appendPaginateBtn(pageWrapper,studentsUlList);//called appendPaginateBtn() with all Student